async function cadastrar() {
    var form = document.getElementById('formulario');
    var dados = new FormData(form);
    console.log(dados);
    try {
        var promise = await fetch("php/cadastro.php", {
            method: "POST",
            body: dados
        });

        var resposta = await promise.json();
        console.log(resposta.json);
        if (resposta.status === "ok") {
            // Mostra uma mensagem de sucesso para o usuário
            alert("Usuário cadastrado com sucesso!");

            // Redireciona para a página index.html
            window.location.href = 'index.html';
        } else {
            // Se o status não for "ok", exibe a mensagem de erro
            alert("Erro ao cadastrar: " + resposta.mensagem);
        }

        console.log(resposta);
    } catch (error) {
        // Captura erros de rede e problemas na resposta JSON
        console.error("Erro durante o cadastro:", error);
        alert("Erro durante o cadastro. Por favor, tente novamente.");
    }
}
