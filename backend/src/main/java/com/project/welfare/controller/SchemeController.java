package com.project.welfare.controller;

import com.project.welfare.Entity.Scheme;
import com.project.welfare.service.SchemeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schemes")
@CrossOrigin(origins = "http://localhost:5173") // React
public class SchemeController {

    private final SchemeService schemeService;

    public SchemeController(SchemeService schemeService) {
        this.schemeService = schemeService;
    }

    // ✅ GET all schemes
    @GetMapping
    public List<Scheme> getAllSchemes() {
        return schemeService.getAllSchemes();
    }

    // ✅ GET scheme by ID
    @GetMapping("/{id}")
    public Scheme getSchemeById(@PathVariable int id) {
        return schemeService.getSchemeById(id);
    }

    // ✅ POST add scheme (Admin)
    @PostMapping
    public Scheme addScheme(@RequestBody Scheme scheme) {
        return schemeService.addScheme(scheme);
    }
}
