<?php
class Aluno extends Usuario {
    public function __construct($nome, $idade, $sexo, $cpf) {
        parent::__construct($nome, $idade, $sexo, $cpf);
        $this->tipo = 'student';
    }

    public function getTipo() {
        return 'student';
    }
}