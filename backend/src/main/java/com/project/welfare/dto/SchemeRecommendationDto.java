package com.project.welfare.dto;

public class SchemeRecommendationDto {

    private String scheme_name;
    private String reason;

    public SchemeRecommendationDto(String scheme_name, String reason) {
        this.scheme_name = scheme_name;
        this.reason = reason;
    }

    public String getScheme_name() {
        return scheme_name;
    }

    public void setScheme_name(String scheme_name) {
        this.scheme_name = scheme_name;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
