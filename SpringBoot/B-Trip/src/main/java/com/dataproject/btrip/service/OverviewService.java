package com.dataproject.btrip.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.dataproject.btrip.entity.ForiegnVisitors;
import com.dataproject.btrip.entity.TouristSpotVisitors;
import com.dataproject.btrip.repository.ForiegnVisitorsRepository;
import com.dataproject.btrip.repository.TouristSpotVisitorsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OverviewService {
	private final ForiegnVisitorsRepository foriegnVisitorsRepository;
	private final TouristSpotVisitorsRepository spotVisitorsRepository;
	
	public List<ForiegnVisitors> getForiegnVisitors(){
		return foriegnVisitorsRepository.findAll();
	}
	
	public List<TouristSpotVisitors> getSpotVisitors(){
		return spotVisitorsRepository.findAll();
	}
	
}
