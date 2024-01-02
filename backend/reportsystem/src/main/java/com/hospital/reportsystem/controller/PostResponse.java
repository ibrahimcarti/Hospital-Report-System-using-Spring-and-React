package com.hospital.reportsystem.controller;

import com.hospital.reportsystem.entities.Report;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
public class PostResponse {
    Long id;

    String reportTitle;
    String reportDescription;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDate reportGivenDate;

    Long technicianId;
    Long patientId;

    public PostResponse(Report report) {
        this.id = report.getId();
        this.reportTitle = report.getReportTitle();
        this.reportDescription = report.getReportDescription();
        this.reportGivenDate = report.getReportGivenDate();
        this.technicianId = report.getTechnicianId();
        this.patientId = report.getPatientId();
    }
}
