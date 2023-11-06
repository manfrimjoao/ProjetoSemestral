<?php
// Estabelecendo a conexão com o banco de dados
$con = mysqli_connect("localhost:3306", "root", "", "loja");
if (!$con) {
    die("Conexão falhou: " . mysqli_connect_error());
}

$resposta = array();

// Verificando se os dados foram enviados via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST["nome"];
    $preco = $_POST["preco"];
    $genero = $_POST["genero"];
    $categoria = $_POST["categoria"];
    
    // Inicializando a variável imagem
    $imagem = "";
    
    // Tratamento de upload de imagem
    if (isset($_FILES['imagem']) && $_FILES['imagem']['error'] == UPLOAD_ERR_OK) {
        $uploadDir = '../imagens/';
        $tmpName = $_FILES['imagem']['tmp_name'];
        $fileName = basename($_FILES['imagem']['name']);
        $uploadFile = $uploadDir . $fileName;
        
        if (move_uploaded_file($tmpName, $uploadFile)) {
            // Salva no banco de dados o caminho como 'imagens/nome_do_arquivo.ext'
            $imagem = 'imagens/' . $fileName;
        } else {

            $resposta["status"] = "erro";
            $resposta["mensagem"] = "Falha ao fazer upload da imagem.";
            // Codifica a resposta como JSON e a envia de volta
            echo json_encode($resposta);
            // Fecha a conexão
            mysqli_close($con);
            exit(); // Encerra a execução do script em caso de falha
        }
    } else {
        $resposta["status"] = "erro";
        $resposta["mensagem"] = "Imagem não foi enviada ou houve um erro no upload.";
        echo json_encode($resposta);
        mysqli_close($con);
        exit();
    }

    // Preparando a query SQL com a coluna caminho_imagem
    $query = "INSERT INTO card_produto (nome, preço, genero, categoria, caminho_imagem) VALUES (?, ?, ?, ?, ?)";

    // Preparando a instrução para evitar injeção de SQL
    if ($stmt = mysqli_prepare($con, $query)) {
        // Vincula os parâmetros para marcadores
        mysqli_stmt_bind_param($stmt, "sssss", $nome, $preco, $genero, $categoria, $imagem);

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
echo json_encode($resposta);

// Fecha a conexão
mysqli_close($con);
?>
