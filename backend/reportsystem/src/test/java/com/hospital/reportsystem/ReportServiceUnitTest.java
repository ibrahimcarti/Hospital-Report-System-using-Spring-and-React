package com.hospital.reportsystem;

import com.hospital.reportsystem.entities.Report;
import com.hospital.reportsystem.services.ReportService;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ReportServiceUnitTest {

    @Autowired
    ReportService reportService;

    @Test
    public  void testGetListAllReports(){
        List<Report> reports = reportService.getAllreports();
        Assertions.assertThat(reports.size()).isGreaterThan(0);
    }
}
