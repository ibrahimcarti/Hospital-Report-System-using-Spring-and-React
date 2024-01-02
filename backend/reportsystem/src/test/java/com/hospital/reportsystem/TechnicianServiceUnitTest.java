package com.hospital.reportsystem;

import com.hospital.reportsystem.entities.LaboratoryTechnician;
import com.hospital.reportsystem.services.LaboratoryTechnicianService;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TechnicianServiceUnitTest {

    @Autowired
    LaboratoryTechnicianService technicianService;

    @Test
    public void testGetAllTechnician(){
        List<LaboratoryTechnician> technicians = technicianService.getAllTechnicians();
        Assertions.assertThat(technicians.size()).isGreaterThan(0);
    }
}
