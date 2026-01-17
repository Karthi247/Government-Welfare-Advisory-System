package com.project.welfare.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.welfare.Entity.Scheme;
import com.project.welfare.dto.SchemeRecommendationDto;
import com.project.welfare.dto.WelfareRequestDto;
import com.project.welfare.repository.SchemeRepository;

@Service
public class SchemeRecommendationService {

    @Autowired
    private SchemeRepository schemeRepository;

    public List<SchemeRecommendationDto> recommendSchemesWithReasons(
        WelfareRequestDto user,
        String eligibilityStatus) {

    if (eligibilityStatus.equals("NOT_ELIGIBLE")) {
        return List.of();
    }

    List<Scheme> allSchemes = schemeRepository.findAll();
    List<SchemeRecommendationDto> result = new ArrayList<>();

    for (Scheme scheme : allSchemes) {

        boolean ageMatch = user.getAge() >= scheme.getMin_age();
        boolean incomeMatch = user.getAnnual_income() <= scheme.getMax_income();

        boolean occupationMatch =
                scheme.getOccupation().equalsIgnoreCase("ANY") ||
                scheme.getOccupation().equalsIgnoreCase(user.getOccupation());

        boolean disabilityMatch =
                scheme.getDisability_required().equalsIgnoreCase("ANY") ||
                scheme.getDisability_required().equalsIgnoreCase(user.getDisability());

        boolean minorityMatch =
                scheme.getMinority_required().equalsIgnoreCase("ANY") ||
                scheme.getMinority_required().equalsIgnoreCase(user.getIs_minority());

        if (ageMatch && incomeMatch && occupationMatch && disabilityMatch && minorityMatch) {

            // 👉 BUILD HUMAN-READABLE REASON
            StringBuilder reason = new StringBuilder();

            if (scheme.getMin_age() >= 60) {
                reason.append("Applicant age is above ").append(scheme.getMin_age()).append(". ");
            }

            if (scheme.getOccupation().equalsIgnoreCase("Farmer")) {
                reason.append("Applicant is a farmer. ");
            }

            if (scheme.getMax_income() > 0) {
                reason.append("Annual income is below ₹")
                      .append((int) scheme.getMax_income())
                      .append(". ");
            }

            if (scheme.getDisability_required().equalsIgnoreCase("Yes")) {
                reason.append("Applicant has a disability. ");
            }

            if (scheme.getMinority_required().equalsIgnoreCase("Yes")) {
                reason.append("Applicant belongs to a minority group. ");
            }

            result.add(
                new SchemeRecommendationDto(
                    scheme.getScheme_name(),
                    reason.toString().trim()
                )
            );
        }
    }

    return result;
}

}

