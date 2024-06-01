document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".tab");
    const quizContainer = document.getElementById("quizContainer");
    const calculatorDisplay = document.getElementById("calculatorDisplay");
    const progressBar = document.getElementById("progressBar");

    let timer;
    let questionIndex = 0;
    let totalQuestions = 0;
    let correctAnswers = 0;

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            const difficulty = this.dataset.difficulty;
            loadQuestions(difficulty);
        });
    });

    function loadQuestions(difficulty) {
        // Fetch questions based on difficulty
        fetch(`/api/questions?difficulty=${difficulty}`)
            .then(response => response.json())
            .then(questions => {
                totalQuestions = questions.length;
                displayQuestion(questions[questionIndex]);
            });
    }

    function displayQuestion(question) {
        quizContainer.innerHTML = `
            <div class="question">
                <h2>${question.text}</h2>
                ${question.options.map(option => `
                    <button class="option">${option}</button>
                `).join('')}
            </div>
        `;
        startTimer();
        const options = quizContainer.querySelectorAll(".option");
        options.forEach(option => {
            option.addEventListener("click", function () {
                stopTimer();
                if (this.textContent === question.answer) {
                    this.classList.add("correct");
                    correctAnswers++;
                } else {
                    this.classList.add("incorrect");
                }
                questionIndex++;
                updateProgressBar();
                setTimeout(() => {
                    if (questionIndex < totalQuestions) {
                        displayQuestion(questions[questionIndex]);
                    } else {
                        alert("Quiz completed!");
                    }
                }, 1000);
            });
        });
    }

    function startTimer() {
        timer = Date.now();
    }

    function stopTimer() {
        const elapsed = (Date.now() - timer) / 1000;
        console.log(`Time taken: ${elapsed} seconds`);
    }

    function updateProgressBar() {
        const progress = (questionIndex / totalQuestions) * 100;
        progressBar.style.width = `${progress}%`;
    }
});