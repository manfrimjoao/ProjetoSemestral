<?php
session_start();

// Verifique se o usuário está logado e obtenha o user_id
if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
    
    // Conexão com o banco de dados
    $con = mysqli_connect("localhost:3306", "root", "", "loja");

    // Checar conexão
    if (mysqli_connect_errno()) {
        echo json_encode(['status' => 'erro', 'mensagem' => 'Falha na conexão com o MySQL: ' . mysqli_connect_error()]);
        exit();
    }

    // Query para deletar os itens do carrinho do usuário
    $sql = "DELETE FROM carrinho WHERE user_id = ?";

    // Preparar a declaração SQL
    if ($stmt = mysqli_prepare($con, $sql)) {
        mysqli_stmt_bind_param($stmt, "i", $user_id);

        // Executar a declaração
        if (mysqli_stmt_execute($stmt)) {
            echo json_encode(['status' => 'ok']);
        } else {
            echo json_encode(['status' => 'erro', 'mensagem' => 'Não foi possível esvaziar o carrinho.']);
        }

        // Fechar declaração
        mysqli_stmt_close($stmt);
    } else {
        echo json_encode(['status' => 'erro', 'mensagem' => 'Erro ao preparar a declaração SQL.']);
    }

    // Fechar conexão
    mysqli_close($con);
} else {
    echo json_encode(['status' => 'erro', 'mensagem' => 'Usuário não está logado.']);
}
?>
