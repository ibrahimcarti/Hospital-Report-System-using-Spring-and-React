package com.hospital.reportsystem.services;

import com.hospital.reportsystem.entities.Report;
import com.hospital.reportsystem.repository.PatientRepository;
import com.hospital.reportsystem.repository.ReportRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ReportService {

    private final ReportRepository reportRepository;


    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;

    }

    public List<Report> getAllreports() {
        return reportRepository.findAll();
    }

    public Optional<Report> getReportById(Long reportid) {
        return reportRepository.findById(reportid);
    }

    public List<Report> getReportsByTechnicianId(Long technicianId) {
        return reportRepository.findAllByTechnicianId(technicianId);
    }

    public Report createReport(Report newPostRequest) {
        if ((long) reportRepository.findAllByTechnicianId(newPostRequest.getTechnicianId()).size() < 5) {
            return reportRepository.save(newPostRequest);
        }
        else
            return null;
    }



    public void deleteReport(Long reportid) {
        reportRepository.deleteById(reportid);
    }

    public Report updateReport(Long reportid, Report updateReport) {
        Optional<Report> report = reportRepository.findById(reportid);
        if (report.isPresent()) {
            Report foundReport = report.get();
            foundReport.setReportTitle(updateReport.getReportTitle());
            foundReport.setReportDescription(updateReport.getReportDescription());
            foundReport.setReportGivenDate(updateReport.getReportGivenDate());
            foundReport.setPatientId(updateReport.getPatientId());
            foundReport.setTechnicianId(updateReport.getTechnicianId());
            reportRepository.save(foundReport);
            return foundReport;
        } else {
            return null;
        }
    }
}











