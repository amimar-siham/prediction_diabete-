from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
from flask_mail import Mail, Message
import numpy as np
import pickle
import jwt
import datetime
import logging

app = Flask(__name__)

# Enable CORS for all routes with specific origin and credentials support
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

# MySQL configurations
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'siham'
app.config['MYSQL_DB'] = 'prediction'
app.config['MYSQL_HOST'] = 'localhost'
mysql = MySQL(app)

# Flask-Mail configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'doctorsiham310@gmail.com'  # Use your actual Gmail address
app.config['MAIL_PASSWORD'] = 'quds jcay dlqk tqlt'     # Use your generated App Password
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
mail = Mail(app)

# Load the trained model
model_file = 'diabetes-prediction-rfc-model.pkl'
with open(model_file, 'rb') as model_file:
    model = pickle.load(model_file)

# Utility functions for JWT and database queries
def query_db(query, args=(), one=False):
    cursor = mysql.connection.cursor()
    cursor.execute(query, args)
    result = cursor.fetchall()
    cursor.close()
    return (result[0] if result else None) if one else result

def encode_auth_token(user_id, role):
    try:
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
            'iat': datetime.datetime.utcnow(),
            'sub': user_id,
            'role': role
        }
        return jwt.encode(payload, 'your_jwt_secret_key', algorithm='HS256')
    except Exception as e:
        return e

def decode_auth_token(auth_token):
    try:
        payload = jwt.decode(auth_token, 'your_jwt_secret_key', algorithms=['HS256'])
        return payload['sub'], payload['role']
    except jwt.ExpiredSignatureError:
        return None, 'expired'
    except jwt.InvalidTokenError:
        return None, 'invalid'

# Send email function
def send_email(recipient_email, subject, body):
    msg = Message(subject, sender='doctorsiham310@gmail.com', recipients=[recipient_email])
    msg.body = body
    mail.send(msg)


# Signup route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')
    full_name = data.get('full_name')
    phone_number = data.get('phone_number')

    existing_user = query_db('SELECT * FROM users WHERE email = %s', [email], one=True)
    if existing_user:
        return jsonify({"message": "User already exists"}), 400

    cursor = mysql.connection.cursor()
    query = """
        INSERT INTO users (email, password, role, full_name, phone_number)
        VALUES (%s, %s, %s, %s, %s)
    """
    cursor.execute(query, (email, password, role, full_name, phone_number))
    mysql.connection.commit()
    cursor.close()

    return jsonify({"message": "User created successfully"}), 201

# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = query_db('SELECT * FROM users WHERE email = %s', [email], one=True)
    if user and user[2] == password:
        auth_token = encode_auth_token(user[0], user[3])
        return jsonify({"auth_token": auth_token}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

# Route to fetch user role based on auth token
@app.route('/user-role', methods=['GET'])
def get_user_role():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({"message": "Unauthorized"}), 401

    auth_token = auth_header.split(" ")[1]
    user_id, role = decode_auth_token(auth_token)
    if not user_id:
        return jsonify({"message": "Unauthorized"}), 401

    return jsonify({"role": role}), 200

# Prediction route
@app.route('/predict', methods=['POST'])
def predict():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({"message": "Unauthorized"}), 401

    auth_token = auth_header.split(" ")[1]
    user_id, role = decode_auth_token(auth_token)
    if not user_id:
        return jsonify({"message": "Unauthorized"}), 401

    try:
        data = request.get_json()
        pregnancies = float(data['pregnancies'])
        glucose = float(data['glucose'])
        bloodpressure = float(data['bloodpressure'])
        skinthickness = float(data['skinthickness'])
        insulin = float(data['insulin'])
        bmi = float(data['bmi'])
        dpf = float(data['dpf'])
        age = float(data['age'])

        input_data = np.array([[pregnancies, glucose, bloodpressure, skinthickness, insulin, bmi, dpf, age]])
        prediction = model.predict(input_data)[0]

        cursor = mysql.connection.cursor()
        query = """
            INSERT INTO predictions (user_id, pregnancies, glucose, bloodpressure, skinthickness, insulin, bmi, dpf, age, prediction_result)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        values = (user_id, pregnancies, glucose, bloodpressure, skinthickness, insulin, bmi, dpf, age, prediction)
        cursor.execute(query, values)
        mysql.connection.commit()
        cursor.close()

        if prediction == 1:
            user = query_db('SELECT email, full_name FROM users WHERE id = %s', [user_id], one=True)
            if user:
                recipient_email = user[0]
                subject = "Sujet important : Résultat positif de prédiction du diabète"
                body = f"Salut {user[1]},\n\nVotre récent test de prédiction du diabète a donné un résultat positif. Nous vous recommandons de prendre rendez-vous avec Dr. Mouhemed Amine Messoudi pour une évaluation approfondie ,vous trouvez ci joint les coordonnées :\nAdresse :Rue Ibn Rochd, Quartier des Hôpitaux, Casablanca, Morocco\nNuméro de télephone :+212 522 45 67 89 \n\nCordialement,\nVotre équipe de santé"
                send_email(recipient_email, subject, body)

        return jsonify({'prediction': int(prediction)})
    
    except KeyError as e:
        return jsonify({"message": f"Missing parameter: {e}"}), 400
    
    except ValueError as e:
        return jsonify({"message": f"Invalid value: {e}"}), 400
    
    except Exception as e:
        return jsonify({"message": str(e)}), 500

# Route for doctor dashboard
@app.route('/doctor-dashboard', methods=['GET'])
def doctor_dashboard():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({"message": "Unauthorized"}), 401

    auth_token = auth_header.split(" ")[1]
    user_id, role = decode_auth_token(auth_token)
    if not user_id:
        return jsonify({"message": "Unauthorized"}), 401

    if role != 'doctor':
        return jsonify({"message": "Unauthorized, only doctors allowed"}), 403

    cursor = mysql.connection.cursor()
    query = """
        SELECT p.id, u.full_name, u.phone_number, p.pregnancies, p.glucose, p.bloodpressure, 
               p.skinthickness, p.insulin, p.bmi, p.dpf, p.age, p.prediction_result
        FROM predictions p
        JOIN users u ON p.user_id = u.id
    """
    cursor.execute(query)
    predictions = cursor.fetchall()
    cursor.close()

    cursor = mysql.connection.cursor()
    total_patients_query = "SELECT COUNT(*) FROM users WHERE role='patient'"
    cursor.execute(total_patients_query)
    total_patients = cursor.fetchone()[0]

    positive_patients_query = "SELECT COUNT(*) FROM predictions WHERE prediction_result = 1"
    cursor.execute(positive_patients_query)
    positive_patients = cursor.fetchone()[0]
    cursor.close()

    response_data = {
        "predictions": predictions,
        "total_patients": total_patients,
        "positive_patients": positive_patients
    }

    return jsonify(response_data), 200

if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    app.run(debug=True)
