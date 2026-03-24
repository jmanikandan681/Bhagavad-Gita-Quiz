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
        answer: 1
    }
];

let currentQ = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
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

function loadQuestion() {
    answered = false;

    const q = questions[currentQ];
    questionEl.innerText = `Q${currentQ + 1}. ${q.question}`;
    optionsEl.innerHTML = "";

    q.options.forEach((opt, index) => {
        const div = document.createElement("div");
        div.classList.add("option");
        div.innerText = opt;

        div.onclick = () => selectAnswer(div, index);
        optionsEl.appendChild(div);
    });
}

function selectAnswer(selected, index) {
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
}

function redirect() {
    window.location.href = "https://your-link.com";
}

document.getElementById("startBtn").onclick = () => {
    startMusic();
    loadQuestion();
    document.getElementById("startBtn").style.display = "none";
};
