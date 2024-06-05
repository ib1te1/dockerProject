import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import {AppBar, Toolbar, Button, Typography, Container, Box, IconButton, Avatar} from '@mui/material';
import Books from "./Books.jsx";
import Authors from "./Authors.jsx";
import Genres from "./Genres.jsx";
import Reports from "./Reports.jsx";

function App() {
    const [currentUser, setCurrentUser] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleLogin = async (username, password) => {
        try {
            const formData = new URLSearchParams();
            formData.append('name', username);
            formData.append('password', password);

            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            });

            if (response.ok) {
                console.log(username);
                setCurrentUser(username);
                setIsLoggedIn(true);
            } else {
                console.error('Ошибка аутентификации');
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        window.location.href = "http://localhost:5173";
    };
    return (
        <Router>
            <div>
                {isLoggedIn && (
                    <AppBar position="static" sx={{
                        backgroundImage: 'linear-gradient(90deg, rgba(252, 188, 0, 1) 0%, rgba(208, 32, 31, 1) 100%)',
                    }}>
                        <Toolbar sx={{ display:"flex",justifyContent: 'center', alignItems: 'center' }}> {}
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <Avatar src="/images/book.png" alt="Book Icon" />
                            </IconButton>
                            <Typography variant="h6" sx={{ display:"flex",justifyContent: 'center',fontSize: '1.5rem', flexGrow: 1 }} fontWeight="bold"> {}
                                BookShop
                            </Typography>
                            <Button color="inherit" onClick={handleLogout}>Выйти</Button>
                        </Toolbar>
                    </AppBar>
                )}
                <nav>
                    <Container>
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: '10px', listStyleType: 'none' }}> {}
                            {isLoggedIn? (
                                <>
                                    <li><Link to="/books"><Button variant="contained"
                                                                  sx={{ backgroundColor: '#00FFFF', color: '#000080', width: '150px' }}>Книги</Button></Link>
                                    </li>
                                    <li><Link to="/authors"><Button variant="contained"
                                                                    sx={{ backgroundColor: '#00FFFF', color: '#000080', width: '150px' }}>Авторы</Button></Link>
                                    </li>
                                    <li><Link to="/genres"><Button variant="contained"
                                                                   sx={{ backgroundColor: '#00FFFF', color: '#000080', width: '150px' }}>Жанры</Button></Link>
                                    </li>
                                    {currentUser=== 'adminUser' &&
                                    <li><Link to="/reports"><Button variant="contained"
                                                                    sx={{ backgroundColor: '#00FFFF', color: '#000080', width: '150px' }}>Отчеты</Button></Link>
                                    </li>
                                    }
                                </>
                            ) : null}
                        </Box>
                    </Container>

                </nav>

                <Routes>
                    {!isLoggedIn && <Route path="/" element={<LoginForm onLogin={handleLogin} />} />}
                    {isLoggedIn && (
                        <>
                            <Route path="/books" element={<Books currentUser={currentUser} />} />
                            <Route path="/authors" element={<Authors currentUser={currentUser}/>} /> {}
                            <Route path="/genres" element={<Genres currentUser={currentUser}/>} /> {}
                            <Route path="/reports" element={<Reports />} /> {}
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    );
}

export default App;