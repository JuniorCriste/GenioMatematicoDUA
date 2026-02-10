const charadasLogicasOriginal = [
    {q: "Se 3 gatos pegam 3 ratos em 3 minutos, quantos minutos 100 gatos levam para pegar 100 ratos?", a: "3"},
    {q: "O caracol sobe 3m de dia e desce 2m de noite. O poço tem 10m. Em qual dia ele sai?", a: "8"},
    {q: "Quanto é a metade de 2 mais 2?", a: "3"},
    {q: "Em uma gaveta há 10 meias pretas e 10 brancas. Quantas tirar para ter certeza de um par igual?", a: "3"},
    {q: "Se você tem 3 maçãs e tira 2, com quantas você fica?", a: "2"},
    {q: "Quantos meses têm 28 dias?", a: "12"},
    {q: "Um avô, dois pais e dois filhos foram pescar. Cada um pescou um peixe. Quantos peixes trouxeram?", a: "3"},
    {q: "Se hoje é quarta, que número representa o dia de ontem? (1-Dom a 7-Sab)", a: "3"},
    {q: "Tenho 40 chicletes. Dei 10 para João e metade do resto para Maria. Com quantos fiquei?", a: "15"},
    {q: "Um número multiplicado por 5 resulta em 45. Que número é esse?", a: "9"},
    {q: "Quantos lados tem um heptágono?", a: "7"},
    {q: "Tenho 5 irmãos e cada irmão tem uma irmã. Quantos filhos são ao todo?", a: "6"},
    {q: "Quantas vezes você pode subtrair 1 de 10?", a: "1"},
    {q: "Quantos números inteiros existem entre 1 e 10?", a: "8"},
    {q: "Qual é o próximo número da sequência: 1, 1, 2, 3, 5, 8?", a: "13"},
    {q: "Quanto é 10 menos 10 dividido por 10?", a: "9"},
    {q: "Quantos lados têm dois quadrados?", a: "8"},
    {q: "Se 5 máquinas fazem 5 peças em 5 minutos, quanto tempo 100 máquinas levam para fazer 100 peças?", a: "5"},
    {q: "Quantos ovos você pode comer em jejum?", a: "1"},
    {q: "Um fazendeiro tem 17 vacas e todas morrem menos 9. Quantas ficam vivas?", a: "9"},
    {q: "Quanto é a terça parte de 6 mais 2?", a: "4"},
    {q: "Quantos anos têm uma década e meia?", a: "15"},
    {q: "Se hoje é domingo, que número representa amanhã? (1-Dom a 7-Sáb)", a: "2"},
    {q: "Quanto é 3 elevado ao quadrado?", a: "9"},
    {q: "Quantas letras tem a palavra FEVEREIRO?", a: "9"},
    {q: "Quantos dias há em 3 semanas?", a: "21"},
    {q: "Qual o menor número inteiro positivo?", a: "1"},
    {q: "Se um triângulo tem 3 lados, quantos lados têm 4 triângulos?", a: "12"},
    {q: "Quantas letras tem o alfabeto português?", a: "26"},
    {q: "Quanto é o triplo de 7?", a: "21"},
    {q: "Quantos meses têm 30 dias?", a: "11"},
    {q: "Quanto é 9 com 9?", a: "99"},
    {q: "Quantos dias há em um ano não bissexto?", a: "365"},
    {q: "Quanto é 6 vezes 7?", a: "42"},
    {q: "Quantas horas há em um dia?", a: "24"},
    {q: "Quantos lados tem um hexágono?", a: "6"},
    {q: "Quantos zeros tem o número mil?", a: "3"},
    {q: "Se um carro tem 4 rodas, quantas rodas têm 3 carros?", a: "12"},
    {q: "Quantos minutos há em um quarto de hora?", a: "15"},
    {q: "Quanto é 8 ao cubo?", a: "512"},
    {q: "Quantas semanas completas há em 28 dias?", a: "4"},
    {q: "Quantos lados tem um pentágono?", a: "5"},
    {q: "Quanto é 100 menos 25?", a: "75"},
    {q: "Quantos meses há em 2 anos?", a: "24"},
    {q: "Se você tem 12 balas e come 5, quantas sobram?", a: "7"},
    {q: "Quanto é 7 vezes 8?", a: "56"},
    {q: "Quantos números pares existem entre 1 e 10?", a: "4"},
    {q: "Quantas horas há em uma semana?", a: "168"},
    {q: "Quantos lados tem um octógono?", a: "8"},
    {q: "Quanto é 11 ao quadrado?", a: "121"},
    {q: "Quantos dias há em fevereiro em um ano comum?", a: "28"},
    {q: "Se você tem 6 pares de sapatos, quantos sapatos tem?", a: "12"},
    {q: "Quanto é o triplo de 12?", a: "36"},
    {q: "Quanto é 14 vezes 2?", a: "28"},
    {q: "Quantos meses têm 31 dias?", a: "7"},
    {q: "Quanto é 5 ao quadrado?", a: "25"},
    {q: "Quanto é 81 dividido por 9?", a: "9"},
    {q: "Quantos lados tem um triângulo?", a: "3"},
    {q: "Quanto é a metade de 18?", a: "9"},
    {q: "Quanto é 2 elevado à quinta potência?", a: "32"},
    {q: "Quantos dias há em 5 semanas?", a: "35"},
    {q: "Quanto é 64 dividido por 8?", a: "8"}
];

