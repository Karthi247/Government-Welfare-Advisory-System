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

        boolean ageMatch = user.getAge() >= scheme.getMinAge();
        if (scheme.getMaxAge() != null && scheme.getMaxAge() > 0) {
            ageMatch = ageMatch && user.getAge() <= scheme.getMaxAge();
        }
        boolean incomeMatch = user.getAnnual_income() <= scheme.getMaxIncome();

        boolean categoryMatch =
                scheme.getCategory() == null ||
                scheme.getCategory().equalsIgnoreCase("ANY") ||
                scheme.getCategory().equalsIgnoreCase(user.getCategory());

        boolean genderMatch =
                scheme.getGender() == null ||
                scheme.getGender().equalsIgnoreCase("ANY") ||
                scheme.getGender().equalsIgnoreCase(user.getGender());

        boolean locationMatch =
                scheme.getLocation() == null ||
                scheme.getLocation().equalsIgnoreCase("ANY") ||
                scheme.getLocation().equalsIgnoreCase(user.getState());

        boolean occupationMatch =
                scheme.getOccupation().equalsIgnoreCase("ANY") ||
                scheme.getOccupation().equalsIgnoreCase(user.getOccupation());

        boolean disabilityMatch =
                scheme.getDisabilityRequired().equalsIgnoreCase("ANY") ||
                scheme.getDisabilityRequired().equalsIgnoreCase(user.getDisability());

        boolean minorityMatch =
                scheme.getMinorityRequired().equalsIgnoreCase("ANY") ||
                scheme.getMinorityRequired().equalsIgnoreCase(user.getIs_minority());

        if (ageMatch && incomeMatch && categoryMatch && genderMatch && locationMatch
                && occupationMatch && disabilityMatch && minorityMatch) {

            StringBuilder reason = new StringBuilder();

            if (scheme.getMinAge() >= 60) {
                reason.append("Applicant age is above ").append(scheme.getMinAge()).append(". ");
            }

            if (scheme.getOccupation().equalsIgnoreCase("Farmer")) {
                reason.append("Applicant is a farmer. ");
            }

            if (scheme.getMaxIncome() > 0) {
                reason.append("Annual income is below ₹")
                      .append((int) scheme.getMaxIncome())
                      .append(". ");
            }

            if (scheme.getDisabilityRequired().equalsIgnoreCase("Yes")) {
                reason.append("Applicant has a disability. ");
            }

            if (scheme.getMinorityRequired().equalsIgnoreCase("Yes")) {
                reason.append("Applicant belongs to a minority group. ");
            }

            result.add(
                new SchemeRecommendationDto(
                    scheme.getId(), 
                    scheme.getSchemeName(),
                    reason.toString().trim()
                )
            );
        }
    }

    return result;
}

}

