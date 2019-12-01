package org.sid.demo.converters;

import org.sid.demo.documents.Category;
import org.sid.demo.documents.Product;
import org.sid.demo.forms.CategoryForm;
import org.sid.demo.forms.ProductForm;
import org.sid.demo.service.IServiceCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


@Component
public class Converter {

    @Autowired
    IServiceCategory iServiceCategory;

    public Product productFormToProductAdd(ProductForm productForm){

        Product product = new Product();



        product.setId(productForm.getId());

        product.setName(productForm.getName());
        product.setCurrentPrice(productForm.getCurrentPrice());
        product.setDescription(productForm.getDescription());
        product.setQuantity(productForm.getQuantity());
        Category category = iServiceCategory.getCategoryById(productForm.getCategory().getId()).get();  //this.categoryFormToCategory(productForm.getCategory());
        product.setCategory(category);

        if(product.getQuantity()==0){
            product.setAvailable(false);
        }
        else {
            product.setAvailable(true);
        }



        return product;
    }

    public Category categoryFormToCategory(CategoryForm categoryForm){




        Category category = new Category();
        category.setId(categoryForm.getId());
        category.setName(categoryForm.getName());
        category.setDescription(categoryForm.getDescription());


        return category;
    }
}
