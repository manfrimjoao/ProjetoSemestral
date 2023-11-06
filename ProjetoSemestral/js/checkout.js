document.addEventListener("DOMContentLoaded", function () {
    carregarProdutos();
});

async function carregarProdutos() {
    try {
        let response = await fetch("php/checkout.php", {
            method: "POST",
        });

        if (!response.ok) {
            throw new Error('Resposta da network não foi ok');
        }

        let resposta = await response.json();
        let tabela = document.getElementById('itensTabela');
        let total = 0; // Inicialização da variável para o cálculo do total

        // Limpar as linhas existentes da tabela
        while(tabela.rows.length > 0) {
            tabela.deleteRow(0);
        }

        resposta.forEach(element => {
            var newRow = tabela.insertRow();
            newRow.innerHTML = `
                <td>${element["id"]}</td>
                <td>${element["nome"]}</td>
                <td>${element["preco"]}</td>
                <td>${element["quantidade"]}</td>
                <td>${element["categoria"]}</td>
                
                <td><button onclick="excluirProduto(${element["id"]})">Excluir</button></td>
            `;

            // Calcula o total
            total += element["preco"] * element["quantidade"];
        });

        // Atualiza o elemento da página com o valor do total
        document.getElementById('totalValue').textContent = `Total: $${total.toFixed(2)}`;
    } catch (error) {
        console.error("Erro ao carregar produtos: " + error);
    }
}




async function excluirProduto(idProduto) {
    let formData = new FormData();
    formData.append('id', idProduto);

    try {
        let response = await fetch("php/excluirCarrinho.php", {
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

// ...

function mostrarOpcoesPagamento() {
    document.getElementById('opcoesPagamento').style.display = 'block'; // Mostra as opções de pagamento
    document.getElementById('botaoContinuar').style.display = 'none'; // Oculta o botão Continuar
}
function mostrarFormularioPagamento() {
    // Esconde todos os formulários antes de mostrar o novo
    document.getElementById('formularioCredito').style.display = 'none';
    document.getElementById('formularioDebito').style.display = 'none';
    document.getElementById('qrcodePix').style.display = 'none';

    const metodoPagamento = document.querySelector('input[name="metodoPagamento"]:checked').value;

    // Verifica qual método de pagamento foi escolhido e exibe o formulário apropriado
    if (metodoPagamento === "credito") {
        document.getElementById('formularioCredito').style.display = 'block';
    } else if (metodoPagamento === "debito") {
        document.getElementById('formularioDebito').style.display = 'block';
    } else if (metodoPagamento === "pix") {
        document.getElementById('qrcodePix').style.display = 'block';
        gerarQrCodePix();
    }
}
document.addEventListener("DOMContentLoaded", function () {
    carregarProdutos();
    // Adiciona os listeners para os botões de rádio
    document.getElementById('credito').addEventListener('change', mostrarFormularioPagamento);
    document.getElementById('debito').addEventListener('change', mostrarFormularioPagamento);
    document.getElementById('pix').addEventListener('change', mostrarFormularioPagamento);
});

function finalizarCompra(metodo) {
    let camposValidos = true;

    // Seleciona os campos baseados no método de pagamento
    let campos = metodo === 'credito' ? 
        document.querySelectorAll('#formularioCredito input') :
        metodo === 'debito' ? 
            document.querySelectorAll('#formularioDebito input') :
            null;

    // Verifica se todos os campos foram preenchidos e têm a quantidade correta de caracteres
    if (campos) {
        campos.forEach(campo => {
            if (!campo.checkValidity()) {
                console.error(`O campo ${campo.name} está inválido ou incompleto.`);
                camposValidos = false;
                campo.style.border = '2px solid red'; // destaca o campo inválido
            } else {
                campo.style.border = ''; // remove a marcação se o campo estiver válido
            }
        });
    }

    // Se todos os campos estiverem válidos e o método for PIX, verifica se o QR Code foi gerado
    if (metodo === 'pix') {
        let qrcodePix = document.getElementById('qrcodePix').innerHTML;
        if (!qrcodePix.trim()) {
            console.error('O QR Code do PIX ainda não foi gerado.');
            camposValidos = false;
        }
    }

    // Se todos os campos estiverem válidos, exibe o alerta e redireciona para a página inicial
    if (camposValidos) {
        esvaziarCarrinho().then((carrinhoEsvaziado) => {
            if (carrinhoEsvaziado) {
                alert('Compra concluída com sucesso');
                window.location.href = 'index.html';
            }
        });
    }
}


function gerarQrCodePix() {
    // Simula a obtenção de um QR Code de um serviço
    const qrcodePlaceholder = 'imagens/qrcode-pix.png'; // Substitua com o caminho para o QR Code gerado
    document.getElementById('qrcodePix').innerHTML = `
        <h3>Pagamento via PIX</h3>
        <img src="${qrcodePlaceholder}" alt="QR Code PIX">
        <p>Escaneie o QR Code com o aplicativo do seu banco para realizar o pagamento.</p>
        <button type="button" onclick="finalizarCompra('pix')">Finalizar Compra</button>
    `;
}

// Certifique-se de que todas as outras partes do seu script estão corretas e não estão interferindo no comportamento esperado.

function calcularTotal() {
    let itens = document.querySelectorAll('#itensTabela tr');
    let total = 0;

    itens.forEach(item => {
        let preco = parseFloat(item.cells[2].textContent); // Assumindo que o preço está na terceira célula
        let quantidade = parseInt(item.cells[3].textContent); // Assumindo que a quantidade está na quarta célula
        total += preco * quantidade;
    });

    document.getElementById('precoTotal').textContent = `$${total.toFixed(2)}`; // Formata para 2 casas decimais
}

async function esvaziarCarrinho() {
    try {
      let response = await fetch('php/esvaziarCarrinho.php', {
        method: 'POST'
      });
  
      if (!response.ok) {
        throw new Error('Não foi possível esvaziar o carrinho.');
      }
  
      let resultado = await response.json();
  
      if (resultado.status === 'ok') {
        return true;
      } else {
        alert(resultado.mensagem);
        return false;
      }
    } catch (error) {
      console.error('Erro ao esvaziar o carrinho: ', error);
      alert('Ocorreu um erro ao esvaziar o carrinho. Por favor, tente novamente.');
      return false;
    }
  }


