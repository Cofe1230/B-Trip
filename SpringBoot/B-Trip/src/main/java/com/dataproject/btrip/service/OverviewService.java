package com.dataproject.btrip.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dataproject.btrip.entity.ForiegnVisitors;
import com.dataproject.btrip.entity.SpotVisitors;
import com.dataproject.btrip.repository.ForiegnVisitorsRepository;
import com.dataproject.btrip.repository.SpotVisitorsRepository;

import lombok.RequiredArgsConstructor;

@Service
public class OverviewService {
	@Autowired
    private ForiegnVisitorsRepository foriegnVisitorsRepository;
	@Autowired
    private SpotVisitorsRepository spotVisitorsRepository;

    public List<ForiegnVisitors> getForiegnVisitors() {
        return foriegnVisitorsRepository.findAll();
    }

    public List<SpotVisitors> getSpotVisitors() {
        return spotVisitorsRepository.findAll();
    }
}

