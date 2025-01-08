-- Criar banco de dados
CREATE DATABASE deltechDB;

-- Usar o banco de dados criado
USE deltechDB;

-- Criar tabela 'funcionarios'
CREATE TABLE funcionarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    profissao VARCHAR(50) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    idade INT NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    data_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);
