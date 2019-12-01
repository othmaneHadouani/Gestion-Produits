package org.sid.converters;


import org.sid.entities.AppUser;
import org.sid.forms.UserForm;
import org.springframework.stereotype.Component;

@Component
public class Converter {

    public AppUser userFormToAppUserAdd(UserForm userForm){

        AppUser appUser = new AppUser();

        appUser.setUsername(userForm.getUsername());
        appUser.setPassword(userForm.getPassword());
        return appUser;
    }
}
