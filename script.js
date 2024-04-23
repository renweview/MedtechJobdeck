const themeButton = document.getElementById("theme-button");
const signNowButton = document.getElementById("sign-now-button");

const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
}

themeButton.addEventListener("click", toggleDarkMode);

let scaleFactor = 1;
const modalImage = document.querySelector("#modal-image");
const scaleImage = () => {
  //   Within the scaleImage function, it will first toggle the image size between a factor of 1 and 0.8.

  //   Check if the scaleFactor is 1
  //   If it is, set it to 0.8
  //   If not, set it back to 1

  if (scaleFactor === 1) {
    scaleFactor = 0.8;
  } else {
    scaleFactor = 1;
  }

  modalImage.style.transform = `scale(${scaleFactor})`;
}

// Petition Form
const addSignature = (person) => {
  const signatures = document.querySelector('.signatures');
  const newSignature = document.createElement('p');
  newSignature.textContent = `️🖊️ ${person.name} from ${person.hometown} supports this.`;
  signatures.appendChild(newSignature);
}

const toggleModal = (person) => {
  const modal = document.getElementById("thanks-modal");
  const modalContent = document.getElementById("modal-text-container");
  let intervalId;
  intervalId = setInterval(scaleImage, 500);
  setTimeout(function() {
    clearInterval(intervalId);
  }, 3000);

  modal.style.display = "flex";
  modalContent.textContent = `️Thank you so much ${person.name} from ${person.hometown}!`;
  setTimeout(() => {
    modal.style.display = "none";
  }, 3000)
}

const validateForm = () => {
  let petitionInputs = document.getElementById("sign-petition").elements;

  const person = {
    name: petitionInputs[0].value,
    hometown: petitionInputs[1].value,
    email: petitionInputs[2].value
  };

  let containsErrors = false;

  for (let i = 0; i < petitionInputs.length; i++) {
    if (petitionInputs[i].value.length < 2) {
      petitionInputs[i].classList.add('error');
      containsErrors = true;
    } else if (i == 2 && !person.email.endsWith('.com') && !person.email.endsWith('.edu') && !person.email.endsWith('.org')) {
      petitionInputs[i].classList.add('error');
      containsErrors = true;
    }
    else {
      petitionInputs[i].classList.remove('error');
    }
  }

  if (containsErrors == false) {
    addSignature(person);
    toggleModal(person);
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
      containsErrors = false;
    }
  }
}

signNowButton.addEventListener('click', validateForm);

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
}

const revealableContainer = document.querySelectorAll(".revealable");

const reveal = () => {
  for (let i = 0; i < revealableContainer.length; i++) {
    let windowHeight = window.innerHeight;
    let revealTop = revealableContainer[i].getBoundingClientRect().top;
    let revealPoint = windowHeight - animation.revealDistance;
    if (Math.abs(revealTop) < revealPoint) {
      revealableContainer[i].classList.add("active");
    }
    else {
      revealableContainer[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

// animation stuff
var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};