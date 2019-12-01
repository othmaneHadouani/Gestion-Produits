package org.sid.demo.dao;

import org.sid.demo.documents.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.support.PageableExecutionUtils;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;



import java.util.List;


@RepositoryRestResource

public interface ProductRepository extends MongoRepository<Product,String>,CustomProductRepository {


    @Query("{'name' : {$regex:?0, $options: i}}")
    Page<Product> findAll(String motCle, Pageable pageable);

    @Query("{'name' : {$regex:?1, $options: i},'category.id' : ?0 }")
    Page<Product> findAllByCategory_Id(String idCat, String motCle, Pageable pageable);
}
