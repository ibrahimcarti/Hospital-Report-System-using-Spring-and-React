package com.hospital.reportsystem.services;

import com.hospital.reportsystem.entities.LaboratoryTechnician;
import com.hospital.reportsystem.repository.LaboratoryTechnicianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class LaboratoryTechnicianService {

    @Autowired
    private final LaboratoryTechnicianRepository technicianRepository;

    private final PasswordEncoder passwordEncoder;

    public LaboratoryTechnicianService(LaboratoryTechnicianRepository technicianRepository, PasswordEncoder passwordEncoder) {
        this.technicianRepository = technicianRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<LaboratoryTechnician> getAllTechnicians() {
        return technicianRepository.findAll();
    }

    public Optional<LaboratoryTechnician> findTechnicianById(Long technicianid) {
        return technicianRepository.findById(technicianid);
    }

    public LaboratoryTechnician createTechnician(LaboratoryTechnician newTechnician) {
        if(technicianRepository.findByHospitalIdentity(newTechnician.getHospitalIdentity())!=null || newTechnician.getHospitalIdentity().length()!=7 || newTechnician.getIdentityNo().length()!=11 ){
            return null;
        }
        newTechnician.setIdentityNo(passwordEncoder.encode(newTechnician.getPassword()));
        return technicianRepository.save(newTechnician);
    }

    public LaboratoryTechnician getOneTechnicianByHospitalIdentity(String hospitalId){
        return technicianRepository.findByHospitalIdentity(hospitalId);
    }

    public LaboratoryTechnician getOneTechnicianByIdentityNo(String identityNo){
        return technicianRepository.findByIdentityNo(identityNo);
    }

    public void deleteTechnician(Long technicianid) {
        technicianRepository.deleteById(technicianid);
    }

    public LaboratoryTechnician updateTechnician(Long technicianid, LaboratoryTechnician updatetechnician) {
        Optional<LaboratoryTechnician> technician= technicianRepository.findById(technicianid);
        if (technician.isPresent()) {
            LaboratoryTechnician foundTechnician = technician.get();
            foundTechnician.setTechnicianName(updatetechnician.getTechnicianName());
            foundTechnician.setTechnicianSurname(updatetechnician.getTechnicianSurname());
            foundTechnician.setHospitalIdentity(updatetechnician.getHospitalIdentity());
            foundTechnician.setDepartment(updatetechnician.getDepartment());
            foundTechnician.setHospitalIdentity(updatetechnician.getHospitalIdentity());
            foundTechnician.setRole(updatetechnician.getRole());
            technicianRepository.save(foundTechnician);
            return foundTechnician;
        }else{
            return null;
        }
    }

    public LaboratoryTechnician getOneTechnicianByTechnicianName(String technicianName) {
        return technicianRepository.findByTechnicianName(technicianName);
    }
}
