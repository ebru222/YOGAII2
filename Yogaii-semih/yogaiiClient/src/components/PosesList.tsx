import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button,
  CardActionArea,
  Skeleton,
  Chip,
  CardActions
} from '@mui/material';
import axios from 'axios';

// Yoga pozu arayüzü
interface YogaPose {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  modelUrl: string;
}

function PosesList() {
  const [poses, setPoses] = useState<YogaPose[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API'den yoga pozlarını getir
    const fetchPoses = async () => {
      try {
        // API henüz hazır olmadığı için simüle edilmiş veri
        // Gerçek uygulamada: const response = await axios.get('https://localhost:7066/api/YogaPose');
        
        // Simüle edilmiş veri
        const simulatedData: YogaPose[] = [
          {
            id: 1,
            name: "Down Dog",
            description: "Aşağı Bakan Köpek (Down Dog) pozu, sırtı ve bacaların arkasını esnetir ve kol, omuz ve hamstringleri güçlendirir.",
            imageUrl: "/images/poses/downdog.jpg",
            modelUrl: "/models/poses/downdog.glb"
          },
          {
            id: 2,
            name: "Goddess",
            description: "Tanrıça (Goddess) pozu, kalçaları açar, bacakları ve çekirdek gücü güçlendirir.",
            imageUrl: "/images/poses/goddess.jpg",
            modelUrl: "/models/poses/goddess.glb"
          },
          {
            id: 3,
            name: "Plank",
            description: "Plank pozu, karın kaslarını, kolları ve bilekleri güçlendirir ve duruşu iyileştirir.",
            imageUrl: "/images/poses/plank.jpg",
            modelUrl: "/models/poses/plank.glb"
          },
          {
            id: 4,
            name: "Tree",
            description: "Ağaç (Tree) pozu, denge, konsantrasyon ve duruşu geliştirir.",
            imageUrl: "/images/poses/tree.jpg",
            modelUrl: "/models/poses/tree.glb"
          },
          {
            id: 5,
            name: "Warrior 2",
            description: "Savaşçı 2 (Warrior 2) pozu, bacakları güçlendirir, göğsü açar ve dayanıklılığı artırır.",
            imageUrl: "/images/poses/warrior2.jpg",
            modelUrl: "/models/poses/warrior2.glb"
          }
        ];
        
        // Veriyi ayarla
        setPoses(simulatedData);
        setLoading(false);
      } catch (error) {
        console.error('Yoga pozları yüklenirken hata oluştu:', error);
        setLoading(false);
      }
    };

    fetchPoses();
  }, []);

  // Placeholder görüntüler için renk dizisi
  const placeholderColors = ['#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#00bcd4'];

  return (
    <Box sx={{ py: 6 }}>
      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom
        align="center"
        sx={{ 
          mb: 6,
          fontWeight: 700,
            background: 'linear-gradient(45deg, #5e35b1 30%, #FDC9BA 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Yoga Pozları
      </Typography>
      
      <Grid container spacing={4}>
        {loading ? (
          // Yükleme iskeleti
          Array.from(new Array(5)).map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Skeleton variant="rectangular" height={200} sx={{ bgcolor: placeholderColors[index % placeholderColors.length] + '20' }} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Skeleton variant="text" height={32} width="80%" sx={{ mb: 1 }} />
                  <Skeleton variant="text" height={20} width="90%" />
                  <Skeleton variant="text" height={20} width="70%" />
                </CardContent>
                <CardActions>
                  <Skeleton variant="rectangular" height={36} width={120} sx={{ borderRadius: 1 }} />
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          // Gerçek veri
          poses.map((pose) => (
            <Grid item key={pose.id} xs={12} sm={6} md={4}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: '0px 10px 25px rgba(94, 53, 177, 0.3)'
                  }
                }}
              >
                <CardActionArea component={Link} to={`/poses/${pose.name.toLowerCase().replace(' ', '')}`}>
                  {/* Gerçek resimler yerine renk blokları kullanıyoruz (API için resimler hazır olmadığından) */}
                  <Box 
                    sx={{ 
                      height: 200, 
                      bgcolor: placeholderColors[pose.id % placeholderColors.length] + '40',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Typography variant="h4" color="white" sx={{ fontWeight: 700, textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                      {pose.name}
                    </Typography>
                  </Box>
                  
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" component="h2" gutterBottom>
                        {pose.name}
                      </Typography>
                      <Chip 
                        label="3D Model" 
                        size="small" 
                        sx={{ 
                          bgcolor: placeholderColors[pose.id % placeholderColors.length] + '20',
                          color: placeholderColors[pose.id % placeholderColors.length],
                          fontWeight: 500
                        }} 
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {pose.description.length > 100 
                        ? `${pose.description.substring(0, 100)}...` 
                        : pose.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button 
                    size="small" 
                    color="primary" 
                    component={Link} 
                    to={`/poses/${pose.name.toLowerCase().replace(' ', '')}`}
                  >
                    Detayları Gör
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}

export default PosesList;
