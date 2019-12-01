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
@RequestMapping("/roles")
public class RoleController {
    @Autowired
    private AccountService accountService;


    @GetMapping("/getListRoles")
    public List<AppRole> getAllPoles(){
        return  accountService.getListRoles();
    }

    @RequestMapping(value="/getAllRoles",method = RequestMethod.GET)
    public Page<AppRole> listRoles(@RequestParam(name = "size",defaultValue = "6")int size,
                                   @RequestParam(name = "page",defaultValue = "0")int page,
                                   @RequestParam(name = "motCle",defaultValue ="")String motCle ){

        Pageable pageable = new PageRequest(page, size);
        return accountService.getPageRoles(motCle,pageable);
    }
}

