package com.cultural.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cultural.demo.models.Filme;

public interface FilmeRepository extends JpaRepository<Filme, Integer> {
}