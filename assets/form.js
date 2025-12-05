const steps = [
    {
        key: "firstName",
        question: "Let’s start with the basics. Type in your first name.",
        placeholder: "First name",
        type: "text",
        validate: (v) => v.length > 1
    },
    {
        key: "email",
        question: "How should we contact you? Type in your email address.",
        placeholder: "Email address",
        type: "email",
        validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
    }
];

let currentStep = 0;

const questionEl = document.getElementById("question");
const inputEl = document.getElementById("answerInput");
const nextBtn = document.getElementById("nextBtn");
const formWrap = document.getElementById("formWrap");
const continueWrap = document.getElementById("continueWrap");

nextBtn.addEventListener("click", () => {
    const value = inputEl.value.trim();
    const isValid = steps[currentStep].validate(value);

    if (!isValid) {
        triggerError();
        return;
    }

    localStorage.setItem(steps[currentStep].key, value);

    currentStep++;

    if (currentStep < steps.length) {
        animateOut(updateToNextStep);
    } else {
        animateOut(showContinueButton);
    }
});

function updateToNextStep() {
    const step = steps[currentStep];
    questionEl.textContent = step.question;
    inputEl.placeholder = step.placeholder;
    inputEl.type = step.type;
    inputEl.value = "";

    animateIn();
}

function showContinueButton() {
    // display saved data
    const name = localStorage.getItem("firstName");
    const email = localStorage.getItem("email");

    questionEl.innerHTML = `Thanks, ${name}! Now, it’s time to get a reality check.<br> <br> This will take 2-3 minutes.`;

    // hide form, show CTA
    formWrap.style.display = "none";
    continueWrap.style.display = "block";

    gsap.fromTo([continueWrap, questionEl], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
}

// animation
function animateOut(callback) {
    gsap.to([questionEl, formWrap], {
        opacity: 0,
        y: -20,
        duration: 0.4,
        onComplete: callback
    });
}

function animateIn() {
    gsap.fromTo([questionEl, formWrap], {
        opacity: 0,
        y: 20
    }, {
        opacity: 1,
        y: 0,
        duration: 0.5
    });
}

// error handler
function triggerError() {
    inputEl.classList.add("input-error", "shake");

    setTimeout(() => inputEl.classList.remove("shake"), 300);

    inputEl.addEventListener("input", () => inputEl.classList.remove("input-error"), { once: true });
}