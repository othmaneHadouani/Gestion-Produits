package org.sid.demo.dao;

import org.sid.demo.documents.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
public interface CustomProductRepository {

    Page<Product> findProductByPage(String motCle, Pageable pageable);
}
