package com.dataproject.btrip.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.dataproject.btrip.entity.Accommodation;
import com.dataproject.btrip.repository.AcmRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AcmService {

	private final AcmRepository accRepository;
	
	
	// 전체 호출
	public List<Accommodation> findAll() {
		// TODO Auto-generated method stub
		return accRepository.findAll();
	}
	
	
	/*
	 * // 카테고리 호출 public List<Accommodation> find_cat(int category_num) { // TODO
	 * Auto-generated method stub return
	 * accRepository.findByCategoryNum(category_num); }
	 */

	public Accommodation view(int i) {
		// TODO Auto-generated method stub
		return accRepository.findById(i).get();
	}
	
}
