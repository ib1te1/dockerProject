import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {TextField, Button, Container, Typography, Box, Grid} from '@mui/material';

const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        onLogin(username, password);
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2} justifyContent="space-between">
                <Grid item xs={12} sm={6}>
                    <Box
                        component="form"
                        onSubmit={(event) => event.preventDefault()}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mt: 8,
                            p: 3,
                            border: '1px solid #ccc',
                            borderRadius: 2,
                            boxShadow: 3,
                            minHeight: '400px',
                            justifyContent: 'space-between',
                            marginTop:0,
                        }}
                    >
                        <Typography variant="h5" gutterBottom>
                            Вход в систему библиотеки
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Имя пользователя"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Пароль"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleLogin}
                            sx={{ mt: 2,backgroundColor: 'green',
                                '&:hover': {
                                    backgroundColor: 'darkgreen',
                                },
                            }}
                        >
                            Войти в систему
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <img src="/images/young-woman-studying-library.jpg" alt="Young woman studying in library" style={{ width: '100%', height: 'auto' }} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default LoginForm;