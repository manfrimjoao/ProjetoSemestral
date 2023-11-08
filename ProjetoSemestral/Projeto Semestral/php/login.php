<?php
    session_start();

    // Verifique se o usuário deseja fazer logout
    if (isset($_GET['logout'])) {
        // Destrua a sessão e redirecione para a página de login
        session_destroy();
        header('Location: ../login.html');
        exit;
    }
    
    
    $con = mysqli_connect("localhost:3306", "root", "", "loja");
    if (!$con) {
        die("Conexão falhou: " . mysqli_connect_error());
    }

    $username = $_POST["username"];
    $password = $_POST["password"];

    $query = "SELECT * FROM usuario WHERE username = ?";
    if ($stmt = mysqli_prepare($con, $query)) {
        mysqli_stmt_bind_param($stmt, "s", $username);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        if ($user = mysqli_fetch_assoc($result)) {
            if (password_verify($password, $user['password'])) {
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['username'] = $user['username'];
                $_SESSION['admin'] = $user['adm'];

                $resposta["status"] = "ok";
                $resposta["admin"] = $user['adm'];
            } else {
                $resposta["status"] = "erro";
                $resposta["mensagem"] = "Senha incorreta.";
            }
        } else {
            $resposta["status"] = "erro";
            $resposta["mensagem"] = "Usuário não encontrado.";
        }
        mysqli_stmt_close($stmt);
    } else {
        $resposta["status"] = "erro";
        $resposta["mensagem"] = "Erro ao preparar a query: " . mysqli_error($con);
    }
    
    $json = json_encode($resposta);
    echo $json;
    
    mysqli_close($con);
?>
