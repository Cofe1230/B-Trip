package com.dataproject.btrip.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dataproject.btrip.dto.ForiegnVisitorsDto;
import com.dataproject.btrip.dto.TouristSpotVisitorsDto;
import com.dataproject.btrip.mapper.ForiegnVisitorsMapper;
import com.dataproject.btrip.mapper.TouristSpotVisitorsMapper;
import com.dataproject.btrip.service.OverviewService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/overview/*")
@RequiredArgsConstructor
public class OverviewController {
	private final OverviewService overviewService;
	private final ForiegnVisitorsMapper foriegnVisitorsMapper;
	private final TouristSpotVisitorsMapper touristSpotVisitorsMapper;
	
	@GetMapping("foriegn-visitors")
	public List<ForiegnVisitorsDto> getForiegnVisitors(){
		List<ForiegnVisitorsDto> visitorsList = foriegnVisitorsMapper.toDtoList(
															overviewService.getForiegnVisitors());
		return visitorsList;
	}
	
	@GetMapping("spot-visitors")
	public List<TouristSpotVisitorsDto> getSpotVisitors(){
		List<TouristSpotVisitorsDto> spotVisitorsList = touristSpotVisitorsMapper.toDtoList(
															overviewService.getSpotVisitors());
		return spotVisitorsList;
	}
}
