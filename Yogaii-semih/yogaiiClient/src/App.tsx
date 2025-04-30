import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { 
  CssBaseline, 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box, 
  Button,
  Paper,
  Grid
} from '@mui/material';
import './App.css';

// Bileşenler oluşturulacak
const Home = React.lazy(() => import('./components/Home'));
const PosesList = React.lazy(() => import('./components/PosesList'));
const PoseDetail = React.lazy(() => import('./components/PoseDetail'));
const LiveDetection = React.lazy(() => import('./components/LiveDetection'));

// Tema
const theme = createTheme({
  palette: {
    primary: {
      main: '#5e35b1',
    },
    secondary: {
      main: '#00bcd4',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
              <AppBar position="static" color="primary" elevation={0} sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                  <Toolbar>
                      <Typography
                          variant="h6"
                          color="inherit"
                          noWrap
                          sx={{
                              flexGrow: 1,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1 // Yazı ve resim arasına boşluk
                          }}
                      >
                          <Link to="/" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                              <img
                                  src="/images/lotus (1).png"
                                  alt="Lotus Icon"
                                  style={{
                                      width: 30, // ikon boyutu
                                      height: 30,
                                      marginRight: 8 // yazıdan biraz boşluk olsun
                                  }}
                              />
                              YogaAI
                          </Link>
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 2 }}>
                          <Button color="inherit" component={Link} to="/poses" variant="outlined" sx={{ borderColor: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}>
                              Yoga Pozları
                          </Button>
                          <Button color="inherit" component={Link} to="/live" variant="outlined" sx={{ borderColor: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}>
                              Canlı Tespit
                          </Button>
                      </Box>
                  </Toolbar>
              </AppBar>

        
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <React.Suspense fallback={
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
              <Typography>Yükleniyor...</Typography>
            </Box>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/poses" element={<PosesList />} />
              <Route path="/poses/:poseName" element={<PoseDetail />} />
              <Route path="/live" element={<LiveDetection />} />
            </Routes>
          </React.Suspense>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
