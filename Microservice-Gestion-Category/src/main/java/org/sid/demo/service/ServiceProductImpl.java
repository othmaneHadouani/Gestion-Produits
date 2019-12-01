package org.sid.demo.service;

import org.sid.demo.converters.Converter;
import org.sid.demo.dao.CustomProductRepository;
import org.sid.demo.dao.ProductRepository;
import org.sid.demo.documents.Product;
import org.sid.demo.forms.ProductForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ServiceProductImpl implements IServiceProduct {


    @Autowired
    Converter converter;

    @Autowired
    public ProductRepository productRepository;


    @Override
    public Product addorUpdateProduct(ProductForm productForm) {


            Product product = converter.productFormToProductAdd(productForm);
            product = productRepository.save(product);
            return product;


    }

    @Override
    public void deleteProduct(String idProduct) {

        productRepository.deleteById(idProduct);
    }

    @Override
    public void deleteProduct(Product product) {

        productRepository.delete(product);
    }

    @Override
    public Page<Product> listProducts(String motCle,Pageable pageable) {
       return this.productRepository.findAll(motCle,pageable);
    }


    @Override
    public List<Product> getDisponibleProducts() {
        return productRepository.findAll();
    }

    @Override
    public Page<Product> listProductsByCat(String idCat, String motCle, Pageable pageable) {
        return this.productRepository.findAllByCategory_Id(idCat,motCle,pageable);
    }
}
