package com.project.welfare.service;

import com.project.welfare.Entity.Scheme;
import com.project.welfare.repository.SchemeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SchemeService {

    private final SchemeRepository schemeRepository;

    public SchemeService(SchemeRepository schemeRepository) {
        this.schemeRepository = schemeRepository;
    }

    public List<Scheme> getAllSchemes() {
        return schemeRepository.findAll();
    }

    public Scheme addScheme(Scheme scheme) {
        return schemeRepository.save(scheme);
    }

    public Scheme getSchemeById(int id) {
        return schemeRepository.findById(id).orElse(null);
    }
}


