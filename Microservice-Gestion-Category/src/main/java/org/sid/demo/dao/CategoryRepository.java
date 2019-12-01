package org.sid.demo.dao;


import org.sid.demo.documents.Category;
import org.sid.demo.documents.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource
public interface CategoryRepository extends MongoRepository<Category,String> {

    @Query("{'name' : {$regex:?0, $options: i}}")
    Page<Category> findAll(String motCle, Pageable pageable);
}
