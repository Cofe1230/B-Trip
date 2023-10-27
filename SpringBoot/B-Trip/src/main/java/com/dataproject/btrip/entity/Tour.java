package com.dataproject.btrip.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@Entity(name = "tour_list")
@AllArgsConstructor
@NoArgsConstructor
public class Tour {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
    private String title;
    private String link_url;
    private	String img_url;
    private int views;
    private int comments;
    private int likes;
    private String category;
    private int category_num;
	
}
