<?php
class AuthController {
    private $db;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
    }

    public function login() {
        $data = json_decode(file_get_contents("php://input"));
        
        if (!isset($data->cpf)) {
            http_response_code(400);
            echo json_encode(['error' => 'CPF é obrigatório']);
            return;
        }

        $stmt = $this->db->prepare("SELECT * FROM usuarios WHERE cpf = ?");
        $stmt->execute([$data->cpf]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            $response = [
                'id' => $user['id'],
                'nome' => $user['nome'],
                'tipo' => $user['tipo'],
                'token' => $this->generateToken($user['id'])
            ];
            echo json_encode($response);
        } else {
            http_response_code(401);
            echo json_encode(['error' => 'Usuário não encontrado']);
        }
    }

    private function generateToken($userId) {
        return base64_encode($userId . '_' . time());
    }
}