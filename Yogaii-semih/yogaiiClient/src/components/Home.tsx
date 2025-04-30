import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Button,
  Container,
  Chip,
  Card,
  CardContent
} from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Ana sayfadaki model seleksiyonu
const YOGA_POSES = ['downdog', 'goddess', 'plank', 'tree', 'warrior2'];

const IMAGE_LIST = [
    '/images/pngegg (7).png',
    '/images/pngegg (10).png',
    '/images/pngegg (11).png',
    '/images/pngegg (12).png',
    '/images/pngegg (13).png'
];

// Her yoga pozu için renk tanımları
const POSE_COLORS: { [key: string]: string } = {
  downdog: '#8e44ad',
  goddess: '#9b59b6',
  plank: '#3498db',
  tree: '#2ecc71',
  warrior2: '#e74c3c'
};

// Aşağı Bakan Köpek (Downward Dog) pozu modeli
function DownDogModel({ color }: { color: string }) {
  return (
    <group rotation={[0, Math.PI / 4, 0]}>
      {/* Vücut */}
      <mesh position={[0, 0.5, 0]} rotation={[-Math.PI / 4, 0, 0]}>
        <capsuleGeometry args={[0.5, 2, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Kollar */}
      <mesh position={[-0.7, 0.3, -0.5]} rotation={[Math.PI / 3, 0, -Math.PI / 12]}>
        <capsuleGeometry args={[0.2, 1.5, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.7, 0.3, -0.5]} rotation={[Math.PI / 3, 0, Math.PI / 12]}>
        <capsuleGeometry args={[0.2, 1.5, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Bacaklar */}
      <mesh position={[-0.4, -0.7, 0.8]} rotation={[Math.PI / 6, 0, 0]}>
        <capsuleGeometry args={[0.2, 1.8, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.4, -0.7, 0.8]} rotation={[Math.PI / 6, 0, 0]}>
        <capsuleGeometry args={[0.2, 1.8, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Baş */}
      <mesh position={[0, 1.1, -0.9]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

// Tanrıça (Goddess) pozu modeli
function GoddessModel({ color }: { color: string }) {
  return (
    <group rotation={[0, Math.PI / 4, 0]}>
      {/* Gövde */}
      <mesh position={[0, 0.7, 0]}>
        <capsuleGeometry args={[0.4, 1.2, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Bacaklar - geniş duruş */}
      <mesh position={[-0.8, -0.6, 0]} rotation={[0, 0, Math.PI / 6]}>
        <capsuleGeometry args={[0.2, 1.5, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.8, -0.6, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <capsuleGeometry args={[0.2, 1.5, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Kollar - dirsekler 90 derece */}
      <mesh position={[-0.7, 1.0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <capsuleGeometry args={[0.15, 1.2, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.7, 1.0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.15, 1.2, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Baş */}
      <mesh position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

// Plank pozu modeli
function PlankModel({ color }: { color: string }) {
  return (
    <group rotation={[0, Math.PI / 4, 0]}>
      {/* Vücut - düz bir çizgi halinde */}
      <mesh position={[0, 0.3, 0]} rotation={[0, 0, 0]}>
        <capsuleGeometry args={[0.4, 2.5, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Kollar - omuzlar altında */}
      <mesh position={[-1.2, 0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.15, 0.8, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[1.2, 0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <capsuleGeometry args={[0.15, 0.8, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Bacaklar - vücutla aynı düzlemde */}
      <mesh position={[0, 0.3, -1.5]}>
        <capsuleGeometry args={[0.3, 0.6, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Baş */}
      <mesh position={[1.7, 0.3, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

// Ağaç (Tree) pozu modeli
function TreeModel({ color }: { color: string }) {
  return (
    <group rotation={[0, Math.PI / 4, 0]}>
      {/* Gövde - dik duruş */}
      <mesh position={[0, 0.7, 0]}>
        <capsuleGeometry args={[0.3, 1.8, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Bacaklar - biri yere bastırıyor, diğeri katlı */}
      <mesh position={[0, -0.8, 0]} rotation={[0, 0, 0]}>
        <capsuleGeometry args={[0.2, 1.2, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.3, 0, 0]} rotation={[0, 0, Math.PI / 3]}>
        <capsuleGeometry args={[0.15, 0.8, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Kollar - yukarıda birleşmiş */}
      <mesh position={[-0.2, 1.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <capsuleGeometry args={[0.15, 1.2, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.2, 1.5, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <capsuleGeometry args={[0.15, 1.2, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Baş */}
      <mesh position={[0, 2.0, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

// Savaşçı II (Warrior 2) pozu modeli
function Warrior2Model({ color }: { color: string }) {
  return (
    <group rotation={[0, Math.PI / 4, 0]}>
      {/* Gövde */}
      <mesh position={[0, 0.8, 0]}>
        <capsuleGeometry args={[0.4, 1.2, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Bacaklar - ön ve arka bacak, geniş duruş */}
      <mesh position={[-0.8, -0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
        <capsuleGeometry args={[0.2, 1.5, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.8, -0.2, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <capsuleGeometry args={[0.2, 1.5, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Kollar - yanlara açılmış, düz bir çizgide */}
      <mesh position={[-1.2, 0.9, 0]} rotation={[0, 0, Math.PI/2]}>
        <capsuleGeometry args={[0.15, 1.0, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[1.2, 0.9, 0]} rotation={[0, 0, Math.PI/2]}>
        <capsuleGeometry args={[0.15, 1.0, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Baş - gövdeyle aynı hizada */}
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

// Pozu renderleyen bileşen
function YogaPoseModel({ poseName }: { poseName: string }) {
    const color = POSE_COLORS[poseName] || '#FDC9BA';
  
  switch(poseName) {
    case 'downdog':
      return <DownDogModel color={color} />;
    case 'goddess':
      return <GoddessModel color={color} />;
    case 'plank':
      return <PlankModel color={color} />;
    case 'tree':
      return <TreeModel color={color} />;
    case 'warrior2':
      return <Warrior2Model color={color} />;
    default:
      // Varsayılan model
      return (
        <mesh rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[1.5, 3, 1]} />
          <meshStandardMaterial color={color} />
        </mesh>
      );
  }
}

// Ana sayfa bileşeni
function Home() {
  const [currentPoseIndex, setCurrentPoseIndex] = useState(0);
  const autoRotateRef = useRef(true);
  
  // Her 5 saniyede bir poz değiştir
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPoseIndex((prev) => (prev + 1) % YOGA_POSES.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const currentPose = YOGA_POSES[currentPoseIndex];
  const currentImage = IMAGE_LIST[currentPoseIndex];
  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: 1,
        pb: 1,
              background: 'linear-gradient(145deg, rgba(94, 53, 177, 0.05) 0%, #D3D3D3 100%)',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ mb: 7, textAlign: 'center' }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
                background: 'linear-gradient(45deg, #5e35b1 30%, #FDC9BA 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Yoga Pozu Tespiti
          </Typography>
          <Typography 
            variant="h5" 
            color="textSecondary" 
            sx={{ maxWidth: 700, mx: 'auto', mb: 4 }}
          >
            TensorFlow ile güçlendirilmiş yapay zeka destekli yoga pozu tespit uygulaması
          </Typography>
          <Button 
            component={Link} 
            to="/live-detection" 
            variant="contained" 
            size="large" 
            color="primary"
            sx={{ 
              py: 1.5, 
              px: 4, 
              borderRadius: 2,
              fontWeight: 'bold',
                background: 'linear-gradient(45deg, #5e35b1 30%, #FBB2A9 90%)',
              boxShadow: '0 3px 5px 2px rgba(94, 53, 177, .3)'
            }}
          >
            Canlı Tespit Başlat
          </Button>
        </Box>
        
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom>
              Yoga Pozunuzu Anında Tespit Edin
            </Typography>
            <Typography variant="body1" paragraph>
              Web kameranızı kullanarak gerçek zamanlı yoga pozu tespiti yapabilirsiniz. 
              Uygulamamız, TensorFlow ile eğitilmiş yapay zeka modeli sayesinde 
              pozunuzu analiz eder ve doğru formu yakalamanıza yardımcı olur.
            </Typography>
            
            <Box sx={{ mt: 2, mb: 4 }}>
              <Typography variant="subtitle1" gutterBottom>
                Tespit Edilen Pozlar:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {YOGA_POSES.map((pose, index) => (
                  <Chip 
                    key={pose} 
                    label={pose}
                    clickable
                        sx={{
                            backgroundColor: '#fdecef',  // Açık pastel pembe (çok yumuşak)
                            borderColor: '#f8bbd0',      // Açık pastel pembe kenar çizgisi
                            color: '#8e44ad',            // Yazı rengi (hoş bir mor tonu)
                            fontWeight: 'bold',          // YAZILARI BOLD YAPTIK
                            fontSize: '0.8rem',
                            paddingX: 1.5,
                            paddingY: 0.5,
                            borderRadius: '20px',
                            '&:hover': {
                                backgroundColor: '#f8bbd0',  // Hover olunca bir ton koyulaşsın
                            }
                        }}
                    variant="outlined"
                    onClick={() => setCurrentPoseIndex(index)}
                  />
                ))}
              </Box>
            </Box>
            
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                bgcolor: 'rgba(94, 53, 177, 0.05)', 
                borderRadius: 2, 
                border: '1px solid rgba(94, 53, 177, 0.1)'
              }}
            >
              <Typography variant="body2" color="textSecondary">
                ✨ TensorFlow modeliyle güçlendirilmiş yapay zeka asistanı
                <br />
                ✨ 5 farklı yoga pozu tespiti (downdog, goddess, plank, tree, warrior2)
                <br />
                ✨ 3D modellerle doğru formun görselleştirmesi
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={4} 
              sx={{ 
                height: 400, 
                overflow: 'hidden',
                borderRadius: 4,
                background: 'linear-gradient(145deg, rgba(94, 53, 177, 0.05) 0%, rgba(0, 188, 212, 0.05) 100%)',
                position: 'relative'
              }}
            >
                          <Box
                              component="img"
                              src={currentImage}
                              alt="Yoga Pozu"
                              sx={{
                                  maxHeight: '100%',
                                  maxWidth: '100%',
                                  objectFit: 'contain',
                                  display: 'block',
                                  margin: 'auto',
                                  position: 'relative',
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  transition: 'opacity 1s ease-in-out'
                              }}
                              onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/images/default.png';
                              }}
                          />

            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;