let filaCharadas = [];
let score = 0;
let lives = 5;
let currentAnswer = "";
let timer = null;
let timeLeft = 0;
let totalTime = 0;

window.onload = () => {
    loadHighScore();
    let loadPercent = 0;
    const loadBar = document.getElementById('load-progress');
    
    const loading = setInterval(() => {
        loadPercent += 2;
        if (loadBar) loadBar.style.width = loadPercent + "%";
        
        if (loadPercent >= 100) {
            clearInterval(loading);
            startGame();
        }
    }, 50);
};

function loadHighScore() {
    const high = localStorage.getItem('math_record');
    const photo = localStorage.getItem('winner_photo');
    if (high) {
        document.getElementById('ranking-container').classList.remove('hidden');
        document.getElementById('high-score-val').innerText = high;
        if (photo) {
            document.getElementById('photo-winner').innerHTML = `<img src="${photo}">`;
        }
    }
}

function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    score = 0;
    lives = 5;
    filaCharadas = [...charadasLogicasOriginal];
    updateUI();
    nextQuestion();
}

function nextQuestion() {
    const isHard = Math.random() > 0.6;
    let qObj;

    if (filaCharadas.length === 0) filaCharadas = [...charadasLogicasOriginal];

    if (isHard && filaCharadas.length > 0) {
        const index = Math.floor(Math.random() * filaCharadas.length);
        qObj = filaCharadas.splice(index, 1)[0];
        totalTime = 180; 
        document.getElementById('badge').innerText = "CHARADA - 3 MIN";
    } else {
        // Lógica para garantir que o resultado matemático NÃO contenha o número 0
        let n1, n2, op, res, resStr;
        do {
            n1 = Math.floor(Math.random() * 40) + 2;
            n2 = Math.floor(Math.random() * 9) + 2;
            op = Math.random() > 0.5 ? '+' : '*';
            res = (op === '+') ? (n1 + n2) : (n1 * n2);
            resStr = res.toString();
        } while (resStr.includes('0'));

        qObj = { q: `Quanto é ${n1} ${op === '*' ? '×' : '+'} ${n2}?`, a: resStr };
        totalTime = 60; 
        document.getElementById('badge').innerText = "CÁLCULO - 1 MIN";
    }

    currentAnswer = qObj.a;
    document.getElementById('question').innerText = qObj.q;
    timeLeft = totalTime;
    createInputs(currentAnswer.length);
    startCountdown();
}

