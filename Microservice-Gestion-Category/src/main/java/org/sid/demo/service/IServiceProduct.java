package org.sid.demo.service;

import org.sid.demo.documents.Product;
import org.sid.demo.forms.ProductForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IServiceProduct {

    public Product addorUpdateProduct(ProductForm productForm);
    public void deleteProduct(String idProduct);
    public void deleteProduct(Product product);
    public Page<Product> listProducts(String motCle, Pageable pageable);
    public List<Product> getDisponibleProducts();

    Page<Product> listProductsByCat(String idCat, String motCle, Pageable pageable);
}
