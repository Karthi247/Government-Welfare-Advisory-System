package com.project.welfare.dto;

public class AdminApplicationLimitDto {

    private boolean enabled;
    private int maxSchemes;

    public AdminApplicationLimitDto() {
    }

    public AdminApplicationLimitDto(boolean enabled, int maxSchemes) {
        this.enabled = enabled;
        this.maxSchemes = maxSchemes;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public int getMaxSchemes() {
        return maxSchemes;
    }

    public void setMaxSchemes(int maxSchemes) {
        this.maxSchemes = maxSchemes;
    }
}
