package org.sid.service;

import org.sid.converters.Converter;
import org.sid.dao.AppRoleRepository;
import org.sid.dao.AppUserRepository;
import org.sid.entities.AppRole;
import org.sid.entities.AppUser;
import org.sid.forms.UserForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.stream.Stream;

@Service
@Transactional
public class AccountServiceImpl implements AccountService {


    @Autowired
    private Converter converter;

    private AppUserRepository appUserRepository;
    private AppRoleRepository appRoleRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;



    private RestTemplate restTemplate= new RestTemplate();

    public AccountServiceImpl(AppUserRepository appUserRepository, AppRoleRepository appRoleRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.appUserRepository = appUserRepository;
        this.appRoleRepository = appRoleRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public AppUser saveUser(String username, String password, String confirmedPassword) {
        return null;
    }

    @Override
    public AppUser saveUser(UserForm userForm) {
        AppUser  user=appUserRepository.findByUsername(userForm.getUsername());
        if(user!=null) throw new RuntimeException("User already exists");
        if(!userForm.getPassword().equals(userForm.getConfirmedPassword())) throw new RuntimeException("Please confirm your password");
        AppUser appUser=new AppUser();
        appUser.setUsername(userForm.getUsername());
        appUser.setActived(true);
        appUser.setActived(userForm.isActived());
        appUser.setPassword(bCryptPasswordEncoder.encode(userForm.getPassword()));
        appUserRepository.save(appUser);

        if(userForm.getRoles()!=null){
            Stream<AppRole> streamUsers = userForm.getRoles().stream();

            streamUsers.forEach(role->{

                addRoleToUser(userForm.getUsername(),role.getRoleName());

            });
        }
        else {
            addRoleToUser(userForm.getUsername(),"USER");
        }

        return appUser;
    }

    @Override
    public AppUser editUserName(String lastUserName, String newUserName) {


        AppUser  user=appUserRepository.findByUsername(newUserName);
        if(user!=null) throw new RuntimeException("User already exists");

        AppUser appUser=appUserRepository.findByUsername(lastUserName);
        appUser.setUsername(newUserName);
        appUserRepository.save(appUser);

        return appUser;
    }

    @Override
    public AppUser editPassword(String username, String password, String confirmedPassword) {

        if(!password.equals(confirmedPassword)) throw new RuntimeException("Please confirm your password");
        AppUser appUser=appUserRepository.findByUsername(username);
        appUser.setPassword(bCryptPasswordEncoder.encode(password));
        appUserRepository.save(appUser);
        return appUser;
    }

    @Override
    public AppRole save(AppRole role) {
        return appRoleRepository.save(role);
    }

    @Override
    public AppUser loadUserByUsername(String username) {
        return appUserRepository.findByUsername(username);
    }

    @Override
    public void addRoleToUser(String username, String rolename) {
        AppUser appUser=appUserRepository.findByUsername(username);
        AppRole appRole=appRoleRepository.findByRoleName(rolename);
        appUser.getRoles().add(appRole);
    }

    @Override
    public List<AppUser> getListUsers() {
        return appUserRepository.findAll();
    }

    @Override
    public Page<AppUser> getPageUsers(String motCle, Pageable pageable) {
        return appUserRepository.findAll("%"+motCle+"%",pageable);
    }

    @Override
    public List<AppRole> getListRoles() {
        return appRoleRepository.findAll();
    }

    @Override
    public Page<AppRole> getPageRoles(String motCle, Pageable pageable) {

        return appRoleRepository.findAll("%"+motCle+"%",pageable);
    }
}
