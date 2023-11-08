<?php
$con = mysqli_connect("localhost:3306", "root", "", "loja");
if (!$con) {
    die("Conexão falhou: " . mysqli_connect_error());
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["id"])) {
    $id = $_POST["id"];
    $query = "DELETE FROM carrinho WHERE id = ?";

    if ($stmt = mysqli_prepare($con, $query)) {
        mysqli_stmt_bind_param($stmt, "i", $id);
        if (mysqli_stmt_execute($stmt)) {
            $resposta["status"] = "ok";
        } else {
            $resposta["status"] = "erro";
            $resposta["mensagem"] = "Erro ao executar a query: " . mysqli_error($con);
        }
        mysqli_stmt_close($stmt);
    } else {
        $resposta["status"] = "erro";
        $resposta["mensagem"] = "Erro ao preparar a query: " . mysqli_error($con);
    }
} else {
    $resposta["status"] = "erro";
    $resposta["mensagem"] = "ID do produto não especificado.";
}

$json = json_encode($resposta);
header('Content-Type: application/json');
echo $json;

mysqli_close($con);
?>
