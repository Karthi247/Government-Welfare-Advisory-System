package com.project.welfare.service;

import org.springframework.stereotype.Service;

import com.project.welfare.Entity.SystemSetting;
import com.project.welfare.dto.AdminApplicationLimitDto;
import com.project.welfare.repository.SystemSettingRepository;

@Service
public class ApplicationPolicyService {

    private static final String KEY_LIMIT_ENABLED = "application_limit_enabled";
    private static final String KEY_LIMIT_MAX_SCHEMES = "application_limit_max_schemes";

    private static final boolean DEFAULT_LIMIT_ENABLED = false;
    private static final int DEFAULT_MAX_SCHEMES = 4;

    private final SystemSettingRepository systemSettingRepository;

    public ApplicationPolicyService(SystemSettingRepository systemSettingRepository) {
        this.systemSettingRepository = systemSettingRepository;
    }

    public AdminApplicationLimitDto getApplicationLimitSettings() {
        boolean enabled = isApplicationLimitEnabled();
        int maxSchemes = getApplicationLimitMaxSchemes();
        return new AdminApplicationLimitDto(enabled, maxSchemes);
    }

    public AdminApplicationLimitDto updateApplicationLimitEnabled(boolean enabled) {
        saveSetting(KEY_LIMIT_ENABLED, String.valueOf(enabled));
        return getApplicationLimitSettings();
    }

    public boolean isApplicationLimitEnabled() {
        String value = getSettingValue(KEY_LIMIT_ENABLED);
        if (value == null || value.isBlank()) {
            return DEFAULT_LIMIT_ENABLED;
        }
        return Boolean.parseBoolean(value);
    }

    public int getApplicationLimitMaxSchemes() {
        String value = getSettingValue(KEY_LIMIT_MAX_SCHEMES);
        if (value == null || value.isBlank()) {
            return DEFAULT_MAX_SCHEMES;
        }
        try {
            int parsed = Integer.parseInt(value);
            return parsed > 0 ? parsed : DEFAULT_MAX_SCHEMES;
        } catch (NumberFormatException ex) {
            return DEFAULT_MAX_SCHEMES;
        }
    }

    private String getSettingValue(String key) {
        return systemSettingRepository.findById(key)
                .map(SystemSetting::getSettingValue)
                .orElse(null);
    }

    private void saveSetting(String key, String value) {
        SystemSetting setting = systemSettingRepository.findById(key).orElseGet(SystemSetting::new);
        setting.setSettingKey(key);
        setting.setSettingValue(value);
        systemSettingRepository.save(setting);
    }
}
