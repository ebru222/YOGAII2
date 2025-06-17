import React, { useState, FormEvent } from 'react';
import ApiService from '../services/ApiService';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await ApiService.register(username, email, password);
            alert("Kayıt başarılı! Giriş yapabilirsiniz.");
            navigate("/");
        } catch (err) {
            setError('Kayıt başarısız! Kullanıcı adı zaten kayıtlı olabilir.');
            console.error(err);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            padding: '20px'
        }}>
            <div style={{
                background: '#ffffff',
                padding: '45px 35px',
                borderRadius: '24px',
                boxShadow: '0 15px 45px rgba(0, 0, 0, 0.1)',
                width: '420px',
                maxWidth: '90vw',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)'
            }}>
                <h2 style={{
                    textAlign: 'center',
                    color: '#222',
                    fontSize: '28px',
                    marginBottom: '30px',
                    fontWeight: '600'
                }}>
                    Kayıt Ol
                </h2>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            color: '#000',
                            fontWeight: '500',
                            fontSize: '16px',
                            display: 'block',
                            marginBottom: '6px'
                        }}>Kullanıcı Adı:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '10px',
                                background: '#f9f9f9',
                                fontSize: '15px'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            color: '#000',
                            fontWeight: '500',
                            fontSize: '16px',
                            display: 'block',
                            marginBottom: '6px'
                        }}>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '10px',
                                background: '#f9f9f9',
                                fontSize: '15px'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '25px' }}>
                        <label style={{
                            color: '#000',
                            fontWeight: '500',
                            fontSize: '16px',
                            display: 'block',
                            marginBottom: '6px'
                        }}>Şifre:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '10px',
                                background: '#f9f9f9',
                                fontSize: '15px'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '12px',
                            background: 'linear-gradient(90deg, #a1c4fd, #c2e9fb)',
                            color: '#333',
                            border: 'none',
                            borderRadius: '30px',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            cursor: 'pointer',
                            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.2s ease'
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                        Kayıt Ol
                    </button>
                </form>

                {error && (
                    <p style={{
                        color: '#b00020',
                        marginTop: '20px',
                        textAlign: 'center',
                        fontWeight: '500'
                    }}>
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Register;
