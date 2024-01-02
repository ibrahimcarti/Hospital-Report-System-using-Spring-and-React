package com.hospital.reportsystem.controller;

import com.hospital.reportsystem.auth.JwtTokenProvider;
import com.hospital.reportsystem.entities.LaboratoryTechnician;
import com.hospital.reportsystem.services.LaboratoryTechnicianService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final JwtTokenProvider jwtTokenProvider;

    private final LaboratoryTechnicianService technicianService;

    private final PasswordEncoder passwordEncoder;


    public AuthController(AuthenticationManager authenticationManager, LaboratoryTechnicianService technicianService,
                          PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.authenticationManager = authenticationManager;
        this.technicianService = technicianService;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest loginRequest) {
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(loginRequest.getUserName(), loginRequest.getPassword());
        Authentication auth = authenticationManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(auth);
        String jwtToken = jwtTokenProvider.generateJwtToken(auth);
        LaboratoryTechnician technician = technicianService.getOneTechnicianByHospitalIdentity(loginRequest.getUserName());
        AuthResponse authResponse = new AuthResponse();
        authResponse.setAccessToken("Bearer " + jwtToken);
        authResponse.setUserId(technician.getId());
        authResponse.setRole(String.valueOf(technician.getRole()));
        authResponse.setMessage(String.valueOf(HttpStatus.OK));
        return authResponse;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest registerRequest) {
        AuthResponse authResponse = new AuthResponse();
        if(technicianService.getOneTechnicianByHospitalIdentity(registerRequest.getUserName()) != null) {
            authResponse.setMessage("Username already in use.");
            return new ResponseEntity<>(authResponse, HttpStatus.BAD_REQUEST);
        }

        LaboratoryTechnician technician = new LaboratoryTechnician();
        technician.setTechnicianName(registerRequest.getTechnicianName());
        technician.setTechnicianSurname(registerRequest.getTechnicianSurname());
        technician.setRole(registerRequest.getRole());
        technician.setDepartment(registerRequest.getDepartment());
        technician.setHospitalIdentity(registerRequest.getUserName());
        technician.setIdentityNo(registerRequest.getPassword());
        technician.setRIdNo(registerRequest.getRIdNo());
        technicianService.createTechnician(technician);

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(registerRequest.getUserName(), registerRequest.getPassword());
        Authentication auth = authenticationManager.authenticate(authToken);
        SecurityContextHolder.getContext().setAuthentication(auth);
        String jwtToken = jwtTokenProvider.generateJwtToken(auth);

        authResponse.setMessage("User successfully registered.");
        authResponse.setAccessToken("Bearer " + jwtToken);
        authResponse.setUserId(technician.getId());
        authResponse.setRole(String.valueOf(technician.getRole()));
        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }
}
