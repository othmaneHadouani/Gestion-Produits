package org.sid.forms;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.sid.entities.AppRole;

import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserForm{

    private String username;
    private String password;
    private String confirmedPassword;
    private boolean actived;
    private ArrayList<AppRole> roles;

    public UserForm(String username, String password, String confirmedPassword){

        this.username=username;
        this.password=password;
        this.confirmedPassword=confirmedPassword;
    }

}
