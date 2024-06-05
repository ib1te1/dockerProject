import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Container, List, ListItem, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

function Authors(props) {
    const [authors, setAuthors] = useState([]);
    const [newAuthor, setNewAuthor] = useState({ name: '', nationality: '', birthYear: '', deathYear: '' });
    const [editingAuthor, setEditingAuthor] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchAuthors();
    }, [searchQuery]);

    const fetchAuthors = () => {
        let url = 'http://localhost:8080/api/authors';
        if (searchQuery) {
            url += `?query=${encodeURIComponent(searchQuery)}`;
        }
        console.log('Fetching authors with URL:', url);
        axios.get(url)
            .then(response => {
                console.log('Response data:', response.data);
                setAuthors(response.data);
            })
            .catch(error => console.error('Error fetching authors:', error));
    };

    const handleAdd = () => {
        axios.post('http://localhost:8080/api/authors', newAuthor)
            .then(response => {
                setAuthors(prevAuthors => [...prevAuthors, response.data]);
                setNewAuthor({ name: '', nationality: '', birthYear: '', deathYear: '' });
            })
            .catch(error => console.error('Error adding author:', error));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/api/authors/${id}`)
            .then(() => {
                setAuthors(prevAuthors => prevAuthors.filter(author => author._id!== id));
            })
            .catch(error => console.error('Error deleting author:', error));
    };

    const handleEdit = (id) => {
        const authorToEdit = authors.find(author => author._id === id);
        setEditingAuthor(authorToEdit);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (editingAuthor) {
            setEditingAuthor({...editingAuthor, [name]: value });
        } else {
            setNewAuthor({...newAuthor, [name]: value });
        }
    };

    const handleSave = () => {
        if (editingAuthor) {
            axios.put(`http://localhost:8080/api/authors/${editingAuthor._id}`, editingAuthor)
                .then(response => {
                    setAuthors(prevAuthors => prevAuthors.map(author =>
                        author._id === editingAuthor._id? response.data : author
                    ));
                    setEditingAuthor(null);
                })
                .catch(error => console.error('Error updating author:', error));
        }
    };

    const handleCancel = () => {
        setEditingAuthor(null);
    };

    const handleSearch = () => {
        if (searchQuery) {
            const filteredAuthors = authors.filter(author =>
                author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                author.nationality.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setAuthors(filteredAuthors);
        } else {
            fetchAuthors();
        }
    };


    const handleResetSearch = () => {
        setSearchQuery('');
        fetchAuthors();
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Авторы</Typography>
            <Box mb={2}>
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Search by Name or Nationality"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{ mr: 1 }}
                />
                <Button variant="contained"
                        sx={{ backgroundColor: '#00FFFF', color: '#000080', width: '150px',mr: 1 }} onClick={handleSearch} >Поиск</Button>
                <Button variant="outlined" color="secondary" onClick={handleResetSearch}>Сбросить</Button>
            </Box>
            <List>
                {authors.map(author => (
                    <ListItem key={author._id} sx={{ display: 'flex', alignItems: 'center' }}>
                        {editingAuthor && editingAuthor._id === author._id? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="name"
                                    value={editingAuthor.name}
                                    onChange={handleChange}
                                    placeholder="Name"
                                    sx={{ mb: 1 }}
                                />
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="nationality"
                                    value={editingAuthor.nationality}
                                    onChange={handleChange}
                                    placeholder="Nationality"
                                    sx={{ mb: 1 }}
                                />
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="birthYear"
                                    value={editingAuthor.birthYear}
                                    onChange={handleChange}
                                    placeholder="Birth Year"
                                    sx={{ mb: 1 }}
                                />
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="deathYear"
                                    value={editingAuthor.deathYear}
                                    onChange={handleChange}
                                    placeholder="Death Year"
                                    sx={{ mb: 1 }}
                                />
                                <Box>
                                    <Button variant="contained" onClick={handleSave} sx={{ mr: 1 }}>Save</Button>
                                    <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                                </Box>
                            </Box>
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                                    {author.name} ({author.nationality}) - {author.birthYear} - {author.deathYear}
                                </Typography>
                                <IconButton onClick={() => handleEdit(author._id)} sx={{ mr: 1 }}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(author._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        )}
                    </ListItem>
                ))}
            </List>
            {props.currentUser !== 'readUser' && (
            <Box mt={3}>
                <Typography variant="h5">Добавить / Изменить Автора</Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    name="name"
                    value={editingAuthor? editingAuthor.name : newAuthor.name}
                    onChange={handleChange}
                    placeholder="Name"
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    name="nationality"
                    value={editingAuthor? editingAuthor.nationality : newAuthor.nationality}
                    onChange={handleChange}
                    placeholder="Nationality"
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    name="birthYear"
                    value={editingAuthor? editingAuthor.birthYear : newAuthor.birthYear}
                    onChange={handleChange}
                    placeholder="Birth Year"
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    name="deathYear"
                    value={editingAuthor? editingAuthor.deathYear : newAuthor.deathYear}
                    onChange={handleChange}
                    placeholder="Death Year"
                    sx={{ mb: 2 }}
                />
                {editingAuthor? (
                    <>
                        <Button variant="contained" onClick={handleSave} sx={{ mr: 1 }}>Save</Button>
                        <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                    </>
                ) : (
                    <Button  variant="contained"
                             sx={{ backgroundColor: '#00FFFF', color: '#000080', width: '150px' }} onClick={handleAdd}>Добавить</Button>
                )}
            </Box>
                )}
        </Container>
    );
}

export default Authors;
