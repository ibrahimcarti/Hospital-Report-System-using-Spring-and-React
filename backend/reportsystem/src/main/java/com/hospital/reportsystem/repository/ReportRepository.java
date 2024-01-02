package com.hospital.reportsystem.repository;

import com.hospital.reportsystem.controller.PostResponse;
import com.hospital.reportsystem.entities.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report,Long> {
    List<Report> findAllByTechnicianId(Long technicianid);
}
