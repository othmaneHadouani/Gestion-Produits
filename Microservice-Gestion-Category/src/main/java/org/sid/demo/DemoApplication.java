package org.sid.demo;

import com.mongodb.connection.Stream;
import org.sid.demo.dao.CategoryRepository;
import org.sid.demo.dao.ProductRepository;
import org.sid.demo.documents.Category;
import org.sid.demo.documents.Product;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }


    @Bean
    CommandLineRunner commandLineRunner(CategoryRepository categoryRepository , ProductRepository productRepository){
        return strings ->{

            categoryRepository.deleteAll();

            Category c1 = new Category("A","Samsung","good",new ArrayList<Product>());
            Category c2 = new Category("B","iphone","good",new ArrayList<Product>());

            categoryRepository.save(c1);
            categoryRepository.save(c2);


            productRepository.deleteAll();

            Product p1 = new Product("P1","iphoneX","good Product",50000,true,50,c1);
            Product p2 = new Product("P2","S8","good Product",7000,true,40,c1);
            Product p3 = new Product("P3","S6","good Product",3300,true,30,c1);
            Product p5 = new Product("P4","iphone 6","good Product",8700,true,90,c1);
            Product p6 = new Product("P5","iphone 6","good Product",8700,true,90,c2);
            Product p7 = new Product("P6","iphone 6","good Product",8700,true,90,c2);
            Product p8 = new Product("P7","iphone 6","good Product",8700,true,90,c2);
            Product p9 = new Product("P8","iphone 6","good Product",8700,true,90,c2);
            Product p10 = new Product("P9","iphone 6","good Product",8700,true,90,c2);
            Product p4 = new Product("P10","iphone 6","good Product",8700,true,90,c1);

            productRepository.save(p1);
            productRepository.save(p2);
            productRepository.save(p3);
            productRepository.save(p5);
            productRepository.save(p6);
            productRepository.save(p7);
            productRepository.save(p8);
            productRepository.save(p9);
            productRepository.save(p10);


            c1.getProducts().add(p2);
            c1.getProducts().add(p3);
            c1.getProducts().add(p4);
            c1.getProducts().add(p5);
            c1.getProducts().add(p1);
            c2.getProducts().add(p6);
            c2.getProducts().add(p7);
            c2.getProducts().add(p8);
            c2.getProducts().add(p9);
            c2.getProducts().add(p10);

            categoryRepository.save(c1);
            categoryRepository.save(c2);


        };
    }

}
