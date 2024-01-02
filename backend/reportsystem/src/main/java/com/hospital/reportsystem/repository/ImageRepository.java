package com.hospital.reportsystem.repository;

import com.hospital.reportsystem.entities.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image,Long> {
    Optional<Image> findByName(String name);
    Optional<Image> findAllByReportId(Long reportId);
    Image findByReportId(Long reportId);

}
