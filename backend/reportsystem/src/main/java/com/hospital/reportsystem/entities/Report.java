package com.hospital.reportsystem.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDate;

@Entity
@Table(name = "reports")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    String reportTitle;

    @Column(name ="report_description", length = 500,columnDefinition = "LONGTEXT")
    String reportDescription;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDate reportGivenDate;

    @Column(name = "patient_id", nullable = false)
    Long patientId;
    @Column(name = "technician_id",nullable = false)
    Long technicianId;


//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name="patient_id",nullable = false ,insertable = false,updatable = false)
//    @OnDelete(action = OnDeleteAction.CASCADE)
//    Patient patient;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name="technician_id",nullable = false,insertable = false,updatable = false)
//    @OnDelete(action = OnDeleteAction.CASCADE)
//    LaboratoryTechnician technician;

}
