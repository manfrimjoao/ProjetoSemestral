<?php
    $con = mysqli_connect("localhost:3306", "root", "", "loja");

    $where_clauses = [];
    
    if (isset($_GET['busca'])) {
        $pesquisa = mysqli_real_escape_string($con, $_GET['busca']);
        $where_clauses[] = "nome LIKE '%$pesquisa%'";
    }
    
    if (isset($_GET['genero'])) {
        $genero = mysqli_real_escape_string($con, $_GET['genero']);
        $where_clauses[] = "genero = '$genero'";
    }
    
    $sql = "SELECT * FROM card_produto";
    
    if (!empty($where_clauses)) {
        $sql .= ' WHERE ' . implode(' AND ', $where_clauses);
    }
    
    $resultado = mysqli_query($con, $sql);
    
    $dados = array();
    while ($registro = mysqli_fetch_assoc($resultado)) {
        array_push($dados, $registro);
    }
    
    echo json_encode($dados);

    
                            
      



?>