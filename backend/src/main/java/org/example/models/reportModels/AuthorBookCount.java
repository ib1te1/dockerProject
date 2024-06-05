package org.example.models.reportModels;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class AuthorBookCount {
    @Id
    private String author;
    private long bookCount;
}
