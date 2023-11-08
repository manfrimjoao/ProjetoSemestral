async function deslogar(){
    alert("Logout realizado com sucesso");
}

async function logar() {
    var form = document.getElementById('formulario');
    var dados = new FormData(form);

    try {
        let response = await fetch("php/login.php", {
            method: "POST",
            body: dados
        });

        if (!response.ok) {
            throw new Error('Resposta da network não foi ok');
        }

        let resposta = await response.json();
        console.log(resposta)

        // Verifica o status da resposta do PHP
        if (resposta.status === "ok") {
            console.log(resposta)
            if (resposta.admin == '1') {
                window.location.href = "admin.html";
            } else {
                // Se for bem-sucedido, alerta o usuário e redireciona para index.html


                window.location.href = "index.html";
            }
            alert("Usuário logado com sucesso!");
        } else {
            // Se houver erro, alerta o usuário
            alert(resposta.mensagem);
        }
    } catch (error) {
        // Caso haja algum erro na rede ou na resposta
        console.error('Houve um problema com a operação de login:', error);
        alert("Ocorreu um erro ao tentar realizar o login. Por favor, tente novamente.");
    }
}
