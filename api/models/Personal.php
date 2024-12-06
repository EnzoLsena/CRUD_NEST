<?php
class Personal extends Usuario {
    public function __construct($nome, $idade, $sexo, $cpf, $salario) {
        parent::__construct($nome, $idade, $sexo, $cpf, $salario);
        $this->tipo = 'trainer';
    }

    public function getTipo() {
        return 'trainer';
    }
}