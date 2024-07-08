package com.cultural.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cultural.demo.models.Analise;

public interface AnaliseRepository extends JpaRepository<Analise, Integer> {
}