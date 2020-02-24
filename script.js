const active = "active";

class Steper {
    constructor(stepperBoxCssClass, stepperIndicatorCssClass, nextBtnCssClass, previousBtnCssClass) {
        this.steperBox = document.querySelector(stepperBoxCssClass);
        this.steperHeader = document.querySelector(stepperIndicatorCssClass);
        this.nextButtons = document.querySelectorAll(nextBtnCssClass);
        this.previousButtons = document.querySelectorAll(previousBtnCssClass)
        this.currentStep = 0;
        this.maxStep = this.steperBox.childElementCount;
        this.stepsBoxes = this.steperBox.querySelectorAll(".step-box");
        this.steps = null;
    }

    removeActiveClass() {
        this.steps[this.currentStep].classList.remove(active);
        this.stepsBoxes[this.currentStep].classList.remove(active);
    }

    addActiveClass() {
        this.steps[this.currentStep].classList.add(active);
        this.stepsBoxes[this.currentStep].classList.add(active);
    }

    nextClick() {
        this.removeActiveClass();
        this.currentStep++;
        if (this.currentStep >= this.maxStep) this.currentStep = this.maxStep - 1;
        this.addActiveClass();
    }

    backClick() {
        this.removeActiveClass();
        this.currentStep--;
        if (this.currentStep < 0) this.currentStep = 0;
        this.addActiveClass();
    }

    init() {
        if (this.steperBox.childElementCount < 3) {
            const alert = document.createElement("h5");
            alert.classList.add("error-alert");
            alert.innerText = "There are not enough steps";
            this.steperBox.insertBefore(alert, this.stepsBoxes[0]);

            this.stepsBoxes.forEach((stepBox) => stepBox.classList.add("disabled"))
            return;
        }


        this.nextButtons.forEach((btn) => btn.addEventListener("click", this.nextClick.bind(this)));
        this.previousButtons.forEach((btn) => btn.addEventListener("click", this.backClick.bind(this)));

        for (let i = 0; i < this.maxStep; i++) {
            const stepNumber = document.createElement("div");
            stepNumber.className = "step-number";
            if (i === this.currentStep) {
                stepNumber.classList.add(active);
                this.stepsBoxes[i].classList.add("active");
            };
            stepNumber.innerText = i + 1;
            this.steperHeader.appendChild(stepNumber);
        }

        this.steps = document.querySelectorAll(".step-number")
    }
}

const steper = new Steper(".steper", ".steps", ".next", ".back");
steper.init();
