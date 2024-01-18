let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function mostrarTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMsgInicial() {
    mostrarTextoNaTela('h1', 'Jogo do número secreto');
    mostrarTextoNaTela ('p', 'Escolha um número entre 1 e 10');
}

exibirMsgInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        mostrarTextoNaTela('h1', 'Parabéns, você acertou!');
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        let msgTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativas}!`;
        mostrarTextoNaTela('p', msgTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            mostrarTextoNaTela('p', 'O número secreto é menor que o número informado...');
        } else {
            mostrarTextoNaTela('p', 'O número secreto é maior que o número informado...')
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMsgInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}