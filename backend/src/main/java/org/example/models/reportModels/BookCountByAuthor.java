package org.example.models.reportModels;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Getter
@Setter
public class BookCountByAuthor {
        @Id
        private String authorId;
        private long bookCount;
}
