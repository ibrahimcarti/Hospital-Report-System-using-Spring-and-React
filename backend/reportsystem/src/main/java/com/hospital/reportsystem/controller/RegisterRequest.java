package com.hospital.reportsystem.controller;

import com.hospital.reportsystem.entities.Role;
import lombok.Data;

@Data
public class RegisterRequest {

    Long id;
    String technicianName;
    String technicianSurname;
    String department;
    Role role;
    String userName;
    String password;
    String rIdNo;

}