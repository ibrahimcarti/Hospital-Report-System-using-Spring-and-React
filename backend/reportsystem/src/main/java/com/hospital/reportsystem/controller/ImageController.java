package com.hospital.reportsystem.controller;

import com.hospital.reportsystem.entities.Image;
import com.hospital.reportsystem.repository.ImageRepository;
import com.hospital.reportsystem.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/image")
public class ImageController {


    private ImageService imageDataService;

    public ImageController(ImageService imageDataService) {
        this.imageDataService = imageDataService;
    }

    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> handleImageUpload(@RequestParam("image") MultipartFile file, @RequestParam("reportId") Long reportId) throws IOException {
        Image response = imageDataService.uploadImage(file,reportId);

        return ResponseEntity.status(HttpStatus.OK)
                .body(response);
    }
    @PutMapping("/putImage/{reportId}")
    public ResponseEntity<?> handleImageChange(@RequestParam("image") MultipartFile file, @RequestParam("reportId") Long reportId) throws IOException {
        Image response =imageDataService.changeImage(file, reportId);
        byte[] image = imageDataService.getImageByReportId(response.getReportId());
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(image);
    }


    @GetMapping("/reportimage/{reportId}")
    public ResponseEntity<?>  getImageByReportId(@PathVariable("reportId") Long reportId){
        byte[] image = imageDataService.getImageByReportId(reportId);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(image);
    }




}
