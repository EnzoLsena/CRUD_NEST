<?php
abstract class Usuario {
    protected $id;
    protected $nome;
    protected $idade;
    protected $sexo;
    protected $cpf;
    protected $salario;
    protected $tipo;

    public function __construct($nome, $idade, $sexo, $cpf, $salario = null) {
        $this->nome = $nome;
        $this->idade = $idade;
        $this->sexo = $sexo;
        $this->cpf = $cpf;
        $this->salario = $salario;
    }

    abstract public function getTipo();

    public function toArray() {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
            'idade' => $this->idade,
            'sexo' => $this->sexo,
            'cpf' => $this->cpf,
            'salario' => $this->salario,
            'tipo' => $this->getTipo()
        ];
    }
}