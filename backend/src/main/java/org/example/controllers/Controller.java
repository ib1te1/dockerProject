package org.example.controllers;

import org.example.models.Author;
import org.example.models.AveragePricePerGenre;
import org.example.models.Book;
import org.example.models.Genre;
import org.example.models.reportModels.*;
import org.example.services.MongoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;

import java.util.*;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.group;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;

@RestController
public class Controller {

    public static MongoTemplate mongoTemplate;
    @Autowired
    MongoService mongoService;
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String name, @RequestParam String password) {
        mongoTemplate = mongoService.mongoTemplate(name, password);
        System.out.println(mongoTemplate.getCollectionNames());
        return ResponseEntity.ok("Аунтефикация прошла успешно");
    }

    @PostMapping("/api/books")
    public Book createBook(@RequestBody Book book) {
        return mongoTemplate.save(book);
    }

    @GetMapping("/api/books/{id}")
    public Book getBookById(@PathVariable String id) {
        return mongoTemplate.findById(id, Book.class);
    }

    @GetMapping("/api/books")
    public List<Book> getAllBooks(@RequestParam(required = false) String sortBy,
                                  @RequestParam(required = false) String sortDirection) {
        Sort.Direction direction = Sort.Direction.ASC;
        if (sortDirection!= null && sortDirection.equalsIgnoreCase("desc")) {
            direction = Sort.Direction.DESC;
        }
        Sort sort = Sort.by(direction, sortBy!= null? sortBy : "_id");
        return mongoTemplate.find(Query.query(new Criteria()).with(sort), Book.class);
    }

    @PutMapping("/api/books/{id}")
    public Book updateBook(@PathVariable String id, @RequestBody Book book) {
        book.setId(id);
        return mongoTemplate.save(book);
    }

    @DeleteMapping("/api/books/{id}")
    public void deleteBook(@PathVariable String id) {
        Book book = mongoTemplate.findById(id, Book.class);
        if (book!= null) {
            mongoTemplate.remove(book);
        }
    }

    @PostMapping("/api/authors")
    public Author createAuthor(@RequestBody Author author) {
        return mongoTemplate.save(author);
    }

    @GetMapping("/api/authors/{id}")
    public Author getAuthorById(@PathVariable String id) {
        return mongoTemplate.findById(id, Author.class);
    }

    @GetMapping("/api/authors")
    public List<Author> getAllAuthors(@RequestParam(required = false) String searchQuery) {
        Query query = new Query();
        if (searchQuery!= null &&!searchQuery.isEmpty()) {
            query.addCriteria(
                    Criteria.where("name").regex(searchQuery).orOperator(
                            Criteria.where("nationality").regex(searchQuery)
                    )
            );
        }
        return mongoTemplate.find(query, Author.class);
    }
    @GetMapping("/api/genres/search")
    public List<Genre> searchGenresByName(@RequestParam(required = false) String name) {
        Query query = new Query();
        if (name!= null &&!name.isEmpty()) {
            query.addCriteria(Criteria.where("name").is(name));
        }
        return mongoTemplate.find(query, Genre.class);
    }

    @PutMapping("/api/authors/{id}")
    public Author updateAuthor(@PathVariable String id, @RequestBody Author author) {
        author.setId(id);
        return mongoTemplate.save(author);
    }

    @DeleteMapping("/api/authors/{id}")
    public void deleteAuthor(@PathVariable String id) {
        Author author = mongoTemplate.findById(id, Author.class);
        if (author!= null) {
            mongoTemplate.remove(author);
        }
    }

    @PostMapping("/api/genres")
    public Genre createGenre(@RequestBody Genre genre) {
        return mongoTemplate.save(genre);
    }

    @GetMapping("/api/genres/{id}")
    public Genre getGenreById(@PathVariable String id) {
        return mongoTemplate.findById(id, Genre.class);
    }

    @GetMapping("/api/genres")
    public List<Genre> getAllGenres(@RequestParam(required = false) String sortBy,
                                    @RequestParam(required = false) String book) {
        Sort.Direction direction = Sort.Direction.ASC;
        if (book!= null && book.equalsIgnoreCase("desc")) {
            direction = Sort.Direction.DESC;
        }
        Sort sort = Sort.by(direction, sortBy!= null? sortBy : "_id");
        return mongoTemplate.find(Query.query(new Criteria()).with(sort), Genre.class);
    }

    @PutMapping("/api/genres/{id}")
    public Genre updateGenre(@PathVariable String id, @RequestBody Genre genre) {
        genre.setId(id);
        return mongoTemplate.save(genre);
    }

    @DeleteMapping("/api/genres/{id}")
    public void deleteGenre(@PathVariable String id) {
        Genre genre = mongoTemplate.findById(id, Genre.class);
        if (genre!= null) {
            mongoTemplate.remove(genre);
        }
    }


    //ОТЧЕТЫ//


    @GetMapping("/api/reports/book-average-price-by-author")
    public List<AveragePriceByAuthor> getBookAveragePriceByAuthor() {
        Aggregation aggregation = newAggregation(
                group("author").avg("price").as("averagePrice")
        );
        AggregationResults<AveragePriceByAuthor> result = mongoTemplate.aggregate(aggregation, Book.class, AveragePriceByAuthor.class);
        return result.getMappedResults();
    }

    @GetMapping("/api/reports/book-count-by-author")
    public List<BookCountByAuthor> getBookCountByAuthor() {
        Aggregation aggregation = newAggregation(
                group("author").count().as("bookCount")
        );
        AggregationResults<BookCountByAuthor> result = mongoTemplate.aggregate(aggregation, Book.class, BookCountByAuthor.class);
        return result.getMappedResults();
    }

    @GetMapping("/api/reports/average-price-per-genre")
    public List<AveragePricePerGenre> getAveragePricePerGenre() {
        Aggregation aggregation = newAggregation(
                group("genre").avg("price").as("averagePrice")
        );
        AggregationResults<AveragePricePerGenre> result = mongoTemplate.aggregate(aggregation, Book.class, AveragePricePerGenre.class);
        return result.getMappedResults();
    }

    @GetMapping("/api/reports/author-books")
    public List<Book> getBooksByAuthor(@RequestParam String authorName) {
        Query query = new Query(Criteria.where("author").is(authorName));
        return mongoTemplate.find(query, Book.class);
    }

    @GetMapping("/api/reports/author-genres")
    public List<String> getGenresByAuthor(@RequestParam String authorName) {
        Query authorQuery = new Query(Criteria.where("name").is(authorName));
        List<Author> authors = mongoTemplate.find(authorQuery, Author.class);
        if (authors.isEmpty()) {
            return Collections.emptyList();
        }
        List<Book> books = new ArrayList<>();
        for (Author author : authors) {
            Query bookQuery = new Query(Criteria.where("author").is(author.getName()));
            books.addAll(mongoTemplate.find(bookQuery, Book.class));
        }
        Set<String> uniqueGenres = new HashSet<>();
        for (Book book : books) {
            uniqueGenres.add(book.getGenre());
        }
        return new ArrayList<>(uniqueGenres);
    }

    @GetMapping("/api/reports/book-price-range")
    public BookPriceRange getBookPriceRange() {
        Sort sort = Sort.by(Sort.Direction.ASC, "price");
        Query query = new Query().with(sort);
        List<Book> sortedBooks = mongoTemplate.find(query, Book.class);
        if (!sortedBooks.isEmpty()) {
            double minPrice = sortedBooks.get(0).getPrice();
            double maxPrice = sortedBooks.get(sortedBooks.size() - 1).getPrice();
            return new BookPriceRange(minPrice, maxPrice);
        } else {
            throw new RuntimeException("No books found");
        }
    }
}
