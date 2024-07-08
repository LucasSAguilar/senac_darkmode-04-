package com.cultural.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cultural.demo.models.Analise;
import com.cultural.demo.repositories.AnaliseRepository;

@CrossOrigin
@RestController
public class AnaliseController {

    @Autowired
    private AnaliseRepository analiseRepository;

    @PostMapping("/analise")
    public Analise adicionarAnalise(@RequestBody Analise novaAnalise) {
        return analiseRepository.save(novaAnalise);
    }

    @GetMapping("/analise")
    public List<Analise> obterAnalise() {
        return analiseRepository.findAll();
    }

    @GetMapping("/analise/{id}")
    public Analise obterAnalisePorId(@PathVariable("id") int id) {
        return analiseRepository.findById(id).get();
    }

    @PutMapping("/analise/{id}")
    public void editarAnalise(@PathVariable("id") int id, @RequestBody Analise analiseDetalhes) {
        analiseRepository.findById(id)
                .ifPresent(analise -> {
                    analise.setFilme(analiseDetalhes.getFilme());
                    analise.setAnalise(analiseDetalhes.getAnalise());
                    analiseRepository.save(analise);
                });
    }

    @DeleteMapping("/analise/{id}")
    public void deletarAnalise(@PathVariable("id") int id) {
        analiseRepository.deleteById(id);
    }
}