<?php
    $con = mysqli_connect("localhost:3306", "root", "", "loja");

    $sql = "SELECT * FROM card_produto";
       
    $resultado = mysqli_query($con, $sql);
    
    $dados = array();
    while ($registro = mysqli_fetch_assoc($resultado)) {
        array_push($dados, $registro);
    }
    
    echo json_encode($dados);

?>