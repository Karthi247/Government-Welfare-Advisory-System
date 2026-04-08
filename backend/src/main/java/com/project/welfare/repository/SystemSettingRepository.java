package com.project.welfare.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.welfare.Entity.SystemSetting;

public interface SystemSettingRepository extends JpaRepository<SystemSetting, String> {
}
