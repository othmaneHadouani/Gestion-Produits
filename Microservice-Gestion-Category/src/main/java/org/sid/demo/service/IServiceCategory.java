package org.sid.demo.service;

import org.sid.demo.documents.Category;
import org.sid.demo.forms.CategoryForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface IServiceCategory {

    public Category addorUpdateCategory(CategoryForm categoryForm);
    public void deleteCategory(String idCategory);
    public void deleteCategory(Category category);
    public Page<Category> listCategories(String motCle, Pageable pageable);
    public List<Category> listCategories();
    public Optional<Category> getCategoryById(String id);
}
