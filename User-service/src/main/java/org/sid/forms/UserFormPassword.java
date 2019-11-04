package org.sid.forms;

import lombok.Data;

@Data
public class UserFormPassword{

    private String username;
    private String password;
    private String confirmedPassword;

}
