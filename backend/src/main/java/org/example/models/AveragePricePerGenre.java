package org.example.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "average_price_per_genre")
public class AveragePricePerGenre {
    @Id
    private String id;
    private String genre;
    private Double averagePrice;
}
