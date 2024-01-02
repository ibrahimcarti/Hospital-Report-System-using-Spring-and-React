package com.hospital.reportsystem.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "patients")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "patient_id")
    Long id;

    String patientName;
    String patientSurname;
    String identityNo;
    String bloodType;
}
