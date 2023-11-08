<?php
    // Estabelecendo a conexão com o banco de dados
    $con = mysqli_connect("localhost:3306", "root", "", "loja");
    if (!$con) {
        die("Conexão falhou: " . mysqli_connect_error());
    }

    // Verificando se os dados foram enviados via POST
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $username = $_POST["username"];
        $password = $_POST["password"];
        $email = $_POST["email"];
        $cpf = $_POST["cpf"];
        
        // Criptografando a senha com uma hash segura
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);

        // Preparando a query SQL com a coluna adm
        $query = "INSERT INTO usuario (username, password, email, cpf, adm) VALUES (?, ?, ?, ?, 0)";

        // Preparando a instrução para evitar injeção de SQL
        if ($stmt = mysqli_prepare($con, $query)) {
            // Vincula os parâmetros para marcadores
            mysqli_stmt_bind_param($stmt, "ssss", $username, $passwordHash, $email, $cpf);

            // Executa a query
            if (mysqli_stmt_execute($stmt)) {
                $resposta["status"] = "ok";
            } else {
                $resposta["status"] = "erro";
                $resposta["mensagem"] = "Erro ao executar a query: " . mysqli_error($con);
            }
            // Fecha a declaração
            mysqli_stmt_close($stmt);
        } else {
            $resposta["status"] = "erro";
            $resposta["mensagem"] = "Erro ao preparar a query: " . mysqli_error($con);
        }
    } else {
        $resposta["status"] = "erro";
        $resposta["mensagem"] = "Nenhum dado enviado via POST.";
    }

    // Codifica a resposta como JSON e a envia de volta
    $json = json_encode($resposta);
    header('Content-Type: application/json');
    echo $json;

    // Fecha a conexão
    mysqli_close($con);
?>
