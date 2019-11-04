package org.sid.demo.forms;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProductForm {

    private String id;
    private String name;
    private String description;
    private double currentPrice;
   // private String photoName;
    private int quantity;
    private CategoryForm category;


}
