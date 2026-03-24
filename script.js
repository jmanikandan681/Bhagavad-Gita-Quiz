const questions = [
    {
        question: "What is a central recommended means to moksha in the Gita?",
        options: [
            "Exclusive study of Vedas",
            "Devotion to God (Bhakti)",
            "Severe asceticism",
            "Ritual magic"
        ],
        answer: 1
    },
    {
        question: "Who is the speaker of Bhagavad Gita?",
        options: ["Arjuna", "Krishna", "Vyasa", "Brahma"],
        answer: 2
    }
];
console.log(questions.length); 
let currentQ = 0;
let score = 0;
let answered = false;
let timeLeft = 5;
let timer;

const timerEl = document.getElementById("timer");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreDisplay = document.getElementById("scoreDisplay");
const nextBtn = document.getElementById("nextBtn");

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const bgMusic = document.getElementById("bgMusic");

function startMusic() {
    bgMusic.volume = 0.3;

    const playPromise = bgMusic.play();

    if (playPromise !== undefined) {
        playPromise.catch(() => {
            console.log("Autoplay blocked");
        });
    }
}
document.addEventListener("click", startMusic, { once: true });
document.addEventListener("touchstart", startMusic, { once: true });

function startTimer() {
    console.log("Timer started");
    timeLeft = 5;
    timerEl.innerText = "Time: " + timeLeft;

    clearInterval(timer); // 🔥 important safety

    timer = setInterval(() => {
        timeLeft--;
        console.log("Tick", timeLeft);
        timerEl.innerText = "Time: " + timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            autoNext();
        }
    }, 1000);
}

function loadQuestion() {
    answered = false;

    const q = questions[currentQ];
    questionEl.innerText = `Q${currentQ + 1}. ${q.question}`;
    scoreDisplay.innerText = `Score: ${score}/${questions.length}`;
    optionsEl.innerHTML = "";

    q.options.forEach((opt, index) => {
        const div = document.createElement("div");
        div.classList.add("option");
        div.innerText = opt;

        div.onclick = () => selectAnswer(div, index);
        optionsEl.appendChild(div);
    });
    startTimer();
}

function selectAnswer(selected, index) {
    clearInterval(timer);
    if (answered) return;
    answered = true;

    const correctIndex = questions[currentQ].answer;
    const allOptions = document.querySelectorAll(".option");

    allOptions.forEach((opt, i) => {
        if (i === correctIndex) opt.classList.add("correct");
    });

    if (index === correctIndex) {
        correctSound.play();
        score++;
        scoreDisplay.innerText = `Score: ${score}/${questions.length}`;
    } else {
        selected.classList.add("wrong");
        wrongSound.play();
    }
}

nextBtn.onclick = () => {
    if (!answered) {
        alert("Please select an answer first");
        return;
    }

    currentQ++;

    if (currentQ < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
};

function showResult() {
    document.getElementById("question-box").classList.add("hidden");
    document.getElementById("result-box").classList.remove("hidden");

    const total = questions.length;
    document.getElementById("score").innerText = `${score} / ${total}`;

    let msg = "";
    if (score === total) msg = "Excellent! 🎉";
    else if (score >= total / 2) msg = "Good Job 👍";
    else msg = "Try Again 🙏";

    document.getElementById("message").innerText = msg;

    // OPTIONAL AUTO REDIRECT (uncomment if needed)
    /*
    setTimeout(() => {
        window.location.href = "https://your-link.com";
    }, 5000);
    */
    document.querySelector(".cta-box").scrollIntoView({ behavior: "smooth" });
}

function autoNext() {
    if (answered) return; // ✅ prevent double run

    answered = true;

    // disable Next button temporarily
    nextBtn.disabled = true;

    setTimeout(() => {
        currentQ++;

        if (currentQ < questions.length) {
            nextBtn.disabled = false; // enable again
            loadQuestion();
        } else {
            showResult();
        }
    }, 500);
}

function redirect() {
    bgMusic.pause();
    bgMusic.currentTime = 0;

    window.location.href = "https://forms.gle/VUWrNBBZWtuPRqj69";
}

document.getElementById("startBtn").onclick = () => {
    startMusic();

    document.getElementById("startBtn").style.display = "none";
    document.getElementById("question-box").classList.remove("hidden");

    loadQuestion();
};    ;
