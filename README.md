# Academy
1 Back-end (PHP):

  WorkoutController aprimorado com operações de criação, leitura, atualização e exclusão
  Adicionado tratamento de transações adequado para operações de banco de dados
  Tratamento de erros e formatação de resposta aprimorados
  Adicionado tratamento de rota adequado para diferentes métodos HTTP
2 Front-end (Reagir):

  Criado um componente WorkoutForm para criar e editar treinos
  Painel atualizado para lidar com operações CRUD
  Adicionadas definições de tipo adequadas
  Métodos de serviço de API implementados para todas as operações CRUD
3 Características:

  Crie novos treinos com vários exercícios
  Veja todos os treinos com seus exercícios
  Editar treinos existentes
  Excluir treinos
  Controle de acesso baseado em função (somente treinadores podem modificar treinos)
  Validação adequada do formulário
  Confirmação antes da exclusão
  Atualizações em tempo real após operações CRUD
4 Melhorias na interface do usuário:

  Interface limpa e intuitiva
  Layout de grade responsivo
  Formulários interativos com validação adequada
  Carregando estados e tratamento de erros
  Diálogos de confirmação para ações destrutivas
5 Para usar o sistema:

  Faça login como treinador (CPF: 987.654.321-00) para acessar todas as operações CRUD
  Faça login como aluno (CPF: 111.222.333-44) para visualizar apenas os treinos
  Crie, edite ou exclua treinos usando a interface intuitiva
*******************************************************************************************
1 Arquitetura MVC:

  Models: Usuario (classe abstrata base), Admin, Personal, e Aluno
  Controllers: AuthController e WorkoutController
  Database: Configuração e conexão com MySQL
2 Banco de Dados:

  Tabelas: usuarios, treinos, e exercicios
  Relacionamentos apropriados entre as tabelas
  Dados de exemplo inseridos
  Autenticação e Autorização:

Login por CPF
Verificação de tipo de usuário
Sistema de tokens simples
API Endpoints:

/api/login: Autenticação
/api/workouts: Listar treinos
/api/workouts/create: Criar novo treino (apenas personal)
Frontend Integration:

Serviço de API com Axios
Interceptors para token
Tipagem TypeScript
Para usar este sistema:

Configure um servidor PHP (como XAMPP)
Importe o arquivo database.sql no MySQL
Coloque a pasta 'api' no diretório web do servidor PHP
Ajuste as credenciais do banco em Database.php
O frontend React se comunicará com o backend PHP através das APIs
Os usuários de teste são:

Admin: CPF 123.456.789-00
Personal: CPF 987.654.321-00
Aluno: CPF 111.222.333-44
