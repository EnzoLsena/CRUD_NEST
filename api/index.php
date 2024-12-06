<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config/Database.php';
require_once 'models/Usuario.php';
require_once 'models/Admin.php';
require_once 'models/Personal.php';
require_once 'models/Aluno.php';
require_once 'controllers/AuthController.php';
require_once 'controllers/WorkoutController.php';

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

$routes = [
    '/api/login' => ['AuthController', 'login'],
    '/api/workouts' => [
        'GET' => ['WorkoutController', 'getWorkouts'],
        'POST' => ['WorkoutController', 'createWorkout'],
        'PUT' => ['WorkoutController', 'updateWorkout'],
        'DELETE' => ['WorkoutController', 'deleteWorkout']
    ]
];

if (isset($routes[$uri])) {
    $route = $routes[$uri];
    if (is_array($route) && isset($route[$method])) {
        [$controller, $method] = $route[$method];
        $controller = new $controller();
        $controller->$method();
    } else if (is_array($route) && !isset($route[$method])) {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
    } else {
        [$controller, $method] = $route;
        $controller = new $controller();
        $controller->$method();
    }
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Route not found']);
}