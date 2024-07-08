package com.cultural.demo.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.cultural.demo.models.Filme;
import com.cultural.demo.repositories.FilmeRepository;

@CrossOrigin
@RestController
public class FilmeControllers {
    List<Filme> listaDFilmes = new ArrayList<>();
    @Autowired
    private FilmeRepository filmeRepository;

    @PostMapping("/filme")
    public void adicionarFilme(@RequestBody Filme novoFilme) {
        filmeRepository.save(novoFilme);
    }

    @GetMapping("/filme")
    @ResponseBody
    public List<Filme> coletarFilmes() {
        return filmeRepository.findAll();
    }

    @GetMapping("/filme/{id}")
    @ResponseBody
    public Filme coletarFilme(@PathVariable("id") int id) {
        return filmeRepository.findById(id).get();
    }

    @DeleteMapping("/filme/{id}")
    public void deletarFilme(@PathVariable("id") int id) {
        filmeRepository.deleteById(id);
    }

    @PutMapping("/filme/{id}")
    public void editarFilme(@PathVariable("id") int id, @RequestBody Filme filmeDetalhes) {
        filmeRepository.findById((int) id)
                .ifPresent(filme -> {
                    filme.setTitulo(filmeDetalhes.getTitulo());
                    filme.setSinopse(filmeDetalhes.getSinopse());
                    filme.setGenero(filmeDetalhes.getGenero());
                    filme.setAnoLancamento(filmeDetalhes.getAnoLancamento());
                    filmeRepository.save(filme);
                });
    }
}