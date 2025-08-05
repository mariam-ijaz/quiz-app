// Selecting all required elements
const info_box = document.querySelector(".info_box");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");  

// Show info box
info_box.classList.add("activeInfo");

// If continueQuiz button clicked
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);
    queCounter(1);
    startTimer(20);
    startTimerLine(0);
};

let timeValue = 20;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// If restartQuiz button clicked
restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz");
    result_box.classList.remove("activeResult");
    timeValue =20;    // times change 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    timeText.textContent = "Time Left";
    next_btn.classList.remove("show");
};

// If quitQuiz button clicked
quit_quiz.onclick = () => {
    window.location.reload();
};

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// If Next Que button clicked
next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine(widthValue);
        timeText.textContent = "Time Left";
        next_btn.classList.remove("show");
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
};

// Getting questions and options from array
function showQuestions(index) {
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '';
    for (let i = 0; i < questions[index].options.length; i++) {
        option_tag += '<div class="option"><span>' + questions[index].options[i] + '</span></div>';
    }
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].addEventListener("click", function () {
            optionSelected(this);
        });
    }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    const allOptions = option_list.children.length;
    if (userAns == correctAns) {
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag);
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIconTag);
        console.log("Wrong Answer");
        for (let i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correctAns) {
                option_list.children[i].classList.add("correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                console.log("Auto selected correct answer.");
            }
        }
    }
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.classList.add("show");
}

function showResult() {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    let scoreTag = '';
    if (userScore > 3) {
        scoreTag = '<span>Congratulations! You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
    } else if (userScore > 1) {
        scoreTag = '<span>Nice! You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
    } else {
        scoreTag = '<span>Sorry, You got only <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
    }
    scoreText.innerHTML = scoreTag;
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 10) {
            timeCount.textContent = "0" + time;
        }
        if (time < 0) {
            clearInterval(counter);
            timeText.textContent = "Time End";
            const allOptions = option_list.children.length;
            let correctAns = questions[que_count].answer;
            for (let i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correctAns) {
                    option_list.children[i].classList.add("correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for (let i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.classList.add("show");
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1;
        time_line.style.width = time + "px";
        if (time > 549) {
            clearInterval(counterLine);
        }
    }
}

function queCounter(index) {
    let totalQueCountTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCountTag;
}
