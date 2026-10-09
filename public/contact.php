<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Metodo non consentito']);
    exit;
}

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

if (!$input) {
    $input = $_POST;
}

$nome = isset($input['nome']) ? trim($input['nome']) : '';
$email = isset($input['email']) ? trim($input['email']) : '';
$telefono = isset($input['telefono']) ? trim($input['telefono']) : '';
$servizio = isset($input['servizio']) ? trim($input['servizio']) : '';
$messaggio = isset($input['messaggio']) ? trim($input['messaggio']) : '';

if (empty($nome) || empty($email) || empty($messaggio)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Campi obbligatori mancanti']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Indirizzo email non valido']);
    exit;
}

$db_host = '148.251.75.142';
$db_name = 'afterbit-test100';
$db_user = 'afterbit-test100';
$db_pass = '33fvBnIVpx0PGnLhxTXT';

$ip_address = $_SERVER['REMOTE_ADDR'] ?? '';

try {
    $dsn = "mysql:host=$db_host;dbname=$db_name;charset=utf8mb4";
    $pdo = new PDO($dsn, $db_user, $db_pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    $stmt = $pdo->prepare("
        INSERT INTO afterbit_contact_messages (nome, email, telefono, servizio, messaggio, ip_address)
        VALUES (:nome, :email, :telefono, :servizio, :messaggio, :ip_address)
    ");
    $stmt->execute([
        ':nome' => $nome,
        ':email' => $email,
        ':telefono' => $telefono,
        ':servizio' => $servizio,
        ':messaggio' => $messaggio,
        ':ip_address' => $ip_address,
    ]);

    echo json_encode(['status' => 'success', 'message' => 'Messaggio registrato con successo']);
} catch (Exception $e) {
    error_log("Database error in contact.php: " . $e->getMessage());
    echo json_encode(['status' => 'success', 'message' => 'Richiesta ricevuta']);
}
