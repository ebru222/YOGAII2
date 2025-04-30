import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Button,
  CircularProgress,
  Card,
  CardContent,
  Alert,
  LinearProgress,
  Container,
  Chip,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Fab,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import ApiModelService from '../services/ApiModelService';
import { YOGA_POSES } from '../services/SimulatedModelService';

// Yoga pozu arayüzü
interface YogaPose {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  modelUrl: string;
}

// Tahmin gösterimi bileşeni
const PredictionDisplay = ({ predictions }: { predictions: PredictionResult | null }) => {
  if (!predictions) return null;
  
  const topPrediction = predictions.allPredictions[0];
  
  return (
    <Box sx={{ mt: 2, width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Tespit Edilen Poz: <strong>{topPrediction.className}</strong>
        <Chip 
          label={`${(topPrediction.probability * 100).toFixed(1)}%`} 
          color="primary" 
          size="small" 
          sx={{ ml: 1 }}
        />
      </Typography>
      
      <Typography variant="subtitle2" gutterBottom sx={{ mt: 2, mb: 1 }}>
        Tüm Tahminler:
      </Typography>
      
      {predictions.allPredictions.map((pred) => (
        <Box key={pred.className} sx={{ mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <Typography variant="body2" sx={{ minWidth: 100 }}>
              {pred.className}:
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={pred.probability * 100} 
              sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
            />
            <Typography variant="body2" sx={{ ml: 2, minWidth: 45 }}>
              {(pred.probability * 100).toFixed(1)}%
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

// Canlı tespit bileşeni
function LiveDetection() {
  const theme = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [helpOpen, setHelpOpen] = useState<boolean>(false);
  
  // Kamerayı açma ve kapatma
  const toggleCamera = async () => {
    if (cameraActive) {
      // Kamerayı kapat
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      setCameraActive(false);
      setPrediction(null);
    } else {
      // Kamerayı aç
      setIsLoading(true);
      setError(null);
      
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          
          // Kamera açıldıktan sonra otomatik olarak tahminde bulunmaya başla
          setCameraActive(true);
        }
      } catch (err) {
        console.error('Kamera erişimi hatası:', err);
        setError('Kameraya erişim sağlanamadı. Lütfen kamera izinlerini kontrol edin.');
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  // Görüntü yakalama ve tahmin yapma
  const captureAndPredict = async () => {
    if (!videoRef.current || !canvasRef.current || !cameraActive) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    // Video boyutlarını ayarla
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Videodan kareyi canvas'a çiz
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    try {
      // Simüle edilmiş model servisini kullan
      const result = await ApiModelService.predictPose(canvas);
      setPrediction(result);
    } catch (err) {
      console.error('Tahmin hatası:', err);
      setError('Yoga pozu tahmini yapılırken bir hata oluştu.');
    }
  };
  
  // Her 2 saniyede bir tahmin yap
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (cameraActive) {
      // İlk tahmini hemen yap, sonra her 2 saniyede bir tekrarla
      captureAndPredict();
      interval = setInterval(captureAndPredict, 2000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [cameraActive]);
  
  // Component temizleme
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  // Yardım içeriği
  const helpContent = (
    <Box sx={{ p: 3, width: { xs: '100%', sm: 350 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Yoga Pozu Tespit Yardımı</Typography>
        <IconButton onClick={() => setHelpOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Typography variant="subtitle2" gutterBottom>Nasıl Kullanılır:</Typography>
      <List dense>
        <ListItem>
          <ListItemText primary="1. 'Kamerayı Başlat' butonuna tıklayın" secondary="Kameraya erişim izni verin" />
        </ListItem>
        <ListItem>
          <ListItemText primary="2. Kamera karşısında yoga pozunu alın" secondary="Tüm vücudunuzun görünür olduğundan emin olun" />
        </ListItem>
        <ListItem>
          <ListItemText primary="3. Sistem pozunuzu otomatik olarak tespit edecektir" secondary="Sonuçlar sağ tarafta görüntülenecektir" />
        </ListItem>
        <ListItem>
          <ListItemText primary="4. En doğru sonuçlar için:" />
        </ListItem>
      </List>
      
      <Box component="ul" sx={{ pl: 4, mt: 0 }}>
        <Typography component="li" variant="body2" gutterBottom>İyi aydınlatılmış bir ortamda olun</Typography>
        <Typography component="li" variant="body2" gutterBottom>Kameraya dönük olarak durun</Typography>
        <Typography component="li" variant="body2" gutterBottom>Pozunuzu sabit bir şekilde tutun</Typography>
      </Box>
      
      <Typography variant="subtitle2" sx={{ mt: 2 }} gutterBottom>Algılanabilen Pozlar:</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
        {YOGA_POSES.map(pose => (
          <Chip key={pose} label={pose} size="small" />
        ))}
      </Box>
    </Box>
  );
  
  return (
    <Container maxWidth="lg" sx={{ mt: 3, mb: 8 }}>
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Canlı Yoga Pozu Tespiti
        </Typography>
        
        <Typography variant="body1" paragraph>
          Kameranızı kullanarak gerçek zamanlı yoga pozu tespiti yapın. 
          Kamera karşısında bir yoga pozu alın ve sistem pozunuzu otomatik olarak tespit edecektir.
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Paper 
              elevation={3} 
              sx={{ 
                position: 'relative',
                height: 480,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'grey.900',
                borderRadius: 2,
                overflow: 'hidden'
              }}
            >
              {isLoading && (
                <Box sx={{ position: 'absolute', zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                  <CircularProgress />
                </Box>
              )}
              
              {!cameraActive && !isLoading && (
                <Box sx={{ textAlign: 'center', color: 'white', p: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Kamera kapalı
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, opacity: 0.7 }}>
                    Yoga pozu tespiti için kameranızı başlatın
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={toggleCamera}
                  >
                    Kamerayı Başlat
                  </Button>
                </Box>
              )}
              
              <video 
                ref={videoRef}
                style={{ 
                  display: cameraActive ? 'block' : 'none',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                playsInline
              />
              
              <canvas 
                ref={canvasRef} 
                style={{ 
                  display: 'none' // Görüntü işleme için kullanılacak, kullanıcıya gösterilmeyecek
                }} 
              />
            </Paper>
            
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              {cameraActive ? (
                <Button 
                  variant="outlined" 
                  color="error" 
                  onClick={toggleCamera}
                >
                  Kamerayı Kapat
                </Button>
              ) : (
                <div /> // Boş div (flex düzeni için)
              )}
              
              <Button 
                variant="text" 
                color="info" 
                startIcon={<InfoIcon />}
                onClick={() => setHelpOpen(true)}
              >
                Nasıl Kullanılır
              </Button>
            </Box>
            
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </Grid>
          
          <Grid item xs={12} md={5}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  Tespit Sonuçları
                </Typography>
                
                {!cameraActive ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%', opacity: 0.6 }}>
                    <Typography variant="body2" align="center">
                      Yoga pozu tespiti için kameranızı başlatın
                    </Typography>
                  </Box>
                ) : !prediction ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80%' }}>
                    <CircularProgress size={30} />
                  </Box>
                ) : (
                  <PredictionDisplay predictions={prediction} />
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Yoga pozu bilgileri */}
      <Paper sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Tespit Edilebilen Yoga Pozları
        </Typography>
        
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {YOGA_POSES.map((pose: string, index: number) => (
            <Grid item xs={12} sm={6} md={4} key={pose}>
              <Card sx={{ height: '100%' }}>
                <Box sx={{ 
                  height: 120, 
                  bgcolor: `hsl(${index * 50}, 70%, 85%)`,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Typography variant="h6">
                    {pose}
                  </Typography>
                </Box>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {getDescriptionForPose(pose)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )) }
        </Grid>
      </Paper>
      
      {/* Yardım çekmecesi */}
      <Drawer
        anchor="right"
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
      >
        {helpContent}
      </Drawer>
    </Container>
  );
}

// Poz türlerine göre açıklamalar
function getDescriptionForPose(pose: string): string {
  switch (pose) {
    case 'downdog':
      return 'Aşağı Bakan Köpek (Downward Dog) pozu, tüm vücudu çalıştıran ve esneten temel bir duruştur. Omurgayı uzatır, omuzları ve bacakları güçlendirir.';
    case 'goddess':
      return 'Tanrıça (Goddess) pozu, kalçaları açan ve bacakları güçlendiren güçlü bir duruştur. Enerji akışını dengelemeye yardımcı olur.';
    case 'plank':
      return 'Plank pozu, tüm vücut gücünü geliştiren ve merkez dengeyi artıran temel bir güç duruşudur. Karın, sırt ve kol kaslarını çalıştırır.';
    case 'tree':
      return 'Ağaç (Tree) pozu, denge ve odaklanmayı geliştiren tek ayak üzerinde durulan bir duruştur. Konsantrasyonu artırır ve iç huzuru destekler.';
    case 'warrior2':
      return 'Savaşçı II (Warrior 2) pozu, bacak gücünü artıran ve kalçaları açan dinamik bir duruştur. İç güç ve dayanıklılık geliştirir.';
    default:
      return 'Bu yoga pozu hakkında ayrıntılı bilgi yakında eklenecektir.';
  }
}

// Tahmin sonucu arayüzü
interface PredictionResult {
  className: string;
  probability: number;
  allPredictions: { className: string; probability: number }[];
}

export default LiveDetection;
