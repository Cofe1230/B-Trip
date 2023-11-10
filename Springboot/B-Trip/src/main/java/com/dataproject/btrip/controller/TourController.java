package com.dataproject.btrip.controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dataproject.btrip.dto.AcmDTO;
import com.dataproject.btrip.dto.TourDTO;
import com.dataproject.btrip.entity.Accommodation;
import com.dataproject.btrip.entity.Tour;
import com.dataproject.btrip.service.AcmService;
import com.dataproject.btrip.service.TourService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin
@RequestMapping("/api/tour/*") 
@RequiredArgsConstructor
public class TourController {
	
	private final TourService tourService;
	private final AcmService acmService;
	
	// 카테고리 호출
	// 카테고리 0 : 전체
	// 카테고리 1 : 미식 + 2.자연
	// 카테고리 2 : 자연 + 4.역사
	// 카테고리 3 : 쇼핑
	// 카테고리 4 : 역사 + 5.문화 + 1.미식
	// 카테고리 5 : 문화
	@GetMapping("/list/{category_num}")
	public Map<String, Object> list_tour(@PathVariable int category_num){
		System.out.println("[category_num] : " + category_num);
		List<Tour> tourListDAO_1 = Collections.emptyList();
		List<Tour> tourListDAO_2 = Collections.emptyList();
		List<Accommodation> acmListDAO = Collections.emptyList();
		
		// 관광 데이터 호출
		if(category_num == 1) {
			tourListDAO_1 = tourService.find_cat(1);		
			tourListDAO_2 = tourService.find_cat(2);
		}			
		else if(category_num == 2) {
			tourListDAO_1 = tourService.find_cat(2);		
			tourListDAO_2 = tourService.find_cat(4);
		}
		else if(category_num == 3) {
			tourListDAO_1 = tourService.find_cat(3);		
			tourListDAO_2 = tourService.find_cat(3);
		}
		else if(category_num == 4) {
			tourListDAO_1 = tourService.find_cat(4);		
			tourListDAO_1.addAll(tourService.find_cat(5));
			tourListDAO_2 = tourService.find_cat(1);
		}else if(category_num == 5) {
			tourListDAO_1 = tourService.find_cat(1);
			tourListDAO_2 = tourService.find_cat(3);
		}else {
			tourListDAO_1 = tourService.findAll();
			tourListDAO_2 = tourService.findAll();
		}
									
		List<TourDTO> rec_1 = tourListDAO_1.stream()
				.map(Tour -> new TourDTO(Tour))
				.collect(Collectors.toList());
		
		List<TourDTO> rec_2 = tourListDAO_2.stream()
				.map(Tour -> new TourDTO(Tour))
				.collect(Collectors.toList());
		
		System.out.println("[ 관광 호출 ]");
		System.out.println(rec_1.get(0).getCategory() + " 목록 : " + rec_1.size() + " items");
		System.out.println(rec_2.get(0).getCategory() + " 목록 : " + rec_2.size() + " items");
		
		
		// 숙박 데이터 호출
		acmListDAO = acmService.findAll();
		List<AcmDTO> acmList = acmListDAO.stream()
				.map(Acm -> new AcmDTO(Acm))
				.collect(Collectors.toList());
		
		System.out.println("[ 숙박시설 호출 ]");
		System.out.println("전체 목록 : " + acmList.size() + " items");
//		System.out.println(acmList.get(0).getTax_charge());
		
		
		
		Map<String, Object> tourList = new HashMap<>();
		tourList.put("rec_1", rec_1);
		tourList.put("rec_2", rec_2);
		tourList.put("acm", acmList);
		
		return tourList;
				
	}
	
	
	// 테스트 호출
	@GetMapping("/test")
	public List<TourDTO> list_test(){
		
		int category_num = 0;
		
		String category = "전체";
		List<Tour> tourListDAO = Collections.emptyList();
		
		if(category_num == 0) {
			tourListDAO = tourService.findAll();
			
		}
		else if(category_num != 0) {
			tourListDAO = tourService.find_cat(category_num);
			category = tourListDAO.get(0).getCategory();
		}
		
							
		List<TourDTO> tourList = tourListDAO.stream()
				.map(Tour -> new TourDTO(Tour))
				.collect(Collectors.toList());
		

		System.out.println("[ Test 호출 ]");
		System.out.println("[ 관광 호출 ]");
		System.out.println(category + " 목록 : " + tourList.size() + " items");		 			
		return tourList;	
	}
	
	//
}
