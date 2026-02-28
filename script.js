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
    {q: "Se eu ganho R$ 37,00 por dia trabalhado e trabalho 3 dias por semana, quanto recebi no último mês?", a: "296"},
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

// VARIÁVEIS GLOBAIS
let configAcess = { fonteGrande: false, altoContraste: false, narracao: false };
let score = 0, lives = 5, currentAnswer = "", timer = null, timeLeft = 0, totalTime = 0, filaCharadas = [];

function tuxDiz(texto, callback) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    if (callback) utterance.onend = callback;
    window.speechSynthesis.speak(utterance);
}

window.onload = () => {
    loadHighScore();
    iniciarBoasVindasTux();
};

function iniciarBoasVindasTux() {
    const container = document.getElementById('setup-container');
    const msgBoasVindas = "Seja bem vindo ao Gênio Matemático, eu sou Tux, seu assistente de acessibilidade!, você poderá alterar o tamanho da fonte, o contraste e usar audiodescrição. Marque as opções para ajustar seu nível de acessibilidade e bom jogo!";
    
    // Narra as boas vindas e SÓ DEPOIS inicia as perguntas de setup
    tuxDiz(msgBoasVindas, () => {
        passoFonte();
    });
}

function passoFonte() {
    const container = document.getElementById('setup-container');
    container.innerHTML = `
        <p class="game-title-mini">Você prefere a fonte em tamanho:</p>
        <button class="postit-button" id="f1">1 . NORMAL</button>
        <button class="postit-button" id="f2" style="font-size: 2rem;">2. GRANDE</button>
    `;
    tuxDiz("Você prefere a fonte em tamanho: 1 normal ou 2 grande?");
    
    const selecionar = (val) => {
        if(val === 2) { configAcess.fonteGrande = true; document.body.classList.add('font-grande'); }
        window.onkeydown = null; passoContraste();
    };
    document.getElementById('f1').onclick = () => selecionar(1);
    document.getElementById('f2').onclick = () => selecionar(2);
    window.onkeydown = (e) => { if(e.key==='1') selecionar(1); if(e.key==='2') selecionar(2); };
}

function passoContraste() {
    const container = document.getElementById('setup-container');
    container.innerHTML = `
        <p class="game-title-mini">Você prefere as cores:</p>
        <button class="postit-button" id="c1">1. ORIGINAIS DO JOGO</button>
        <button class="postit-button" id="c2" style="background:#000; color:#fff; border:2px solid #fff">2. ALTO CONTRASTE</button>
    `;
    tuxDiz("Você prefere as cores: 1 originais do jogo ou 2 alto contraste?");
    
    const selecionar = (val) => {
        if(val === 2) { configAcess.altoContraste = true; document.body.classList.add('high-contrast'); }
        window.onkeydown = null; passoNarrador();
    };
    document.getElementById('c1').onclick = () => selecionar(1);
    document.getElementById('c2').onclick = () => selecionar(2);
    window.onkeydown = (e) => { if(e.key==='1') selecionar(1); if(e.key==='2') selecionar(2); };
}

function passoNarrador() {
    const container = document.getElementById('setup-container');
    container.innerHTML = `
        <p class="game-title-mini">Você deseja utilizar o narrador com audiodescrição?</p>
        <button class="postit-button" id="n1">1. SIM</button>
        <button class="postit-button" id="n2">2. NÃO</button>
    `;
    tuxDiz("Você deseja utilizar o narrador com audiodescrição? 1 sim ou 2 não?");
    
    const selecionar = (val) => {
        configAcess.narracao = (val === 1);
        window.onkeydown = null; finalizarSetup();
    };
    document.getElementById('n1').onclick = () => selecionar(1);
    document.getElementById('n2').onclick = () => selecionar(2);
    window.onkeydown = (e) => { if(e.key==='1') selecionar(1); if(e.key==='2') selecionar(2); };
}

function finalizarSetup() {
    document.getElementById('setup-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
    document.getElementById('btn-start').onclick = iniciarProcesso;
    window.onkeydown = (e) => { if(e.key === '5') iniciarProcesso(); };
}

function iniciarProcesso() {
    document.getElementById('btn-start').classList.add('hidden');
    document.getElementById('loader-section').classList.remove('hidden');
    let p = 0;
    const interval = setInterval(() => {
        p += 5; document.getElementById('load-progress').style.width = p + "%";
        if (p >= 100) { clearInterval(interval); startGame(); }
    }, 50);
}

function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    // Reinicia pontuação e vidas APENAS no início do jogo total
    score = 0; 
    lives = 5; 
    filaCharadas = [...charadasLogicasOriginal];
    updateUI(); 
    nextQuestion();
}

