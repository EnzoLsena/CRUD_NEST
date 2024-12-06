<?php
class WorkoutController {
    private $db;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
    }

    public function getWorkouts() {
        $stmt = $this->db->prepare("
            SELECT t.*, e.* 
            FROM treinos t 
            LEFT JOIN exercicios e ON t.id = e.treino_id
        ");
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        $workouts = [];
        foreach ($results as $row) {
            if (!isset($workouts[$row['id']])) {
                $workouts[$row['id']] = [
                    'id' => $row['id'],
                    'nome' => $row['nome'],
                    'descricao' => $row['descricao'],
                    'dia_semana' => $row['dia_semana'],
                    'exercicios' => []
                ];
            }
            if ($row['treino_id']) {
                $workouts[$row['id']]['exercicios'][] = [
                    'id' => $row['id'],
                    'nome' => $row['nome'],
                    'series' => $row['series'],
                    'repeticoes' => $row['repeticoes'],
                    'peso' => $row['peso'],
                    'observacoes' => $row['observacoes']
                ];
            }
        }
        
        echo json_encode(array_values($workouts));
    }

    public function createWorkout() {
        if (!$this->isTrainer($this->getToken())) {
            http_response_code(403);
            echo json_encode(['error' => 'Acesso negado']);
            return;
        }

        $data = json_decode(file_get_contents("php://input"));
        
        try {
            $this->db->beginTransaction();
            
            $stmt = $this->db->prepare(
                "INSERT INTO treinos (nome, descricao, dia_semana, criado_por) 
                 VALUES (?, ?, ?, ?)"
            );
            
            $stmt->execute([
                $data->nome,
                $data->descricao,
                $data->diaSemana,
                $this->getUserIdFromToken($this->getToken())
            ]);
            
            $treinoId = $this->db->lastInsertId();
            
            foreach ($data->exercicios as $exercicio) {
                $stmt = $this->db->prepare(
                    "INSERT INTO exercicios (treino_id, nome, series, repeticoes, peso, observacoes) 
                     VALUES (?, ?, ?, ?, ?, ?)"
                );
                
                $stmt->execute([
                    $treinoId,
                    $exercicio->nome,
                    $exercicio->series,
                    $exercicio->repeticoes,
                    $exercicio->peso ?? null,
                    $exercicio->observacoes ?? null
                ]);
            }
            
            $this->db->commit();
            echo json_encode(['message' => 'Treino criado com sucesso', 'id' => $treinoId]);
            
        } catch (Exception $e) {
            $this->db->rollBack();
            http_response_code(500);
            echo json_encode(['error' => 'Erro ao criar treino: ' . $e->getMessage()]);
        }
    }

    public function updateWorkout() {
        if (!$this->isTrainer($this->getToken())) {
            http_response_code(403);
            echo json_encode(['error' => 'Acesso negado']);
            return;
        }

        $data = json_decode(file_get_contents("php://input"));
        $id = $data->id;
        
        try {
            $this->db->beginTransaction();
            
            $stmt = $this->db->prepare(
                "UPDATE treinos 
                 SET nome = ?, descricao = ?, dia_semana = ? 
                 WHERE id = ?"
            );
            
            $stmt->execute([
                $data->nome,
                $data->descricao,
                $data->diaSemana,
                $id
            ]);
            
            // Remove existing exercises
            $stmt = $this->db->prepare("DELETE FROM exercicios WHERE treino_id = ?");
            $stmt->execute([$id]);
            
            // Add new exercises
            foreach ($data->exercicios as $exercicio) {
                $stmt = $this->db->prepare(
                    "INSERT INTO exercicios (treino_id, nome, series, repeticoes, peso, observacoes) 
                     VALUES (?, ?, ?, ?, ?, ?)"
                );
                
                $stmt->execute([
                    $id,
                    $exercicio->nome,
                    $exercicio->series,
                    $exercicio->repeticoes,
                    $exercicio->peso ?? null,
                    $exercicio->observacoes ?? null
                ]);
            }
            
            $this->db->commit();
            echo json_encode(['message' => 'Treino atualizado com sucesso']);
            
        } catch (Exception $e) {
            $this->db->rollBack();
            http_response_code(500);
            echo json_encode(['error' => 'Erro ao atualizar treino: ' . $e->getMessage()]);
        }
    }

    public function deleteWorkout() {
        if (!$this->isTrainer($this->getToken())) {
            http_response_code(403);
            echo json_encode(['error' => 'Acesso negado']);
            return;
        }

        $id = $_GET['id'] ?? null;
        
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'ID do treino não fornecido']);
            return;
        }
        
        try {
            $this->db->beginTransaction();
            
            // Delete exercises first due to foreign key constraint
            $stmt = $this->db->prepare("DELETE FROM exercicios WHERE treino_id = ?");
            $stmt->execute([$id]);
            
            // Delete workout
            $stmt = $this->db->prepare("DELETE FROM treinos WHERE id = ?");
            $stmt->execute([$id]);
            
            $this->db->commit();
            echo json_encode(['message' => 'Treino excluído com sucesso']);
            
        } catch (Exception $e) {
            $this->db->rollBack();
            http_response_code(500);
            echo json_encode(['error' => 'Erro ao excluir treino: ' . $e->getMessage()]);
        }
    }

    private function getToken() {
        $headers = getallheaders();
        return $headers['Authorization'] ?? '';
    }

    private function isTrainer($token) {
        $userId = $this->getUserIdFromToken($token);
        if (!$userId) return false;

        $stmt = $this->db->prepare("SELECT tipo FROM usuarios WHERE id = ?");
        $stmt->execute([$userId]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        return $user && $user['tipo'] === 'trainer';
    }

    private function getUserIdFromToken($token) {
        if (empty($token)) return null;
        $token = str_replace('Bearer ', '', $token);
        $decoded = base64_decode($token);
        return explode('_', $decoded)[0] ?? null;
    }
}