package org.sid.service;

import org.sid.entities.AppRole;
import org.sid.entities.AppUser;
import org.sid.forms.UserForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AccountService {

    public AppUser saveUser(String username, String password, String confirmedPassword);
    public AppUser saveUser(UserForm userForm);
    public AppUser editUserName(String lastUserName, String newUserName);
    public AppUser editPassword(String username, String password, String confirmedPassword);
    public AppRole save(AppRole role);
    public AppUser loadUserByUsername(String username);
    public void addRoleToUser(String username, String rolename);
    public List<AppUser> getListUsers();
    public Page<AppUser> getPageUsers(String motCle, Pageable pageable);

    public List<AppRole> getListRoles();
    public Page<AppRole> getPageRoles(String motCle, Pageable pageable);

}
