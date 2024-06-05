package org.example.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "books")
public class Book {
    @Id
    private String id;

    @JsonProperty("title")
    @Indexed
    private String title;

    @JsonProperty("author")
    @Indexed
    private String author;

    @JsonProperty("genre")
    @Indexed
    private String genre;

    @JsonProperty("price")
    @Indexed
    @Field(value = "price")
    private double price;

}
