package com.project.welfare.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.welfare.Entity.Scheme;

@Repository
public interface SchemeRepository extends JpaRepository<Scheme, Integer> {
    List<Scheme> findTop2ByOrderByIdDesc();
}
