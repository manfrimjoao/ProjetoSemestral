// Variável para rastrear a opção selecionada
let generoSelecionado = null;

document.addEventListener("DOMContentLoaded", async function(){

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');

    async function loadCards(query = '', genero = '') {
        // Construindo a URL com base nos parâmetros fornecidos
        let url = "php/produtos.php?";
        if (query) {
            url += `busca=${query}`;
        }
        if (genero) {
            url += (url.includes("?") ? "&" : "?") + `genero=${genero}`;
        }
    
        // Fazendo a requisição HTTP GET
        const resultado = await fetch(url, {
            method: "GET"
        });
    
        // Decodificando a resposta JSON
        const dados = await resultado.json();
        
        // Limpando o conteúdo existente no container de cartões
        document.getElementById('cards').innerHTML = '';
        document.getElementById('sem_busca').innerHTML = '';
        
        // Checando se algum resultado foi retornado
        if (dados.length === 0) {
            // Mostrar mensagem se nenhum produto foi encontrado
            document.getElementById('sem_busca').innerHTML = `<div class="sem_produto">
                                                                    <h1>Nenhum produto encontrado !</h1>
                                                                    <img src="imagens/neymar-jr-lamenta-lesao-1603917135444_v2_1080x1920.jpg" alt="Ney :(">
                                                                </div>`;
        } else {
            // Populando os cartões com os dados obtidos
            for (var i = 0; i < dados.length; i++) {
                var conteudo = `<div class="card" data-nome="${dados[i].nome}" data-genero="${dados[i].genero}">
                <div class="imagem-card">
                    <img src="${dados[i].caminho_imagem}">
                </div>
    
                <div class="nome">
                    <h2> ${dados[i].nome} </h2>
                </div>
    
                <div class="genero">
                    <p> ${dados[i].genero} </p>
                </div>
    
                <div class="preco">
                    <h2> R$${dados[i].preço} </h2>
                </div>
    
                <button class="card-botao" data-id="${dados[i].id}" onclick="adicionarAoCarrinho(${dados[i].id})">Adicionar ao Carrinho</button>
                </div>`;
                document.getElementById('cards').innerHTML += conteudo;
            }
        }
    }
    
    
    loadCards(query);

// ...

window.adicionarAoCarrinho = async function adicionarAoCarrinho(produtoId) {
    try {
        // Faz uma solicitação ao servidor para obter o user_id
        const response = await fetch('php/getUser.php', {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Erro ao obter o user_id');
        }

        const data = await response.json();

        // Agora você tem o user_id que pode ser usado para adicionar ao carrinho
        const user_id = data.user_id;

        // Dados para enviar
        let dados = {
            'produto_id': produtoId,
            'user_id': user_id
        };

        // Inicia uma requisição AJAX para comunicar com o backend
        const result = await fetch('php/carrinho.php', {
            method: 'POST',
            body: JSON.stringify(dados),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (result.ok) {
            const text = await result.text();
            alert(text);
        } else {
            throw new Error('Erro ao adicionar ao carrinho');
        }
    } catch (error) {
        console.error('Erro ao adicionar ao carrinho:', error);
    }
}

// ...

    
    

    
    

    // Event Listener para searchBar em produtos.html (se necessário)
    document.getElementById('pesquisa').addEventListener('keypress', async function(event) {
        if(event.key === 'Enter') {
            const query = event.target.value;
            loadCards(query);
        }
    });

    
    
    

    

    

    // Function to order products based on user selection
    function ordenarProdutos() {
        const selectElement = document.querySelector('.custom-select .select-label');
        const selectedOption = selectElement.textContent;
        const cardsContainer = document.getElementById('cards');
        const cards = Array.from(cardsContainer.querySelectorAll('.card'));

        cards.sort((a, b) => {
            if (selectedOption === 'Nome A-Z') {
                const nomeA = a.getAttribute('data-nome').toLowerCase();
                const nomeB = b.getAttribute('data-nome').toLowerCase();
                return nomeA.localeCompare(nomeB);
            } else if (selectedOption === 'Nome Z-A') {
                const nomeA = a.getAttribute('data-nome').toLowerCase();
                const nomeB = b.getAttribute('data-nome').toLowerCase();
                return nomeB.localeCompare(nomeA);
            } else if (selectedOption === 'Preço Crescente') {
                const precoA = parseFloat(a.querySelector('.preco h2').textContent.replace('$', ''));
                const precoB = parseFloat(b.querySelector('.preco h2').textContent.replace('$', ''));
                return precoA - precoB;
            } else if (selectedOption === 'Preço Decrescente') {
                const precoA = parseFloat(a.querySelector('.preco h2').textContent.replace('$', ''));
                const precoB = parseFloat(b.querySelector('.preco h2').textContent.replace('$', ''));
                return precoB - precoA;
            }
            return 0;
        });

        cardsContainer.innerHTML = '';

        cards.forEach(card => {
            cardsContainer.appendChild(card);
        });
    }

    const customOptions = document.querySelectorAll('.custom-select .custom-option');
    customOptions.forEach(option => {
        option.addEventListener('click', function () {
            document.querySelector('.custom-select .select-label').textContent = option.textContent;
            ordenarProdutos();
        });
    });





    


        // Adicione um ouvinte de eventos ao dropdown de seleção de gênero
    const genderSelect = document.querySelector('.select-gen');
    genderSelect.addEventListener('click', function (event) {
        const opcaoSelecionada = event.target.textContent;

        // Filtrar os produtos com base no gênero selecionado
        filtrarProdutosPorGenero(opcaoSelecionada);
    });

        // Função para obter o valor do parâmetro 'genero' da URL
        function obterGeneroDaURL() {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('genero');
        }
    
        function filtrarProdutosPorGenero(novaSelecao) {
            const customOptions = document.querySelectorAll('.custom-option-gen'); // Corrija o seletor
        
            // Remova a classe 'selecionado' de todas as opções
            customOptions.forEach(option => {
                option.classList.remove('selecionado');
            });
        
            if (novaSelecao !== generoSelecionado) {
                // Adicione a classe 'selecionado' à nova opção
                customOptions.forEach(option => {
                    if (option.textContent === novaSelecao) {
                        option.classList.add('selecionado');
                    }
                });
                generoSelecionado = novaSelecao;
            } else {
                generoSelecionado = null;
            }
        
            // Atualize o texto na interface com a opção de gênero selecionada ou "Gênero" se desselecionado
            const labelGenero = document.querySelector('.select-label-gen');
            labelGenero.textContent = generoSelecionado ? generoSelecionado : "Gênero";
        
            // Carregue os cartões novamente com o novo parâmetro de gênero
            const urlParams = new URLSearchParams(window.location.search);
            const query = urlParams.get('query');
            loadCards(query, generoSelecionado);
        }
        
    
        // Obtém o valor do parâmetro 'genero' da URL
        const generoNaURL = obterGeneroDaURL();

        // Função para aplicar o filtro de gênero
        function aplicarFiltroInicial() {
            if (generoNaURL) {
                filtrarProdutosPorGenero(generoNaURL);
            }
        }
        
            aplicarFiltroInicial();
    
        

    
        
    
    

   
    


});


