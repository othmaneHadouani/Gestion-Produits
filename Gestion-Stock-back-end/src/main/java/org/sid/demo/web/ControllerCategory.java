package org.sid.demo.web;


import org.sid.demo.converters.Converter;
import org.sid.demo.documents.Category;
import org.sid.demo.documents.Product;
import org.sid.demo.forms.CategoryForm;
import org.sid.demo.forms.ProductForm;
import org.sid.demo.service.ServiceCategoryImpl;
import org.sid.demo.service.ServiceProductImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/categories")
public class ControllerCategory {

    @Autowired
    public ServiceCategoryImpl serviceCategory;

    @Autowired
    public Converter converter;

    @PostMapping("/addCategory")
    public Category addProduct(@RequestBody CategoryForm categoryForm){

        return serviceCategory.addorUpdateCategory(categoryForm);

    }

    @PutMapping("/editCategory")
    public Category editProduct(@RequestBody CategoryForm categoryForm){

        return serviceCategory.addorUpdateCategory(categoryForm);

    }


    @RequestMapping(value="/getAllCategories",method = RequestMethod.GET)
    public Page<Category> listCategories(@RequestParam(name = "size",defaultValue = "6")int size,
                                       @RequestParam(name = "page",defaultValue = "0")int page,
                                       @RequestParam(name = "motCle",defaultValue ="")String motCle ){


        Pageable pageable = PageRequest.of(page, size);
        return serviceCategory.listCategories(motCle,pageable);
    }

    @GetMapping("/getListCategories")
    public List<Category> listCategories(){
        return serviceCategory.listCategories();
    }

    @DeleteMapping("/delete/{idCategory}")
    public void removeProduct(@PathVariable("idCategory") String idCategory){

         serviceCategory.deleteCategory(idCategory);
    }



}
