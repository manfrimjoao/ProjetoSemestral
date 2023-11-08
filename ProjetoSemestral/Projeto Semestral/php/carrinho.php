<?php
    // Certifique-se de que você está lidando com uma requisição POST com JSON
    $dadosJson = json_decode(file_get_contents('php://input'), true);
    
    // Verifique se o usuário está logado
    session_start();
    if (!isset($_SESSION['user_id'])) {
        echo "Você precisa estar logado para adicionar produtos ao carrinho!";
        exit();
    }
    
    // Conexão corrigida para $con como em login.php
    $con = mysqli_connect("localhost:3306", "root", "", "loja");

    // Verifique se a conexão foi bem-sucedida
    if (!$con) {
        echo "Erro na conexão: " . mysqli_connect_error();
        exit();
    }

    // Verifique se os dados necessários foram recebidos
    if (isset($dadosJson['produto_id'])) {
        $produto_id = $dadosJson['produto_id'];
        $usuario_id = $_SESSION['user_id']; // Usamos o ID do usuário da sessão
        $quantidade = 1;

        $sql = "INSERT INTO carrinho (produto_id, user_id, quantidade) VALUES (?, ?, ?)";
        $stmt = $con->prepare($sql);
        $stmt->bind_param("iii", $produto_id, $usuario_id, $quantidade);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            echo "Produto adicionado ao carrinho!";
        } else {
            echo "Erro ao adicionar produto ao carrinho.";
        }

        $stmt->close();
        $con->close();
    } else {
        echo "Dados do produto não fornecidos!";
    }
?>
