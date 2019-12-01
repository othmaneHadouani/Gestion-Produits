package org.sid.demo.dao;

import org.sid.demo.documents.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.repository.support.PageableExecutionUtils;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;


@Component
public class CustomProductRepositoryImpl implements CustomProductRepository {


    @Autowired
    MongoTemplate mongoTemplate;
    @Override
    public Page<Product> findProductByPage(String motCle, Pageable pageable) {

        Query query = new Query().with(pageable);
        query.addCriteria(Criteria.where("name").regex("^"+motCle));
        List<Product> filteredPatients = mongoTemplate.find(query, Product.class, "product");
        Page<Product> productPage = PageableExecutionUtils.getPage(filteredPatients, pageable, () -> mongoTemplate.count(query, Product.class));
        return productPage;
    }


}
