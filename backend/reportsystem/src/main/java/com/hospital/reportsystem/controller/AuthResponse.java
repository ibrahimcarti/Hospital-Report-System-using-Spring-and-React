package com.hospital.reportsystem.controller;

import lombok.Data;

@Data
public class AuthResponse {

    String message;
    String role;
    Long userId;
    String accessToken;
}
