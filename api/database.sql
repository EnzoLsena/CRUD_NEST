CREATE DATABASE academia;
USE academia;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT NOT NULL,
    sexo CHAR(1) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    salario DECIMAL(10,2),
    tipo ENUM('admin', 'trainer', 'student') NOT NULL
);

CREATE TABLE treinos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    dia_semana VARCHAR(20) NOT NULL,
    criado_por INT,
    FOREIGN KEY (criado_por) REFERENCES usuarios(id)
);

CREATE TABLE exercicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    treino_id INT,
    nome VARCHAR(100) NOT NULL,
    series INT NOT NULL,
    repeticoes INT NOT NULL,
    peso DECIMAL(5,2),
    observacoes TEXT,
    FOREIGN KEY (treino_id) REFERENCES treinos(id)
);

-- Inserir usuários de exemplo
INSERT INTO usuarios (nome, idade, sexo, cpf, salario, tipo) VALUES
('Admin User', 35, 'M', '123.456.789-00', 8000.00, 'admin'),
('Personal Trainer', 28, 'F', '987.654.321-00', 4000.00, 'trainer'),
('Student', 25, 'M', '111.222.333-44', NULL, 'student');