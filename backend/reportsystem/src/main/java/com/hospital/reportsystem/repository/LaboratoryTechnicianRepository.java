package com.hospital.reportsystem.repository;

import com.hospital.reportsystem.entities.LaboratoryTechnician;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LaboratoryTechnicianRepository extends JpaRepository<LaboratoryTechnician,Long> {

    LaboratoryTechnician findByTechnicianName(String technicianName);
    LaboratoryTechnician findByHospitalIdentity(String hospitalId);

    LaboratoryTechnician findByIdentityNo(String identityNo);
}
