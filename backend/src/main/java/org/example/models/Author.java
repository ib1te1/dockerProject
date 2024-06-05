package org.example.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "authors")
public class Author {
    @Id
    private String id;

    @JsonProperty("name")
    @Indexed
    private String name;

    @JsonProperty("nationality")
    @Indexed
    private String nationality;

    @JsonProperty("birthYear")
    private int birthYear;

    @JsonProperty("deathYear")
    private int deathYear;
}
