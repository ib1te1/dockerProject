import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Typography, List, ListItem, ListItemText, Divider, TextField, Button
} from '@mui/material';

function Reports() {
    const [booksAuthorName, setBooksAuthorName] = useState('');
    const [genresAuthorName, setGenresAuthorName] = useState('');
    const [bookPriceRange, setBookPriceRange] = useState(null);
    const [averagePriceByAuthor, setAveragePriceByAuthor] = useState([]);
    const [bookCountByAuthor, setBookCountByAuthor] = useState([]);
    const [booksByAuthor, setBooksByAuthor] = useState([]);
    const [genresByAuthor, setGenresByAuthor] = useState([]);
    const [averagePricePerGenre, setAveragePricePerGenre] = useState([]);

    const fetchAveragePricePerGenre = () => {
        axios.get('http://localhost:8080/api/reports/average-price-per-genre')
            .then(response => {
                console.log('Данные средней цены книг по жанрам:', response.data);
                setAveragePricePerGenre(response.data);
            })
            .catch(error => console.error('Error fetching average price per genre:', error));
    };


    const fetchBookPriceRange = () => {
        axios.get('http://localhost:8080/api/reports/book-price-range')
            .then(response => {
                console.log('Диапазон цен книг:', response.data);
                setBookPriceRange(response.data);
            })
            .catch(error => console.error('Error fetching book price range:', error));
    };
    useEffect(() => {
        fetchBookAveragePriceByAuthor();
        fetchBookCountByAuthor();
        fetchBookPriceRange();
        fetchAveragePricePerGenre();
        if (booksAuthorName) {
            fetchBooksByAuthor(booksAuthorName);
        }

        if (genresAuthorName) {
            fetchGenresByAuthor(genresAuthorName);
        }
    }, [booksAuthorName, genresAuthorName]);

    const fetchBooksByAuthor = (authorName) => {
        axios.get(`http://localhost:8080/api/reports/author-books?authorName=${authorName}`)
            .then(response => setBooksByAuthor(response.data))
            .catch(error => console.error('Error fetching books by author:', error));
    };

    const fetchGenresByAuthor = (authorName) => {
        axios.get(`http://localhost:8080/api/reports/author-genres?authorName=${authorName}`)
            .then(response => {
                console.log('Ответ сервера для жанров:', response.data);
                console.log('Data structure:', response.data[0]);
                setGenresByAuthor(response.data);
            })
            .catch(error => console.error('Error fetching genres by author:', error));
    };

    const fetchBookAveragePriceByAuthor = () => {
        axios.get('http://localhost:8080/api/reports/book-average-price-by-author')
            .then(response => {
                console.log('Данные средней цены книг по автору:', response.data);
                setAveragePriceByAuthor(response.data);
            })
            .catch(error => console.error('Error fetching book average price by author:', error));
    };

    const fetchBookCountByAuthor = () => {
        axios.get('http://localhost:8080/api/reports/book-count-by-author')
            .then(response => setBookCountByAuthor(response.data))
            .catch(error => console.error('Error fetching book count by author:', error));
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom align="center"style={{ marginTop: '30px'}}>
                Отчеты
            </Typography>


            {}
            <Typography variant="h5" gutterBottom>
                Средняя цена книг автора
            </Typography>
            <List>
                {averagePriceByAuthor.map(item => (
                    <ListItem key={item.authorId}>
                        <ListItemText primary={`Автор: ${item.authorId}, Средняя цена: ${item.averagePrice}`} />
                    </ListItem>
                ))}
            </List>

            <Typography variant="h5" gutterBottom>
                Количество книг автора
            </Typography>
            <List>
                {bookCountByAuthor.map(item => (
                    <ListItem key={item.authorId}>
                        <ListItemText primary={`Автор: ${item.authorId}, Количество книг: ${item.bookCount}`} />
                    </ListItem>
                ))}
            </List>

            {}
            <Typography variant="h5" gutterBottom>
                Все книги автора
            </Typography>
            <TextField
                label="Введите имя автора"
                variant="outlined"
                value={booksAuthorName}
                onChange={(e) => setBooksAuthorName(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button sx={{ backgroundColor: '#00FFFF', color: '#000080', width: '150px' }} onClick={() => setBooksAuthorName(booksAuthorName)} variant="contained">
                Обновить
            </Button>
            <List>
                {booksByAuthor.map(book => (
                    <ListItem key={book.id}>
                        <ListItemText primary={`Название: ${book.title}`} />
                    </ListItem>
                ))}
            </List>

            <Typography variant="h5" gutterBottom>
                Все жанры автора
            </Typography>
            <TextField
                label="Введите имя автора"
                variant="outlined"
                value={genresAuthorName}
                onChange={(e) => setGenresAuthorName(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button sx={{ backgroundColor: '#00FFFF', color: '#000080', width: '150px' }} onClick={() => setGenresAuthorName(genresAuthorName)} variant="contained">
                Обновить
            </Button>
            <List>
                {genresByAuthor.map((genre, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={`Жанр: ${genre}`} />
                    </ListItem>
                ))}
            </List>

            <Typography variant="h5" gutterBottom>
                Диапазон цен
            </Typography>
            <List>
                {bookPriceRange? (
                    <>
                        <ListItem>
                            <ListItemText primary={`Минимальная цена: ${bookPriceRange.minPrice}`} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={`Максимальная цена: ${bookPriceRange.maxPrice}`} />
                        </ListItem>
                    </>
                ) : (
                    <ListItem>
                        <ListItemText primary="Данные о диапазоне цен книги загружаются..." />
                    </ListItem>
                )}
            </List>
            <Typography variant="h5" gutterBottom>
                Средняя цена книг по жанрам
            </Typography>
            <List>
                {averagePricePerGenre.map(item => (
                    <ListItem key={item.genre}>
                        <ListItemText primary={`Жанр: ${item.id}, Средняя цена: ${item.averagePrice}`} />
                    </ListItem>
                ))}
            </List>

        </div>
    );
}

export default Reports;
