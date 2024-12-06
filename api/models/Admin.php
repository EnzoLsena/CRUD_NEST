<?php
class Admin extends Usuario {
    public function __construct($nome, $idade, $sexo, $cpf, $salario) {
        parent::__construct($nome, $idade, $sexo, $cpf, $salario);
        $this->tipo = 'admin';
    }

    public function getTipo() {
        return 'admin';
    }
}