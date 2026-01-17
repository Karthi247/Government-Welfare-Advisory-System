package com.project.welfare.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "schemes")
public class Scheme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String scheme_name;
    private int min_age;
    private double max_income;
    private String category;
    private String occupation;
    private String disability_required;
    private String minority_required;
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getScheme_name() {
        return scheme_name;
    }
    public void setScheme_name(String scheme_name) {
        this.scheme_name = scheme_name;
    }
    public int getMin_age() {
        return min_age;
    }
    public void setMin_age(int min_age) {
        this.min_age = min_age;
    }
    public double getMax_income() {
        return max_income;
    }
    public void setMax_income(double max_income) {
        this.max_income = max_income;
    }
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    public String getOccupation() {
        return occupation;
    }
    public void setOccupation(String occupation) {
        this.occupation = occupation;
    }
    public String getDisability_required() {
        return disability_required;
    }
    public void setDisability_required(String disability_required) {
        this.disability_required = disability_required;
    }
    public String getMinority_required() {
        return minority_required;
    }
    public void setMinority_required(String minority_required) {
        this.minority_required = minority_required;
    }

}
