package org.sid.demo.documents;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {


    @Id
    private String id;

    private String name;
    private String description;
    private double currentPrice;
    private boolean available;
    //private String photoName;
    private int quantity;

    @DBRef
    private Category category;
}
