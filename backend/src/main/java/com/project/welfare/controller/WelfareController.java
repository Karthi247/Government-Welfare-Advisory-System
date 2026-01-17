package com.project.welfare.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project.welfare.Entity.EligibilityHistory;
import com.project.welfare.dto.WelfareRequestDto;
import com.project.welfare.dto.WelfareResponseDto;
import com.project.welfare.repository.EligibilityHistoryRepository;
import com.project.welfare.service.MlService;

@RestController
@RequestMapping("/api/welfare")
public class WelfareController {

    @Autowired
    private MlService mlService;

    @Autowired
    private EligibilityHistoryRepository eligibilityHistoryRepository;


    @PostMapping("/check-eligibility")
    public ResponseEntity<WelfareResponseDto> checkEligibility(
            @RequestBody WelfareRequestDto request) {

        // 1. Call ML service
        double score = mlService.getEligibilityScore(request);

        // 2. Decide status (BUSINESS LOGIC)
        String status;
        if (score >= 0.75) {
            status = "ELIGIBLE";
        } else if (score >= 0.50) {
            status = "PARTIALLY_ELIGIBLE";
        } else {
            status = "NOT_ELIGIBLE";
        }

        // 3. SAVE TO DATABASE (THIS IS THE PART YOU ASKED ABOUT)
        EligibilityHistory history = new EligibilityHistory();
        history.setAge(request.getAge());
        history.setGender(request.getGender());
        history.setCategory(request.getCategory());
        history.setState(request.getState());
        history.setOccupation(request.getOccupation());
        history.setAnnual_income(request.getAnnual_income());
        history.setDisability(request.getDisability());
        history.setIs_minority(request.getIs_minority());
        history.setEligibility_score(score);
        history.setEligibility_status(status);

        eligibilityHistoryRepository.save(history);

        // 4. Return response to client
        WelfareResponseDto response =
                new WelfareResponseDto(score, status);

        return ResponseEntity.ok(response);
    }

}
