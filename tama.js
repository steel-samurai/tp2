// Variáveis do jogo
let fala = '';
let felicidade = 100;
let fome = 0;
let nomeJogador = "Jogador";
let nivelJogador = 1;
let roupas = "imgs/pet1.png"; 

const telaInicial = document.getElementById("tela-inicial");
const botaoInicial = document.getElementById("botao-inicial");
const containerJogo = document.getElementById("game");
const nomeJogadorEl = document.getElementById("nome-jogador");
const nomeJogadorDisplay = document.getElementById("nomeJogadorDisplay");
const nivelJogadorDisplay = document.getElementById("nivelJogadorDisplay");
const roupaPet = document.getElementById("roupaPet");
const felicidadeDisplay = document.getElementById("felicidade");
const fomeDisplay = document.getElementById("fome");
const nivelDisplay = document.getElementById("level");
const textBox = document.getElementById("textBox");
const btnAlimentar = document.getElementById("btnAlimentar");
const btnCarinho = document.getElementById("btnCarinho");
const btnBanhar = document.getElementById("btnBanhar");
const btnFalar = document.getElementById("btnFalar");
const roupasSelect = document.getElementById("roupasSelect");
const btnVestir = document.getElementById("btnVestir");
const btnDownload = document.getElementById("btnDownload");
const btnSalvar = document.getElementById("btnSalvar");
const btnCarregar = document.getElementById("btnCarregar");
const btnInfo = document.getElementById('btnInfo');
const menu = document.getElementById('menu');

btnAlimentar.addEventListener("click", alimentarPet);
btnCarinho.addEventListener("click", afofarPet);
btnBanhar.addEventListener("click", escovarPet);
btnFalar.addEventListener("click", fofocarPet);
btnVestir.addEventListener("click", mudarRoupa);
btnSalvar.addEventListener("click", salvarJogo);
btnCarregar.addEventListener("click", carregarJogo);
btnDownload.addEventListener("click", downloadRoupa);

//abrir e fechar menu
btnInfo.addEventListener('click', () => {
    menu.style.left = '0';
});

function fecharMenu() {
    menu.style.left = '-250px';
}

//atualizacoes
function atualizarPet() {
    roupaPet.src = roupas;
    felicidade = Math.min(100, felicidade);
    fome = Math.max(0, fome);

    felicidadeDisplay.textContent = felicidade;
    fomeDisplay.textContent = fome;
    nivelDisplay.textContent = nivelJogador;
    roupasSelect.value = roupas;
    nivelJogadorDisplay.textContent = nivelJogador;

    if (felicidade <= 0 || fome >= 100) {
        gameOver();
    }
}

function gameOver() {
    mostrarTexto('Seu pet morreu. Game over!', 50);
    roupaPet.src = "pet4.png"
    felicidadeDisplay.textContent = 'XX';
    fomeDisplay.textContent = 'XX';
    nivelDisplay.textContent = 'XX';
}

//local storage

function mudarRoupa() {
    roupas = roupasSelect.value;
    atualizarPet();
    fala = 'Estou de roupa nova!';
    mostrarTexto(fala, 50);
    localStorage.setItem("roupaJogador", roupas);
}

function downloadRoupa() {
    const a = document.createElement("a");
    a.href = roupaPet.src;
    a.download = "pet_imagem.png";
    a.click();
}

function salvarJogo() {
    localStorage.setItem("nomeJogador", nomeJogadorEl.value);
    localStorage.setItem("nivelJogador", nivelJogador);
    localStorage.setItem("roupaJogador", roupas);
}

function carregarJogo() {
    const saveNomeJogador = localStorage.getItem("nomeJogador");
    const saveNivelJogador = localStorage.getItem("nivelJogador");
    const saveRoupaJogador = localStorage.getItem("roupaJogador");

    if (saveNomeJogador) {
        nomeJogador = saveNomeJogador;
    }
    if (saveNivelJogador) {
        nivelJogador = parseInt(saveNivelJogador);
    }
    if (saveRoupaJogador) {
        roupas = saveRoupaJogador;
    }

    nomeJogadorEl.value = nomeJogador;
    nivelJogadorDisplay.textContent = nivelJogador;
    atualizarPet();
}

const saveRoupas = localStorage.getItem("roupaJogador");
if (saveRoupas) {
    roupas = saveRoupas;
}

//funcoes do pet

function alimentarPet() {
    if (fome > 0) {
        fome -= 10;
        felicidade += 5;
        atualizarPet();
        fala = 'Obrigado por me alimentar!';
        mostrarTexto(fala, 50);
    }
    else {
        fala = 'Não estou com fome :(';
        mostrarTexto(fala, 50);

    }
}

