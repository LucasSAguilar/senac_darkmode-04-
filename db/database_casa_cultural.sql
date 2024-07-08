CREATE DATABASE IF NOT EXISTS casa_cultural;
USE casa_cultural;

CREATE TABLE IF NOT EXISTS Filme (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    sinopse TEXT,
    genero VARCHAR(100),
    anoLancamento INT
);

CREATE TABLE IF NOT EXISTS Analise (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    filme_id BIGINT,
    nota int,
    analise TEXT,
    FOREIGN KEY (filme_id) REFERENCES Filme(id)
);

