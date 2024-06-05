import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Container, List, ListItem, IconButton, Select, MenuItem } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';


function Books(props) {
    console.log(props)
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [newBook, setNewBook] = useState({ title: '', author: '', genre: '', price: '' });
    const [editingBook, setEditingBook] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    useEffect(() => {
        fetchBooks();
    }, [sortDirection]);


    const fetchBooks = () => {
        axios.get(`http://localhost:8080/api/books?sortBy=price&sortDirection=${sortDirection}`)
            .then(response => {
                setBooks(response.data);
                console.log(response.data);
            })
            .catch(error => console.error('Error fetching books:', error));
    };

    const handleSortChange = () => {
        setSortDirection(sortDirection === 'asc'? 'desc' : 'asc');
        fetchBooks();
    };
    const fetchAuthors = () => {
        axios.get('http://localhost:8080/api/authors')
            .then(response => setAuthors(response.data))
            .catch(error => console.error('Error fetching authors:', error));
    };

    const handleAdd = () => {
        axios.post('http://localhost:8080/api/books', newBook)
            .then(response => {
                setBooks([...books, response.data]);
                setNewBook({ title: '', author: '', genre: '', price: '' });
            })
            .catch(error => console.error('Error adding book:', error));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/api/books/${id}`)
            .then(() => {
                setBooks(books.filter(book => book.id!== id));
            })
            .catch(error => console.error('Error deleting book:', error));
    };

    const handleEdit = (id) => {
        const bookToEdit = books.find(book => book.id === id); // Исправлено на id
        setEditingBook(bookToEdit);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (editingBook) {
            setEditingBook({...editingBook, [name]: value });
        } else {
            setNewBook({...newBook, [name]: value });
        }
    };

    const handleSave = () => {
        if (editingBook) {
            axios.put(`http://localhost:8080/api/books/${editingBook.id}`, editingBook)
                .then(response => {
                    setBooks(books.map(book => book.id === editingBook.id? response.data : book));
                    setEditingBook(null);
                })
                .catch(error => console.error('Error updating book:', error));
        }
    };

    const handleCancel = () => {
        setEditingBook(null);
    };
    return (
        <Container>
            <Typography variant="h4" gutterBottom>Книги</Typography>
            {}
            <Button variant="contained"
                    sx={{ backgroundColor: '#00FFFF', color: '#000080', width: '250px' }} onClick={handleSortChange}>
                Соритровать по {sortDirection === 'asc'? 'Убыванию' : 'Возрастанию'}
            </Button>
            <List>
                {books.map(book => (
                    <ListItem key={book.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {editingBook && editingBook.id === book.id? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="title"
                                    value={editingBook.title}
                                    onChange={handleChange}
                                    placeholder="title"
                                    sx={{ mb: 1 }}
                                />
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="author"
                                    value={editingBook.author}
                                    onChange={handleChange}
                                    placeholder="author"
                                    sx={{ mb: 1 }}
                                />
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="genre"
                                    value={editingBook.genre}
                                    onChange={handleChange}
                                    placeholder="genre"
                                    sx={{ mb: 1 }}
                                />
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="price"
                                    value={editingBook.price}
                                    onChange={handleChange}
                                    placeholder="price"
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
                                    {book.title} - {book.author} - {book.genre} - {book.price} рублей
                                </Typography>
                                <IconButton onClick={() => handleEdit(book.id)} sx={{ mr: 1 }}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(book.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        )}
                    </ListItem>
                ))}
            </List>
            {props.currentUser !== 'readUser' && (
            <Box mt={3}>
                <Typography variant="h5">Добавить Книгу</Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    name="title"
                    value={newBook.title}
                    onChange={handleChange}
                    placeholder="title"
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    name="author"
                    value={newBook.author}
                    onChange={handleChange}
                    placeholder="author"
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    name="genre"
                    value={newBook.genre}
                    onChange={handleChange}
                    placeholder="genre"
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    name="price"
                    value={newBook.price}
                    onChange={handleChange}
                    placeholder="price"
                    sx={{ mb: 2 }}
                />
                <Button variant="contained"
                        sx={{ backgroundColor: '#00FFFF', color: '#000080', width: '150px' }} onClick={handleAdd}>Добавить</Button>
            </Box>
            )}
        </Container>
    );
}

export default Books;
