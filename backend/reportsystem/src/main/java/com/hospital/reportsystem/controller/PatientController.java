package com.hospital.reportsystem.controller;

import com.hospital.reportsystem.entities.Patient;
import com.hospital.reportsystem.services.PatientService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/patient")
public class PatientController {

    private PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping
    public List<Patient> getAllPatients(){
        return patientService.getAllPatiens();
    }

    @GetMapping("/{patientid}")
    public Optional<Patient> getPatientById(@PathVariable Long patientid){
        return patientService.getPatientById(patientid);
    }

    @GetMapping("/identity/{identityNo}")
    public Optional<Patient> getPatientByIdentityNo(@PathVariable String identityNo){
        return patientService.getPatientByIdentityNo(identityNo);
    }

    @PostMapping
    public Patient createPatient(@RequestBody Patient newPatient){
        return patientService.createPatient(newPatient);
    }

    @PutMapping("/{patientid}")
    public Patient updatePatient(@PathVariable Long patientid, @RequestBody Patient updatePatient){
        return patientService.updatePatient(patientid,updatePatient);
    }

    @DeleteMapping("/{patientid}")
    public void deletePatient(@PathVariable Long patientid){
        patientService.deletePatient(patientid);
    }
}
