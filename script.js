const charadasLogicas = [
    {q: "Se 3 gatos pegam 3 ratos em 3 minutos, quantos minutos 100 gatos levam para pegar 100 ratos?", a: "3"},
    {q: "O caracol sobe 3m de dia e desce 2m de noite. O poço tem 10m. Em qual dia ele sai?", a: "8"},
    {q: "Quanto é a metade de 2 mais 2?", a: "3"},
    {q: "Quantos meses têm 28 dias?", a: "12"},
    {q: "Se você tem 3 maçãs e tira 2, com quantas você fica?", a: "2"},
    {q: "Um número multiplicado por 5 resulta em 45. Que número é esse?", a: "9"},
    {q: "Quanto é 10 menos 10 dividido por 10?", a: "9"},
    {q: "Um fazendeiro tem 17 vacas e todas morrem menos 9. Quantas ficam vivas?", a: "9"},
    {q: "Quanto é a terça parte de 6 mais 2?", a: "4"},
    {q: "Quanto é 9 com 9?", a: "99"},
    {q: "Quanto é 6 vezes 7?", a: "42"},
    {q: "Quanto é 81 dividido por 9?", a: "9"},
    {q: "Quanto é 64 dividido por 8?", a: "8"}
];

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
    const btnUnlock = document.getElementById('btn-unlock');
    btnUnlock.onclick = () => {
        iniciarFluxoAcessibilidade();
    };
};

function iniciarFluxoAcessibilidade() {
    const container = document.getElementById('setup-container');
    container.innerHTML = '<p class="game-title-mini">Ouvindo o Tux...</p>';
    
    const boasVindas = "Seja bem vindo ao Gênio Matemático, eu sou Tux, seu assistente de acessibilidade!, você poderá alterar o tamanho da fonte, o contraste e usar audiodescrição. Marque as opções para ajustar seu nível de acessibilidade e bom jogo!";
    
    tuxDiz(boasVindas, () => passoFonte());
}

function passoFonte() {
    const container = document.getElementById('setup-container');
    container.innerHTML = `
        <p class="game-title-mini">Tamanho da fonte:</p>
        <button class="postit-button" id="f1">1. NORMAL</button>
        <button class="postit-button" id="f2" style="font-size: 1.8rem;">2. GRANDE</button>
    `;
    tuxDiz("Escolha o tamanho da fonte: 1 normal ou 2 grande.");
    
    const selecionar = (v) => {
        if(v === 2) { configAcess.fonteGrande = true; document.body.classList.add('font-grande'); }
        window.onkeydown = null; passoContraste();
    };
    document.getElementById('f1').onclick = () => selecionar(1);
    document.getElementById('f2').onclick = () => selecionar(2);
    window.onkeydown = (e) => { if(e.key==='1') selecionar(1); if(e.key==='2') selecionar(2); };
}

function passoContraste() {
    const container = document.getElementById('setup-container');
    container.innerHTML = `
        <p class="game-title-mini">Cores:</p>
        <button class="postit-button" id="c1">1. PADRÃO</button>
        <button class="postit-button" id="c2" style="background:#000; color:#fff;">2. ALTO CONTRASTE</button>
    `;
    tuxDiz("Escolha as cores: 1 padrão ou 2 alto contraste.");
    
    const selecionar = (v) => {
        if(v === 2) { configAcess.altoContraste = true; document.body.classList.add('high-contrast'); }
        window.onkeydown = null; passoNarrador();
    };
    document.getElementById('c1').onclick = () => selecionar(1);
    document.getElementById('c2').onclick = () => selecionar(2);
    window.onkeydown = (e) => { if(e.key==='1') selecionar(1); if(e.key==='2') selecionar(2); };
}

function passoNarrador() {
    const container = document.getElementById('setup-container');
    container.innerHTML = `
        <p class="game-title-mini">Ativar Narrador?</p>
        <button class="postit-button" id="n1">1. SIM</button>
        <button class="postit-button" id="n2">2. NÃO</button>
    `;
    tuxDiz("Deseja ativar o narrador para as perguntas? 1 sim ou 2 não.");
    
    const selecionar = (v) => {
        configAcess.narracao = (v === 1);
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
    score = 0; lives = 5; 
    filaCharadas = [...charadasLogicas];
    updateUI(); nextQuestion();
}

function nextQuestion() {
    const isHard = Math.random() > 0.6 && filaCharadas.length > 0;
    let qObj;

    if (isHard) {
        const idx = Math.floor(Math.random() * filaCharadas.length);
        qObj = filaCharadas.splice(idx, 1)[0];
        totalTime = 180; document.getElementById('badge').innerText = "CHARADA - 3 MIN";
    } else {
        let n1 = Math.floor(Math.random() * 20) + 2, n2 = Math.floor(Math.random() * 9) + 2;
        let res = n1 + n2;
        qObj = { q: `Quanto é ${n1} + ${n2}?`, a: res.toString() };
        totalTime = 60; document.getElementById('badge').innerText = "CÁLCULO - 1 MIN";
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
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
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
            updateUI(); playSound(600, 0.1);
            if(configAcess.narracao) tuxDiz("Correto", () => setTimeout(nextQuestion, 500));
            else setTimeout(nextQuestion, 500);
        } else {
            handleError();
        }
    }
}

function handleError() {
    clearInterval(timer);
    lives--;
    updateUI(); playSound(150, 0.3);
    if(configAcess.narracao) {
        tuxDiz(`Errado! Você tem ${lives} vidas.`, () => {
            if (lives <= 0) endGame(); else nextQuestion();
        });
    } else {
        if (lives <= 0) setTimeout(endGame, 600); else setTimeout(nextQuestion, 600);
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
        img.style.width = '30px'; img.style.marginRight = '5px';
        display.appendChild(img);
    }
}

function startCountdown() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        timeLeft -= 0.1;
        document.getElementById('timer-bar').style.width = (timeLeft / totalTime * 100) + "%";
        if (timeLeft <= 0) handleError();
    }, 100);
}

function endGame() {
    clearInterval(timer);
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('game-over-screen').classList.remove('hidden');
    document.getElementById('final-score').innerText = score;
    setTimeout(() => location.reload(), 6000);
}

function playSound(freq, dur) {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.connect(g); g.connect(ctx.destination);
    osc.frequency.value = freq; osc.start();
    g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + dur);
    osc.stop(ctx.currentTime + dur);
}

function loadHighScore() {
    const high = localStorage.getItem('math_record');
    if (high) {
        document.getElementById('ranking-container').classList.remove('hidden');
        document.getElementById('high-score-val').innerText = high;
    }
}