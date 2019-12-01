package org.sid.web;
import org.sid.entities.AppRole;
import org.sid.entities.AppUser;
import org.sid.forms.UserForm;
import org.sid.forms.UserFormPassword;
import org.sid.forms.UserFormUsername;
import org.sid.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private AccountService accountService;


    @PostMapping("/register")
    public AppUser register(@RequestBody UserForm userForm){
        return  accountService.saveUser(userForm);
    }

    @PostMapping("/editUserName")
    public AppUser editUserName(@RequestBody UserFormUsername userFormUsername){

        return accountService.editUserName(userFormUsername.getLastUserName(),userFormUsername.getNewUserName());
    }

    @PostMapping("/editPassword")
    public AppUser editPassword(@RequestBody UserFormPassword userFormPassword){

        return accountService.editPassword(userFormPassword.getUsername(),userFormPassword.getPassword(),userFormPassword.getConfirmedPassword());
    }

    @GetMapping("/getListUsers")
    public List<AppUser> getAllUsers(){
        return  accountService.getListUsers();
    }

    @RequestMapping(value="/getAllUsers",method = RequestMethod.GET)
    public Page<AppUser> listusers(@RequestParam(name = "size",defaultValue = "6")int size,
                                         @RequestParam(name = "page",defaultValue = "0")int page,
                                         @RequestParam(name = "motCle",defaultValue ="")String motCle ){


        Pageable pageable = new PageRequest(page, size);
        return accountService.getPageUsers(motCle,pageable);
    }


}

