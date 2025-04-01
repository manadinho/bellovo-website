<?php
// Database configuration
$host = 'localhost';
$db   = 'your_database_name';
$user = 'your_database_user';
$pass = 'your_database_password';
$charset = 'utf8mb4';

// Setup DSN and options for PDO
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

// Validate and sanitize input
$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
$address = filter_input(INPUT_POST, 'address', FILTER_SANITIZE_STRING);
$bell_qty = filter_input(INPUT_POST, 'bell_qty', FILTER_VALIDATE_INT);
$controller_qty = filter_input(INPUT_POST, 'controller_qty', FILTER_VALIDATE_INT);

// Check required fields
if (!$name || !$phone || !$address || $bell_qty === false || $controller_qty === false) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid input']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO bellovo_orders (name, phone, address, bell_qty, controller_qty, created_at) 
                           VALUES (:name, :phone, :address, :bell_qty, :controller_qty, NOW())");

    $stmt->execute([
        ':name' => $name,
        ':phone' => $phone,
        ':address' => $address,
        ':bell_qty' => $bell_qty,
        ':controller_qty' => $controller_qty,
    ]);

    echo json_encode(['success' => true, 'message' => 'Order submitted successfully']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to submit order']);
}
?>
