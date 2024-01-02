package com.hospital.reportsystem.services;

import com.hospital.reportsystem.entities.Image;
import com.hospital.reportsystem.repository.ImageRepository;
import com.hospital.reportsystem.repository.PatientRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;


@Service
public class ImageService {


    @Autowired
    private final ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public Image changeImage(MultipartFile file, Long reportId) throws IOException {
        delete(reportId);
        Image image = new Image();
        imageRepository.save(Image.builder()
                .name(file.getOriginalFilename())
                .reportId(reportId)
                .type(file.getContentType())
                .imageData(ImageUtil.compressImage(file.getBytes())).build());
        return image;
    }

    public void delete(Long reportId){
        imageRepository.delete(imageRepository.findByReportId(reportId));
    }
    public Image uploadImage(MultipartFile file,Long reportId) throws IOException {
        Image image = new Image();
        image.setReportId(reportId);
        image.setType(file.getContentType());
        image.setName(file.getOriginalFilename());
        image.setImageData(file.getBytes());
        imageRepository.save(Image.builder()
                .name(file.getOriginalFilename())
                .reportId(reportId)
                .type(file.getContentType())
                .imageData(ImageUtil.compressImage(file.getBytes())).build());

        return image;

    }


    @Transactional
    public byte[] getImageByReportId(Long reportId) {
        Image dbImage = imageRepository.findByReportId(reportId);
        byte[] image = ImageUtil.decompressImage(dbImage.getImageData());
        return image;
    }
}
