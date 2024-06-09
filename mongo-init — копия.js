db.createUser(
    {
        user: "readUser",
        pwd: "1234",
        roles: [
            {
                role: "read",
                db: "libraryDB"
            }
        ]
    }
);
db.createUser(
    {
        user: "adminUser",
        pwd: "1234",
        roles: [
            {
                role: "readWrite",
                db: "libraryDB"
            },
            {
                role: "userAdmin",
                db: "libraryDB"
            }
        ]
    }
);
db.createUser(
    {
        user: "readWriteUser",
        pwd: "1234",
        roles: [
            {
                role: "readWrite",
                db: "libraryDB"
            }
        ]
    }
);
db.createCollection("authors");
db.createCollection("books");
db.createCollection("genres");
db.authors.insertMany([
    {
        "name": "Ф.М. Достоевский",
        "nationality": "русский",
        "birthYear": 1821,
        "deathYear": 1881
    },
    {
        "name": "Л.Н. Толстой",
        "nationality": "русский",
        "birthYear": 1828,
        "deathYear": 1910
    }
]);
db.books.insertMany([
    {
        "title": "Война и мир",
        "author": "Л.Н. Толстой",
        "genre": "роман",
        "price": 2000.99
    },
    {
        "title": "Преступление и наказание",
        "author": "Ф.М. Достоевский",
        "genre": "драма",
        "price": 800
    }
]);
db.genres.insertMany([
    {
        "name": "драма",
        "description": "Жанр, отражающий конфликты между персонажами."
    },
    {
        "name": "роман",
        "description": "Романы обычно содержат подробное описание жизни и чувств персонажей."
    },
    {
        "name": "хоррор",
        "description": "жанр художественной литературы, имеющий целью вызвать у читателя чувство страха."
    }
]);

