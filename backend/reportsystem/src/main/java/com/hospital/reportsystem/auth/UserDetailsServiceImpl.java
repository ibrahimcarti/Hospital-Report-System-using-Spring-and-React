package com.hospital.reportsystem.auth;

import com.hospital.reportsystem.entities.LaboratoryTechnician;
import com.hospital.reportsystem.repository.LaboratoryTechnicianRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final LaboratoryTechnicianRepository technicianRepository;

    public UserDetailsServiceImpl(LaboratoryTechnicianRepository technicianRepository) {
        this.technicianRepository = technicianRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        LaboratoryTechnician technician = technicianRepository.findByHospitalIdentity(username);
        return JwtUserDetails.create(technician);
    }

    public UserDetails loadUserById(Long id) {
        LaboratoryTechnician technician = technicianRepository.findById(id).get();
        return JwtUserDetails.create(technician);
    }

}
