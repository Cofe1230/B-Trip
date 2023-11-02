package com.dataproject.btrip.mapper;

import java.util.List;

public interface GenericMapper<D,E> {
	D toDto(E e);
	List<D> toDtoList(List<E> e);
}
