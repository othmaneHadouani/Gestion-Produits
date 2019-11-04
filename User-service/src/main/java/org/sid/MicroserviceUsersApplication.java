package org.sid;

import org.sid.entities.AppRole;
import org.sid.forms.UserForm;
import org.sid.service.AccountService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;


@SpringBootApplication
public class MicroserviceUsersApplication {

    public static void main(String[] args) {
        SpringApplication.run(MicroserviceUsersApplication.class, args);
    }
    @Bean
    CommandLineRunner start(AccountService accountService){
        return args->{
            accountService.save(new AppRole("USER"));
            accountService.save(new AppRole("ADMIN"));

            Stream.of("user1","user2","user3","admin").forEach(un->{
                accountService.saveUser(new UserForm(un,"1234","1234"));
            });
            accountService.addRoleToUser("admin","ADMIN");


            ArrayList<AppRole> appRoles = new ArrayList<AppRole>();

            appRoles.add(new AppRole("ADMIN"));
            appRoles.add(new AppRole("USER"));

            accountService.saveUser(new UserForm("Souad","soso","soso",false,appRoles));


        };
    }
    @Bean
    BCryptPasswordEncoder getBCPE(){
        return new BCryptPasswordEncoder();
    }
}
