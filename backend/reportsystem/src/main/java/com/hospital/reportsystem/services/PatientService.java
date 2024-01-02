package com.hospital.reportsystem.services;

import com.hospital.reportsystem.entities.Patient;
import com.hospital.reportsystem.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {
    private PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public List<Patient> getAllPatiens(){
        return patientRepository.findAll();
    }

    public Optional<Patient> getPatientById(Long patientid){
        return patientRepository.findById(patientid);
    }

    public Patient createPatient(Patient newPatient) {
        Optional<Patient> patient = patientRepository.findByIdentityNo(newPatient.getIdentityNo());
        if(patient.isPresent()){
            return null;
        }
        return patientRepository.save(newPatient);
    }

    public Patient updatePatient(Long patientid, Patient updatedPatient){
        Optional<Patient> patient = patientRepository.findById(patientid);
        if (patient.isPresent()) {
            Patient foundPatient = patient.get();
            foundPatient.setPatientName(updatedPatient.getPatientName());
            foundPatient.setPatientSurname(updatedPatient.getPatientSurname());
            foundPatient.setBloodType(updatedPatient.getBloodType());
            patientRepository.save(foundPatient);
            return foundPatient;
        } else {
            return null;
        }
    }

    public void deletePatient(Long patientid) {
        patientRepository.deleteById(patientid);
    }

    public Optional<Patient> getPatientByIdentityNo(String identityNo) {
       return patientRepository.findByIdentityNo(identityNo);
    }
}
