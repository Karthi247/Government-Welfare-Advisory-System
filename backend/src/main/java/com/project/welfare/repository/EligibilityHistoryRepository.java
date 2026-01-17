package com.project.welfare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.welfare.Entity.EligibilityHistory;

@Repository
public interface EligibilityHistoryRepository
        extends JpaRepository<EligibilityHistory, Integer> {

}
