// src/components/DoctorDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const DoctorDashboard = () => {
  const [predictions, setPredictions] = useState([]);
  const [totalPatients, setTotalPatients] = useState(0);
  const [positivePatients, setPositivePatients] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem('authToken');
      try {
        const response = await axios.get('http://localhost:5000/doctor-dashboard', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.status === 200) {
          setPredictions(response.data.predictions);
          setTotalPatients(response.data.total_patients);
          setPositivePatients(response.data.positive_patients);
        } else {
          console.error('Failed to fetch predictions:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching predictions:', error);
      }
    };

    fetchData();
  }, []);

  const pieChartData = [
    { name: 'Positive', value: positivePatients },
    { name: 'Negative', value: totalPatients - positivePatients },
  ];

  const ageData = predictions
    .map((prediction) => ({
      age: prediction[10],
      count: 1,
    }))
    .reduce((acc, cur) => {
      acc[cur.age] = (acc[cur.age] || 0) + cur.count;
      return acc;
    }, {});

  const ageChartData = Object.keys(ageData).map((age) => ({
    age: parseInt(age),
    count: ageData[age],
  }));

  return (
    <Box sx={{ padding: 10}}>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#f5a623', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Nombre Total Des Patients
              </Typography>
              <Typography variant="h4">{totalPatients}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#2196f3', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
              Nombre Total Des Patients Positive 
              </Typography>
              <Typography variant="h4">{positivePatients}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#4caf50', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                Consultation confirmées
              </Typography>
              <Typography variant="h4">4</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ marginTop: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
            Distribution d'Age
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
            Distribution des résultats
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#8884d8' : '#82ca9d'} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      <Box my={4}>
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom de Patient</TableCell>
                <TableCell>Numéro de téléphone</TableCell>
                <TableCell>Pregnancies</TableCell>
                <TableCell>Glucose</TableCell>
                <TableCell>Blood Pressure</TableCell>
                <TableCell>Skin Thickness</TableCell>
                <TableCell>Insulin</TableCell>
                <TableCell>BMI</TableCell>
                <TableCell>DPF</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Résultat de prédiction</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {predictions.map((prediction) => (
                <TableRow key={prediction[0]}>
                  <TableCell>{prediction[1]}</TableCell>
                  <TableCell>
                    <QRCodeCanvas value={prediction[2]} size={64} style={{ marginLeft: '10px' }} />
                  </TableCell>
                  <TableCell>{prediction[3]}</TableCell>
                  <TableCell>{prediction[4]}</TableCell>
                  <TableCell>{prediction[5]}</TableCell>
                  <TableCell>{prediction[6]}</TableCell>
                  <TableCell>{prediction[7]}</TableCell>
                  <TableCell>{prediction[8]}</TableCell>
                  <TableCell>{prediction[9]}</TableCell>
                  <TableCell>{prediction[10]}</TableCell>
                  <TableCell>{prediction[11] === 1 ? 'Positive' : 'Negative'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default DoctorDashboard;