function nextQuestion() {
    const isHard = Math.random() > 0.6;
    let qObj;

    if (isHard && filaCharadas.length > 0) {
        const idx = Math.floor(Math.random() * filaCharadas.length);
        qObj = filaCharadas.splice(idx, 1)[0];
        totalTime = 180;
        document.getElementById('badge').innerText = "CHARADA - 3 MIN";
    } else {
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
    if(configAcess.narracao) tuxDiz(qObj.q);
    
    timeLeft = totalTime;
    createInputs(currentAnswer.length);
    startCountdown();
}

function createInputs(len) {
    const container = document.getElementById('inputs-container');
    container.innerHTML = '';
    for (let i = 0; i < len; i++) {
        const input = document.createElement('input');
        input.type = 'tel'; input.className = 'digit-input'; input.maxLength = 1;
        input.oninput = (e) => {
            e.target.value = e.target.value.replace(/[^1-9]/g, '');
            if (e.target.value && e.target.nextElementSibling) e.target.nextElementSibling.focus();
            checkAttempt();
        };
        container.appendChild(input);
    }
    container.firstChild.focus();
}

function checkAttempt() {
    const inputs = document.querySelectorAll('.digit-input');
    const val = Array.from(inputs).map(i => i.value).join('');
    if (val.length === currentAnswer.length) {
        if (val === currentAnswer) {
            score += (totalTime > 60 ? 15 : 10);
            updateUI(); 
            playSound(600, 0.1);
            if(configAcess.narracao) {
                tuxDiz("Correto", () => setTimeout(nextQuestion, 500));
            } else {
                setTimeout(nextQuestion, 500);
            }
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
    
    if(configAcess.narracao) {
        tuxDiz(`Incorreto. Você ainda tem ${lives} vidas.`, () => {
            if (lives <= 0) endGame();
            else nextQuestion();
        });
    } else {
        if (lives <= 0) setTimeout(endGame, 600);
        else setTimeout(nextQuestion, 600);
    }
}

function updateUI() {
    document.getElementById('current-score').innerText = score;
    const display = document.getElementById('lives-display');
    display.innerHTML = '';
    for (let i = 0; i < lives; i++) {
        const img = document.createElement('img');
        img.src = 'https://cdn-icons-png.flaticon.com/512/833/833472.png';
        img.className = 'life-img';
        img.style.width = '30px';
        img.style.marginRight = '5px';
        display.appendChild(img);
    }
}

function endGame() {
    clearInterval(timer);
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('game-over-screen').classList.remove('hidden');
    document.getElementById('final-score').innerText = score;

    if(configAcess.narracao) tuxDiz(`Você perdeu e sua pontuação foi ${score}`);

    const high = localStorage.getItem('math_record') || 0;
    if (score > parseInt(high)) {
        localStorage.setItem('math_record', score);
        document.getElementById('new-record-msg').classList.remove('hidden');
        if(configAcess.narracao) tuxDiz("Parabéns! você é o maior pontuador! agora faça uma pose que vamos bater uma foto sua!");
        takeSnap();
    }
    
    let countdown = 6;
    const itv = setInterval(() => {
        countdown--;
        document.getElementById('return-timer').innerText = countdown;
        if(countdown <= 0) { clearInterval(itv); location.reload(); }
    }, 1000);
}

function startCountdown() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        timeLeft -= 0.1;
        document.getElementById('timer-bar').style.width = (timeLeft / totalTime * 100) + "%";
        if (timeLeft <= 0) handleError();
    }, 100);
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

async function takeSnap() {
    const video = document.getElementById('webcam');
    const canvas = document.getElementById('canvas');
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.classList.remove('hidden'); video.srcObject = stream;
        setTimeout(() => {
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, 300, 225);
            localStorage.setItem('winner_photo', canvas.toDataURL('image/png'));
            stream.getTracks().forEach(t => t.stop());
            video.classList.add('hidden');
        }, 2000);
    } catch (e) { }
}

function loadHighScore() {
    const high = localStorage.getItem('math_record');
    const photo = localStorage.getItem('winner_photo');
    if (high) {
        document.getElementById('ranking-container').classList.remove('hidden');
        document.getElementById('high-score-val').innerText = high;
        if (photo) document.getElementById('photo-winner').innerHTML = `<img src="${photo}">`;
    }
}