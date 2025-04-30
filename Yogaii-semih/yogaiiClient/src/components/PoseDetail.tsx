import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Box,
    Typography,
    Container,
    Grid,
    Paper,
    Button,
    Card,
    CardContent,
    Skeleton,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Chip
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useGLTF } from '@react-three/drei';

interface YogaPose {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    modelUrl: string;
}

function PoseDetail() {
    const { poseName } = useParams<{ poseName: string }>();
    const [pose, setPose] = useState<YogaPose | null>(null);
    const [loading, setLoading] = useState(true);

    const uniqueColor = useMemo(() => {
        const colors = ['#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#FDC9BA'];
        const nameSum = poseName?.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) || 0;
        return colors[nameSum % colors.length];
    }, [poseName]);

    useEffect(() => {
        const fetchPoseDetails = async () => {
            try {
                const poseData: YogaPose = {
                    id: poseName === 'downdog' ? 1 : poseName === 'goddess' ? 2 : poseName === 'plank' ? 3 : poseName === 'tree' ? 4 : 5,
                    name: poseName === 'downdog' ? 'Down Dog' : poseName === 'goddess' ? 'Goddess' : poseName === 'plank' ? 'Plank' : poseName === 'tree' ? 'Tree' : 'Warrior 2',
                    description: poseName === 'downdog'
                        ? 'Aşağı Bakan Köpek pozu sırtı ve bacakları esnetir.'
                        : poseName === 'goddess'
                            ? 'Tanrıça pozu kalçaları açar ve güçlendirir.'
                            : poseName === 'plank'
                                ? 'Plank pozu karın kaslarını güçlendirir.'
                                : poseName === 'tree'
                                    ? 'Ağaç pozu dengeyi geliştirir.'
                                    : 'Savaşçı 2 pozu bacak kaslarını güçlendirir.',
                    imageUrl: `/images/poses/${poseName}.jpg`,
                    modelUrl: `/models/poses/${poseName}.glb`
                };

                setPose(poseData);
                setLoading(false);
            } catch (error) {
                console.error('Hata:', error);
                setLoading(false);
            }
        };

        if (poseName) fetchPoseDetails();
    }, [poseName]);

    const poseDetails = useMemo(() => {
        if (!poseName) return null;
        const details = {
            downdog: { difficulty: 'Orta', benefits: ['Omurga esnetir', 'Hamstring güçlendirir'], duration: '30-60 sn', caution: 'Bilek problemleri' },
            goddess: { difficulty: 'Orta', benefits: ['Kalça açar', 'Bacak güçlendirir'], duration: '30-60 sn', caution: 'Diz problemleri' },
            plank: { difficulty: 'Zor', benefits: ['Çekirdek güçlendirir', 'Duruş iyileştirir'], duration: '20-60 sn', caution: 'Bilek problemleri' },
            tree: { difficulty: 'Orta', benefits: ['Denge geliştirir', 'Kasları güçlendirir'], duration: '30-60 sn', caution: 'Denge problemleri' },
            warrior2: { difficulty: 'Orta', benefits: ['Bacak güçlendirir', 'Göğüs açar'], duration: '30-60 sn', caution: 'Diz problemleri' }
        };
        return details[poseName as keyof typeof details];
    }, [poseName]);

    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(120deg, rgba(253,201,186,0.2), rgba(185,223,241,0.2))',
            backdropFilter: 'blur(10px)',
            py: 6
        }}>
            <Container>
                {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={400} />
                ) : (
                    <>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                            <Button component={Link} to="/poses" variant="outlined" sx={{ mr: 2 }}>
                                ← Tüm Pozlar
                            </Button>
                            <Typography variant="h3" sx={{ fontWeight: 700, background: 'linear-gradient(45deg, #5e35b1, #FDC9BA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                {pose?.name}
                            </Typography>
                        </Box>

                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <Paper elevation={3} sx={{ p: 2, height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center', bgcolor: 'grey.100' }}>
                                    <Box component="img" src={`/gifs/${poseName}.gif`} alt={pose?.name} sx={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} onError={(e) => (e.target as HTMLImageElement).src = '/images/default.gif'} />
                                </Paper>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                                    Pozun Açıklaması
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    {pose?.description}
                                </Typography>

                                {poseDetails && (
                                    <>
                                        <Box sx={{ mt: 4, mb: 2 }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6} sm={3}>
                                                    <Card sx={{ bgcolor: 'primary.light', color: 'white' }}>
                                                        <CardContent sx={{ textAlign: 'center' }}>
                                                            <Typography variant="body2" sx={{ mb: 1 }}>Zorluk</Typography>
                                                            <Typography variant="h6">{poseDetails.difficulty}</Typography>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                                <Grid item xs={6} sm={3}>
                                                    <Card sx={{ bgcolor: '#FBB2A9', color: 'white' }}>
                                                        <CardContent sx={{ textAlign: 'center' }}>
                                                            <Typography variant="body2" sx={{ mb: 1 }}>Süre</Typography>
                                                            <Typography variant="h6">{poseDetails.duration}</Typography>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            </Grid>
                                        </Box>

                                        <Typography variant="h6" sx={{ mt: 4, fontWeight: 600 }}>Faydaları</Typography>
                                        <List>
                                            {poseDetails.benefits.map((benefit, idx) => (
                                                <ListItem key={idx} sx={{ py: 0.5 }}>
                                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                                        <FavoriteIcon color="primary" fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText primary={benefit} />
                                                </ListItem>
                                            ))}
                                        </List>

                                        <Typography variant="h6" sx={{ mt: 4, fontWeight: 600 }}>Dikkat Edilmesi Gerekenler</Typography>
                                        <Chip icon={<AccessTimeIcon />} label={poseDetails.caution} color="error" variant="outlined" sx={{ mt: 2 }} />

                                        <Divider sx={{ my: 3 }} />
                                        <Button component={Link} to="/live" variant="contained" color="primary" fullWidth size="large">
                                            Bu Pozu Canlı Dene
                                        </Button>
                                    </>
                                )}
                            </Grid>
                        </Grid>
                    </>
                )}
            </Container>
        </Box>
    );
}

export default PoseDetail;

// GLB modelinin önden yüklenmesini sağlayalım
useGLTF.preload('/3d-models/tree-pose.glb');
