import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

function Genres(props) {
    const [genres, setGenres] = useState([]);
    const [newGenre, setNewGenre] = useState({ name: '', description: '' });
    const [editingGenre, setEditingGenre] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchGenres = () => {
        axios.get('http://localhost:8080/api/genres')
            .then(response => {
                setGenres(response.data);
            })
            .catch(error => console.error('Error fetching genres:', error));
    };

    const handleSearch = () => {
        const filteredGenres = genres.filter(genre =>
            genre.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            genre.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setGenres(filteredGenres);
    };


    const handleAdd = () => {
        axios.post('http://localhost:8080/api/genres', newGenre)
            .then(response => {
                setGenres([...genres, response.data]);
                setNewGenre({ name: '', description: '' });
            })
            .catch(error => console.error('Error adding genre:', error));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/api/genres/${id}`)
            .then(response => {
                setGenres(genres.filter(genre => genre._id!== id));
            })
            .catch(error => console.error('Error deleting genre:', error));
    };

    const handleEdit = (id) => {
        const genreToEdit = genres.find(genre => genre._id === id);
        setEditingGenre(genreToEdit);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (editingGenre) {
            setEditingGenre({...editingGenre, [name]: value });
        } else {
            setNewGenre({...newGenre, [name]: value });
        }
    };

    const handleSave = () => {
        if (editingGenre) {
            axios.put(`http://localhost:8080/api/genres/${editingGenre._id}`, editingGenre)
                .then(response => {
                    setGenres(genres.map(genre =>
                        genre._id === editingGenre._id? response.data : genre
                    ));
                    setEditingGenre(null);
                })
                .catch(error => console.error('Error updating genre:', error));
        }
    };

    const handleCancel = () => {
        setEditingGenre(null);
    };
    const handleReset = () => {
        setSearchQuery('');
        fetchGenres();
    };
    return (
        <Container>
            <Typography variant="h4" gutterBottom>Жанры</Typography>
            <Box display="flex" alignItems="center" mb={2}>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button variant="contained"
                        sx={{ backgroundColor: '#00FFFF', color: '#000080', width: '150px' }} onClick={handleSearch} style={{ marginLeft: '16px' }}>
                    Поиск
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleReset} style={{ marginLeft: '16px' }}>
                    Сбросить
                </Button>
            </Box>
            <List>
                {genres.map(genre => (
                    <ListItem key={genre._id} divider>
                        {editingGenre && editingGenre._id === genre._id? (
                            <Box width="100%">
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={editingGenre.name}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label="Description"
                                    name="description"
                                    value={editingGenre.description}
                                    onChange={handleChange}
                                    fullWidth
                                    margin="normal"
                                />
                                <Box mt={2}>
                                    <Button variant="contained" color="primary" onClick={handleSave} style={{ marginRight: '8px' }}>
                                        Save
                                    </Button>
                                    <Button variant="outlined" color="secondary" onClick={handleCancel}>
                                        Cancel
                                    </Button>
                                </Box>
                            </Box>
                        ) : (
                            <Box width="100%">
                                <ListItemText
                                    primary={genre.name}
                                    secondary={genre.description}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(genre._id)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(genre._id)}>
                                        <Delete />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </Box>
                        )}
                    </ListItem>
                ))}
            </List>
            {props.currentUser !== 'readUser' && (
            <Box mt={4}>
                <Typography variant="h5">Добавить Жанр</Typography>
                <TextField
                    label="Name"
                    name="name"
                    value={newGenre.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Description"
                    name="description"
                    value={newGenre.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Box mt={2}>
                    <Button variant="contained"
                            sx={{ backgroundColor: '#00FFFF', color: '#000080', width: '150px' }} onClick={handleAdd}>
                        Добавить
                    </Button>
                </Box>
            </Box>
                )}
        </Container>
    );
}

export default Genres;
