package com.hospital.reportsystem;

import com.hospital.reportsystem.entities.Patient;
import com.hospital.reportsystem.services.PatientService;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PatientServiceUnitTest {

    @Autowired
    PatientService patientService;

    @Test
    public void testGetAllPatients(){
        List<Patient> patients = patientService.getAllPatiens();
        Assertions.assertThat(patients.size()).isGreaterThan(0);
    }
}