function afofarPet() {
    felicidade += 10;
    atualizarPet();
    fala = ';3';
    falarTexto('hehe');
    mostrarTexto(fala, 50);
}

function escovarPet() {
    felicidade += 5;
    atualizarPet();
    fala = 'Estou limpo!';
    mostrarTexto(fala, 50);
}

function fofocarPet() {
    felicidade += 5;
    atualizarPet();
    fala = 'Tudo bem? Comigo tá tudo certo';
    mostrarTexto(fala, 50);
}

//falar e mostrar texto

function mostrarTexto(texto, velocidade) {
    const textBox = document.getElementById('text-box');
    textBox.innerHTML = '';
    textBox.style.display = 'block';
    let index = 0;
    function proxCaractere() {
        if (index < texto.length) {
            textBox.innerHTML += texto.charAt(index);
            index++;
            setTimeout(proxCaractere, velocidade);
        }
    }
    proxCaractere();
    falarTexto(texto);
}

function falarTexto(frase) {
    var sinteseDeVoz = window.speechSynthesis;
    var vozes = sinteseDeVoz.getVoices();
    var vozEscolhida = vozes[1];
    var enunciado = new SpeechSynthesisUtterance(frase);
    enunciado.voice = vozEscolhida;
    enunciado.volume = 1;
    enunciado.rate = 3;
    enunciado.pitch = 2;
    sinteseDeVoz.speak(enunciado);
}

const roteiro = [
    'Oi!',
    'Como você tá?',
    '...'
];

let indexAtual = 0;
function mostrarProxFala() {
    fala = roteiro[indexAtual % roteiro.length];
    mostrarTexto(fala, 50);
    indexAtual++;
}

// p começar o jogo

botaoInicial.addEventListener("click", () => {
    const playerData = {
        name: nomeJogadorEl.value, // AAAAAA ISSO NAO FUNCIONA
        level: 1, 
    };
    nomeJogadorDisplay.textContent = playerData.name;
    nivelJogadorDisplay.textContent = playerData.level;
    telaInicial.style.display = "none";
    containerJogo.style.display = "block";
    setInterval(() => {
        felicidade -= 10;
        fome += 10;
        atualizarPet();
    }, 10000);
    setInterval(() => {
        if (felicidade >= 75) {
            nivelJogador++;
            atualizarPet();
        }
    }, 50000);
    atualizarPet();

});

//selector de opcoes
const botoes = document.querySelectorAll("button");
let indexBotaoSelecionado = 0;

function atualizaBotaoAtual() {
    botoes.forEach((button, index) => {
        if (index === indexBotaoSelecionado) {
            if (!button.textContent.startsWith('>'))
                button.textContent = "> " + button.textContent;
        } 
        else {
            button.textContent = button.textContent.replace("> ", "");
        }
    });
}

atualizaBotaoAtual();

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && indexBotaoSelecionado > 0) {
        indexBotaoSelecionado--;
    }
    else if (event.key === "ArrowDown" && indexBotaoSelecionado < botoes.length - 1) {
        indexBotaoSelecionado++;
    }
    else if (event.key === "Enter") {
        botoes[indexBotaoSelecionado].click();
    }

    atualizaBotaoAtual();
});

//geolocalizacao

document.addEventListener('DOMContentLoaded', function () {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            acharLocalizacao(lat, lon);
        }, function (error) {
            console.error("Erro ao obter a localização:", error);
        });
    } else {
        console.error("A API Geolocation não é suportada neste navegador.");
    }
});

function acharLocalizacao(latitude, longitude) {
    const apiKey = "cc41ec5a93c00f9ee79c7f260f70c3b6";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let temp = 'um clima ok'
            if (data.main.temp > 25) { temp = 'calor' }
            else if (data.main.temp > 30) { temp = 'um calor dos infernos' }
            else { temp = 'um friozinho bom' }
            let frase = 'Está fazendo ' + temp + ' em ' + data.name + ', né?'
            roteiro.push(frase);
            console.log(roteiro);
        })
        .catch(error => {
            console.error("Erro ao obter a previsão do tempo:", error);
        });
}

//cheet . js :)

cheet('o i', function () {
    mostrarTexto('Oii ;3', 50);
});

cheet('t o space b e m', function () {
    mostrarTexto('Que bom! Fico feliz em saber!', 50);
});

cheet('q u e c a l o r', function () {
    mostrarTexto('Está calor mesmo!', 50);
});
