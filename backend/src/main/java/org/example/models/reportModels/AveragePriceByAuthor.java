package org.example.models.reportModels;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Getter
@Setter
public class AveragePriceByAuthor {
    @Id
    private String authorId;
    private double averagePrice;
}
