package com.hospital.reportsystem.repository;

import com.hospital.reportsystem.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient,Long>{

    Optional<Patient> findByIdentityNo(String identityNo);

}
