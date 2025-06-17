import React, { useState } from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: 'linear-gradient(135deg, #150636, #fbc2eb)',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }}>
            <div style={{
                background: '#fff',
                padding: '50px 40px',
                borderRadius: '20px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                width: '450px'
            }}>
                <h2 style={{ textAlign: 'center', color: '#5a189a', fontSize: '28px', marginBottom: '30px' }}>Giriş Yap</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '25px' }}>
                        <label style={{ color: '#5a189a', fontWeight: 'bold', fontSize: '18px' }}>Kullanıcı Adı:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: '10px',
                                boxShadow: '0 5px 10px rgba(0,0,0,0.05)',
                                fontSize: '16px'
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '25px' }}>
                        <label style={{ color: '#5a189a', fontWeight: 'bold', fontSize: '18px' }}>Şifre:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                border: '1px solid #ddd',
                                borderRadius: '10px',
                                boxShadow: '0 5px 10px rgba(0,0,0,0.05)',
                                fontSize: '16px'
                            }}
                        />
                    </div>

                    <button type="submit" style={{
                        width: '100%',
                        padding: '15px',
                        background: 'linear-gradient(135deg, #a18cd1, #fbc2eb)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '50px',
                        fontWeight: 'bold',
                        fontSize: '18px',
                        letterSpacing: '1px',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                    }}
                        onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                    >
                        Giriş Yap
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;