package com.hospital.reportsystem.controller;

import com.hospital.reportsystem.entities.LaboratoryTechnician;
import com.hospital.reportsystem.services.LaboratoryTechnicianService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/technician")
public class LaboratoryTechnicianController {
    private LaboratoryTechnicianService technicianService;

    public LaboratoryTechnicianController(LaboratoryTechnicianService technicianService) {
        this.technicianService = technicianService;
    }

    @GetMapping
    public List<LaboratoryTechnician> getAllTechnicians(){
        return technicianService.getAllTechnicians();
    }

    @GetMapping("/{technicianid}")
    public Optional<LaboratoryTechnician> findTechnicianById(@PathVariable Long technicianid){
        return technicianService.findTechnicianById(technicianid);
    }

    @PostMapping
    public LaboratoryTechnician createTechnician(@RequestBody RegisterRequest registerRequest){
        LaboratoryTechnician technician = new LaboratoryTechnician();
        technician.setTechnicianName(registerRequest.getTechnicianName());
        technician.setTechnicianSurname(registerRequest.getTechnicianSurname());
        technician.setDepartment(registerRequest.getDepartment());
        technician.setRole(registerRequest.getRole());
        technician.setRIdNo(registerRequest.getPassword());
        technician.setHospitalIdentity(registerRequest.getUserName());
        technician.setIdentityNo(registerRequest.getPassword());
        return technicianService.createTechnician(technician);
    }

    @PutMapping("/{technicianid}")
    public LaboratoryTechnician updateTechnician(@PathVariable Long technicianid, @RequestBody LaboratoryTechnician updatetechnician){
        return technicianService.updateTechnician(technicianid,updatetechnician);
    }

    @DeleteMapping("/{technicianid}")
    public void deleteTechnician(@PathVariable Long technicianid){
        technicianService.deleteTechnician(technicianid);
    }
}
