<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$host   = 'localhost';
$db     = 'u407899786_formulario';
$user   = 'u407899786_formuser';
$pass   = 'Marketinglamirror25#';

$nome      = trim($_POST['nome']      ?? '');
$telefone  = trim($_POST['telefone']  ?? '');
$email     = trim($_POST['email']     ?? '');
$interesse = trim($_POST['interesse'] ?? '');
$mensagem  = trim($_POST['mensagem']  ?? '');

if (!$nome || !$email) {
  echo json_encode(['ok' => false, 'msg' => 'Nome e e-mail são obrigatórios.']);
  exit;
}

try {
  $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $pdo->exec("CREATE TABLE IF NOT EXISTS contatos (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    nome      VARCHAR(120) NOT NULL,
    telefone  VARCHAR(30),
    email     VARCHAR(120) NOT NULL,
    interesse VARCHAR(80),
    mensagem  TEXT,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
  )");

  $stmt = $pdo->prepare("INSERT INTO contatos (nome, telefone, email, interesse, mensagem) VALUES (?, ?, ?, ?, ?)");
  $stmt->execute([$nome, $telefone, $email, $interesse, $mensagem]);

  echo json_encode(['ok' => true, 'msg' => 'Mensagem enviada com sucesso!']);
} catch (Exception $e) {
  echo json_encode(['ok' => false, 'msg' => 'Erro ao salvar. Tente novamente.']);
}
