package com.project.welfare.dto;

public class WelfareResponseDto {

    private double eligibility_score;
    private String eligibility_status;

    public WelfareResponseDto(double eligibility_score, String eligibility_status) {
        this.eligibility_score = eligibility_score;
        this.eligibility_status = eligibility_status;
    }

    public double getEligibility_score() {
        return eligibility_score;
    }
    public void setEligibility_score(double eligibility_score) {
        this.eligibility_score = eligibility_score;
    }

    public String getEligibility_status() {
        return eligibility_status;
    }
    public void setEligibility_status(String eligibility_status) {
        this.eligibility_status = eligibility_status;
    }
}
