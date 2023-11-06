<?php
session_start();

$con = mysqli_connect("localhost:3306", "root", "", "loja");
if (!$con) {
    die("Conexão falhou: " . mysqli_connect_error());
}

if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];

    $sql = "SELECT carrinho.id, card_produto.nome, card_produto.preço, carrinho.quantidade, card_produto.categoria
            FROM carrinho 
            INNER JOIN card_produto ON carrinho.produto_id = card_produto.id 
            WHERE carrinho.user_id = $user_id"; // Filtra por ID de usuário

    $resultado = mysqli_query($con, $sql);

    $dados = array();
    while ($registro = mysqli_fetch_assoc($resultado)) {
        $dados[] = array(
            "id" => $registro["id"],
            "nome" => $registro["nome"],
            "preco" => $registro["preço"],
            "quantidade" => $registro["quantidade"],
            "categoria" => $registro["categoria"]
           
        );
    }

    echo json_encode($dados);
} else {
    echo "Usuário não está logado.";

mysqli_close($con);

    ?>