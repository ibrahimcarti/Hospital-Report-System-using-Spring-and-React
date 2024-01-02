package com.hospital.reportsystem.controller;

import com.hospital.reportsystem.entities.Report;
import com.hospital.reportsystem.services.ReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/report")
public class ReportController {
    private ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping
    public List<Report> getAllReports(){
        return reportService.getAllreports();
    }

    @GetMapping("/byTechnicianId/{technicianId}")
    public List<Report> getReportsByTechnicianId(@PathVariable Long technicianId){
        return reportService.getReportsByTechnicianId(technicianId);
    }
    @GetMapping("/{reportid}")
    public Optional<Report> getReportById(@PathVariable Long reportid){
        return reportService.getReportById(reportid);
    }

    @PostMapping
    public Report createReport(@RequestBody Report newReport){
        return reportService.createReport(newReport);
    }

    @PutMapping("/{reportid}")
        public Report updateReport(@PathVariable Long reportid, @RequestBody Report updateReport){
        return reportService.updateReport(reportid,updateReport);
    }


    @DeleteMapping("/{reportid}")
    public void deleteReport(@PathVariable Long reportid ){
        reportService.deleteReport(reportid);
    }

}
