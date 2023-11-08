document.addEventListener("DOMContentLoaded", function() {

    // No seu arquivo JavaScript relacionado a index.html
    document.getElementById('pesquisa').addEventListener('keypress', function(event) {
        if(event.key === 'Enter') {
            const query = event.target.value;
            window.location.href = `produtos.html?query=${query}`;
        }
    });

    
    let count = 1;
    document.getElementById("radio1").checked = true;

    setInterval(function() {
        nextImage();
    }, 4000)

    function nextImage() {
        count++;
        if (count > 3) {
            count = 1;
        }
    
        let radioElement = document.getElementById("radio" + count);
        
        if (radioElement) {
            radioElement.checked = true;
        }
    }

    
    


    var dados= [
        {nome: "Resistol Serenata", id: "resistol-serenata"},
        {nome: "Bailey Western Royal Rambler", id: "Bailey Western Royal Rambler"},
        {nome: "Resistol Genteel Gambler", id: "Resistol Genteel Gambler"},
        {nome: "Justin Boots Dapper Duke", id:"Justin Boots Dapper Duke"}
        ];
    
    var img = [
        {foto: "chapeufem2.jpg"},
        {foto: "chapeumasc8.jpg"},
        {foto: "chapeumasc6.jpg"},
        {foto: "chapeuchic3.jpg"}
        ];


    for (var i= 0; i<dados.length; i++){
            var conteudo=
            `<div class="chapeus">
            <a href="produtos.html#${dados[i].id}"><img src="imagens/${img[i].foto}" alt="Imagem do Produto"></a>
            <a href="produtos.html#${dados[i].id}" class="chapeu-nome">${dados[i].nome}</a>
            </div>`;
    
    document.getElementById('chapeus').innerHTML  += conteudo;
    }


    // funcao para reajustar o tamanho da imagem masculina e feminia sem perder a responsividade
    window.addEventListener('resize', adjustHeight);

    function adjustHeight() {
        const femImage = document.querySelector('.imagem-fem');
        const mascContainer = document.querySelector('.imagem-mascbot');

        const femHeight = femImage.offsetHeight;
        mascContainer.style.height = `${femHeight}px`;
    }

    adjustHeight();

    
});







