import React, { useState } from 'react';
import axios from 'axios';
import { Avatar, Button, CssBaseline, TextField, Paper, Box, Grid, Typography, Dialog } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Link } from 'react-router-dom';

const theme = createTheme();

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    pregnancies: '',
    glucose: '',
    bloodpressure: '',
    skinthickness: '',
    insulin: '',
    bmi: '',
    dpf: '',
    age: ''
  });
  const [prediction, setPrediction] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.post('http://localhost:5000/predict', formData, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      setPrediction(response.data.prediction);
      setModalIsOpen(true);
    } catch (error) {
      console.error('Error during prediction:', error);
    }
  };

  const renderDialogContent = () => {
    const isPositive = prediction === 1;
    const containerStyle = {
      backgroundColor: isPositive ? '#240750' : '#304463',
      // borderRadius: '10%',
      padding: '80px',
      textAlign: 'center',
      border: 'none',
      boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'
  };
    const headingStyle = {
      color: '#fff',
      marginBottom: '20px'
    };
    const messageStyle = {
      color: isPositive ? 'red' : 'green',
      background: '#fff',
      padding: '10px 20px',
      display: 'inline-block',
      fontWeight: 300
    };

    return (
      <Box style={containerStyle}>
        <Typography component="h3" variant="h4" style={headingStyle}>
          Votre test
        </Typography>
        <Typography component="h4" variant="h5" style={messageStyle}>
          {isPositive ? 'Positive' : 'Negative'}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }} style={{color:'#FFC700'}}>
          {isPositive ? 'Vous avez un le risque d\'avoir le diabète, Un email vous sera envoyé pour plus de détails.' : 'Pas de panique , Vous avez un risque moindre de diabète.'}
        </Typography>
        <Button href="/" variant="contained" sx={{ mt: 3 }} style={{ backgroundColor: '#ff0562', color: '#fff' }}>
          Retour
        </Button>
      </Box>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          flexGrow: 1,
          marginTop:'40px'
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            width: '100%',
            maxWidth: '400px',
            bgcolor: 'rgba(255, 255, 255, 0.8)',
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Avatar sx={{ m: 'auto', bgcolor: 'secondary.main' }}>
            <BarChartIcon />
          </Avatar>
          <Typography component="h1" variant="h5" align="center">
          Prédiction du diabète
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {['pregnancies', 'glucose', 'bloodpressure', 'skinthickness', 'insulin', 'bmi', 'dpf', 'age'].map((field) => (
              <TextField
                key={field}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                autoComplete={field}
                value={formData[field]}
                onChange={handleChange}
              />
            ))}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Predict
            </Button>
          </Box>
        </Box>
      </Box>
      <Dialog
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {renderDialogContent()}
      </Dialog>
    </ThemeProvider>
  );
};

export default PredictionForm;
