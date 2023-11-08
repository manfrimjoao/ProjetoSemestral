function mostrarCadastro() {
    
}
async function cadastrarProduto() {
    var form = document.getElementById('formularioCadastroProduto');
   // var dados = new FormData(form);
    let nome=document.getElementById('cadNome').value;
    let preco=document.getElementById('cadPreco').value;
    let genero=document.getElementById('cadGenero').value;
    let categoria=document.getElementById('cadCategoria').value;
    let imagem=document.getElementById('cadImagem').files[0];
    // let dados={nome:nome,
    //    preco:preco,
    //     genero:genero,
    //     imagem:imagem};
    let formData = new FormData();
    formData.append('nome', nome);
    formData.append('preco', preco);
    formData.append('genero', genero);
    formData.append('categoria', categoria);
    formData.append('imagem', imagem);

    try {
        let response = await fetch("php/cadastrar_produto.php", {
            method: "POST",
            body: formData
        });
       // console.log(document.getElementById('cadNome').value)

        if (!response.ok) {
            throw new Error('Resposta da network não foi ok');
        }

        let resposta = await response.json();
        console.log(resposta)

        // Verifica o status da resposta do PHP
        if (resposta.status === "ok") {
            location.reload()
        } else {
            // Se houver erro, alerta o usuário
            alert(resposta.mensagem);
        }
    } catch (error) {
        // Caso haja algum erro na rede ou na resposta
        console.error('Houve um problema no cadastro:', error);
        alert("Ocorreu um erro ao cadastrar produto. Por favor, tente novamente.");
    }
}
async function carregarProdutos() {
    let response = await fetch("php/buscar_produto.php", {
        method: "POST",
    });

    if (!response.ok) {
        throw new Error('Resposta da network não foi ok');
    }
    // newRow = "<td>New row text</td><td>New row 2nd cell</td>"; <-- won't work
    

    let resposta = await response.json();
    resposta.forEach(element => {
    var newRow=document.getElementById('itensTabela').insertRow();
    let preçoFormatado = `R$ ${parseFloat(element["preço"]).toFixed(2)}`;
        newRow.innerHTML = `<tr>
        <td>${element["nome"]}</td>
        <td>${preçoFormatado}</td>
        <td>${element["genero"]}</td>
        <td>${element["categoria"]}</td>
        <td><button onclick="excluirProduto(${element["id"]})">Excluir</button></td>
        </tr>`;
    });
}
async function excluirProduto(idProduto) {
    let formData = new FormData();
    formData.append('id', idProduto);

    try {
        let response = await fetch("php/excluir_produto.php", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error('Resposta da network não foi ok');
        }

        let resposta = await response.json();

        if (resposta.status === "ok") {
            location.reload(); // Recarrega a página para atualizar a lista de produtos
        } else {
            alert(resposta.mensagem);
        }
    } catch (error) {
        console.error('Houve um problema ao excluir o produto:', error);
        alert("Ocorreu um erro ao excluir o produto. Por favor, tente novamente.");
    }
}