function createInputs(len) {
    const container = document.getElementById('inputs-container');
    container.innerHTML = '';
    for (let i = 0; i < len; i++) {
        const input = document.createElement('input');
        input.type = 'tel';
        input.className = 'digit-input';
        input.maxLength = 1;
        input.addEventListener('input', (e) => {
            // Remove qualquer coisa que não seja número E remove o número 0
            e.target.value = e.target.value.replace(/[^1-9]/g, '');
            if (e.target.value && e.target.nextElementSibling) {
                e.target.nextElementSibling.focus();
            }
            checkAttempt();
        });
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !e.target.value && e.target.previousElementSibling) {
                e.target.previousElementSibling.focus();
            }
        });
        container.appendChild(input);
    }
    if (container.firstChild) container.firstChild.focus();
}

function startCountdown() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        timeLeft -= 0.1;
        const progressBar = document.getElementById('timer-bar');
        if (progressBar) progressBar.style.width = (timeLeft / totalTime * 100) + "%";
        
        if (timeLeft <= 0) {
            handleError();
        }
    }, 100);
}

function checkAttempt() {
    const inputs = document.querySelectorAll('.digit-input');
    const val = Array.from(inputs).map(i => i.value).join('');
    
    if (val.length === currentAnswer.length) {
        if (val === currentAnswer) {
            score += (totalTime > 60 ? 15 : 10);
            updateUI();
            playSound(600, 0.1);
            setTimeout(nextQuestion, 400);
        } else {
            handleError();
        }
    }
}

function handleError() {
    clearInterval(timer);
    lives--;
    updateUI();
    playSound(150, 0.3);
    const inputs = document.querySelectorAll('.digit-input');
    inputs.forEach(i => i.classList.add('anim-error'));
    
    setTimeout(() => {
        if (lives <= 0) {
            endGame();
        } else {
            nextQuestion();
        }
    }, 600);
}

function updateUI() {
    const livesDisplay = document.getElementById('lives-display');
    if (livesDisplay) {
        livesDisplay.innerHTML = '';
        for (let i = 0; i < lives; i++) {
            const img = document.createElement('img');
            img.src = 'img/vida.png';
            img.className = 'life-img';
            img.onerror = () => { img.alt = "❤️"; }; 
            livesDisplay.appendChild(img);
        }
    }
    const scoreEl = document.getElementById('current-score');
    if (scoreEl) scoreEl.innerText = score;
}

function endGame() {
    if (timer) clearInterval(timer);
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('game-over-screen').classList.remove('hidden');
    document.getElementById('final-score').innerText = score;

    const high = localStorage.getItem('math_record') || 0;
    if (score > parseInt(high)) {
        localStorage.setItem('math_record', score);
        document.getElementById('new-record-msg').classList.remove('hidden');
        takeSnap();
    }

    let ret = 6;
    const retTimerEl = document.getElementById('return-timer');
    const retInt = setInterval(() => {
        ret--;
        if (retTimerEl) retTimerEl.innerText = ret;
        if (ret <= 0) {
            clearInterval(retInt);
            location.reload();
        }
    }, 1000);
}

async function takeSnap() {
    const video = document.getElementById('webcam');
    const canvas = document.getElementById('canvas');
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (video) {
            video.classList.remove('hidden');
            video.srcObject = stream;
            setTimeout(() => {
                const context = canvas.getContext('2d');
                context.drawImage(video, 0, 0, 300, 225);
                const data = canvas.toDataURL('image/png');
                localStorage.setItem('winner_photo', data);
                stream.getTracks().forEach(t => t.stop());
                video.classList.add('hidden');
            }, 2000);
        }
    } catch (e) { console.warn("Câmera indisponível"); }
}

function playSound(freq, duration) {
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.connect(g); g.connect(ctx.destination);
        osc.frequency.value = freq;
        osc.start();
        g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);
        osc.stop(ctx.currentTime + duration);
    } catch (e) { }
}

const teclasPressionadas = { '1': false, '2': false, '3': false };

window.addEventListener('keydown', (event) => {
    if (event.key in teclasPressionadas) {
        teclasPressionadas[event.key] = true;
        if (teclasPressionadas['1'] && teclasPressionadas['2'] && teclasPressionadas['3']) {
            window.location.href = "https://juniorcriste.github.io/Painel-Interativo/";
        }
    }
});

window.addEventListener('keyup', (event) => {
    if (event.key in teclasPressionadas) {
        teclasPressionadas[event.key] = false;
    }
});
