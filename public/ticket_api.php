<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$db_host = '148.251.75.142';
$db_name = 'afterbit-test100';
$db_user = 'afterbit-test100';
$db_pass = '33fvBnIVpx0PGnLhxTXT';

try {
    $dsn = "mysql:host=$db_host;dbname=$db_name;charset=utf8mb4";
    $pdo = new PDO($dsn, $db_user, $db_pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Errore di connessione al database.']);
    exit;
}

$action = $_GET['action'] ?? '';

// --- ACTION 1: CREATE TICKET ---
if ($action === 'create' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true) ?: $_POST;

    $title = trim($data['title'] ?? '');
    $referente = trim($data['referente'] ?? 'Non specificato');
    $email = trim($data['email'] ?? '');
    $telefono = trim($data['telefono'] ?? '');
    $tipo_intervento = trim($data['tipo_intervento'] ?? 'assistenza_tecnica');
    $priority = trim($data['priority'] ?? 'urgent');
    $description = trim($data['description'] ?? '');

    if (empty($title) || empty($description)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Titolo e descrizione sono obbligatori.']);
        exit;
    }

    $ip_address = $_SERVER['REMOTE_ADDR'] ?? '';

    // Find default creator user (ID 1 cdalloro or first user)
    $stmtUser = $pdo->query("SELECT id FROM auth_user ORDER BY id ASC LIMIT 1");
    $userRow = $stmtUser->fetch();
    $creator_id = $userRow ? (int)$userRow['id'] : 1;

    $now = date('Y-m-d H:i:s');
    $anno = date('Y');

    try {
        $stmt = $pdo->prepare("
            INSERT INTO tickets_ticket (
                title, referente, description, tipo_intervento, status, priority, 
                attachment, created_by_id, created_from_ip, created_at, updated_at
            ) VALUES (
                :title, :referente, :description, :tipo_intervento, 'open', :priority,
                '', :created_by_id, :created_from_ip, :created_at, :updated_at
            )
        ");
        $stmt->execute([
            ':title' => $title,
            ':referente' => $referente,
            ':description' => $description,
            ':tipo_intervento' => $tipo_intervento,
            ':priority' => $priority,
            ':created_by_id' => $creator_id,
            ':created_from_ip' => $ip_address,
            ':created_at' => $now,
            ':updated_at' => $now
        ]);

        $ticket_id = (int)$pdo->lastInsertId();
        $codice = sprintf("AB-%s-%05d", $anno, $ticket_id);

        $stmtUpdate = $pdo->prepare("UPDATE tickets_ticket SET codice_riferimento = :codice WHERE id = :id");
        $stmtUpdate->execute([':codice' => $codice, ':id' => $ticket_id]);

        echo json_encode([
            'status' => 'success',
            'ticket_id' => $ticket_id,
            'codice' => $codice,
            'message' => 'Ticket creato con successo!'
        ]);
        exit;
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Errore nel salvataggio del ticket: ' . $e->getMessage()]);
        exit;
    }
}

// --- ACTION 2: SEARCH TICKET ---
if ($action === 'search' && $_SERVER['REQUEST_METHOD'] === 'GET') {
    $code = trim($_GET['code'] ?? '');
    if (empty($code)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Inserisci un codice valido.']);
        exit;
    }

    $cleanCode = lstrip_hash($code);
    $is_numeric = is_numeric($cleanCode);

    try {
        if ($is_numeric) {
            $stmt = $pdo->prepare("SELECT * FROM tickets_ticket WHERE id = :id OR codice_riferimento = :code LIMIT 1");
            $stmt->execute([':id' => (int)$cleanCode, ':code' => $code]);
        } else {
            $stmt = $pdo->prepare("SELECT * FROM tickets_ticket WHERE codice_riferimento = :code LIMIT 1");
            $stmt->execute([':code' => $code]);
        }
        $ticket = $stmt->fetch();

        if (!$ticket) {
            echo json_encode(['status' => 'error', 'message' => 'Nessun ticket trovato con il codice indicato.']);
            exit;
        }

        // Fetch updates
        $stmtUpdates = $pdo->prepare("
            SELECT u.id, u.note, u.created_at, a.username as author 
            FROM tickets_ticketupdate u 
            LEFT JOIN auth_user a ON u.author_id = a.id 
            WHERE u.ticket_id = :ticket_id 
            ORDER BY u.created_at ASC
        ");
        $stmtUpdates->execute([':ticket_id' => $ticket['id']]);
        $updates = $stmtUpdates->fetchAll();

        $formatted_updates = [];
        foreach ($updates as $upd) {
            $formatted_updates[] = [
                'id' => (int)$upd['id'],
                'note' => $upd['note'],
                'author' => $upd['author'] ?: 'Staff Afterbit',
                'created_at_formatted' => date('d/m/Y H:i', strtotime($upd['created_at']))
            ];
        }

        echo json_encode([
            'status' => 'success',
            'ticket' => [
                'id' => (int)$ticket['id'],
                'codice_riferimento' => $ticket['codice_riferimento'],
                'title' => $ticket['title'],
                'referente' => $ticket['referente'],
                'description' => $ticket['description'],
                'tipo_intervento' => $ticket['tipo_intervento'],
                'status' => $ticket['status'],
                'priority' => $ticket['priority'],
                'created_at_formatted' => date('d/m/Y H:i', strtotime($ticket['created_at'])),
                'updates' => $formatted_updates
            ]
        ]);
        exit;
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Errore nella ricerca: ' . $e->getMessage()]);
        exit;
    }
}

function lstrip_hash($str) {
    return ltrim($str, '#');
}

echo json_encode(['status' => 'error', 'message' => 'Azione non riconosciuta.']);
