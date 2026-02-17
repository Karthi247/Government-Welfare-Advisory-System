package com.project.welfare.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "schemes")
public class Scheme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "scheme_name")
    private String schemeName;

    @Column(name = "min_age")
    private int minAge;

    @Column(name = "max_age")
    private Integer maxAge;

    @Column(name = "max_income")
    private double maxIncome;

    private String category;

    private String gender;

    private String location;

    private String occupation;

    private String description;

    @OneToOne(mappedBy = "scheme", cascade = CascadeType.ALL)
    private SchemeDetails schemeDetails;

    public SchemeDetails getSchemeDetails() {
        return schemeDetails;
    }
    public void setSchemeDetails(SchemeDetails schemeDetails) {
        this.schemeDetails = schemeDetails;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    @Column(name = "disability_required")
    private String disabilityRequired;

    @Column(name = "minority_required")
    private String minorityRequired;

    // ✅ Getters & Setters
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getSchemeName() {
        return schemeName;
    }
    public void setSchemeName(String schemeName) {
        this.schemeName = schemeName;
    }

    public int getMinAge() {
        return minAge;
    }
    public void setMinAge(int minAge) {
        this.minAge = minAge;
    }

    public Integer getMaxAge() {
        return maxAge;
    }
    public void setMaxAge(Integer maxAge) {
        this.maxAge = maxAge;
    }

    public double getMaxIncome() {
        return maxIncome;
    }
    public void setMaxIncome(double maxIncome) {
        this.maxIncome = maxIncome;
    }

    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }

    public String getGender() {
        return gender;
    }
    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }

    public String getOccupation() {
        return occupation;
    }
    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }

    public String getDisabilityRequired() {
        return disabilityRequired;
    }
    public void setDisabilityRequired(String disabilityRequired) {
        this.disabilityRequired = disabilityRequired;
    }

    public String getMinorityRequired() {
        return minorityRequired;
    }
    public void setMinorityRequired(String minorityRequired) {
        this.minorityRequired = minorityRequired;
    }
}
