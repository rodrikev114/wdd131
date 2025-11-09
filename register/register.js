import { participantTemplate, successTemplate } from './templates.js';

let participantCount = 1;
const form = document.getElementById('registerForm');
const addBtn = document.getElementById('add');
const summaryEl = document.getElementById('summary');

function addParticipant() {
  participantCount += 1;
  addBtn.insertAdjacentHTML('beforebegin', participantTemplate(participantCount));
}

function totalFees() {
  let feeElements = document.querySelectorAll("[id^=fee]");
  feeElements = [...feeElements];
  return feeElements.reduce((acc, el) => {
    const val = parseFloat(el.value);
    return acc + (isNaN(val) ? 0 : val);
  }, 0);
}

function validateParticipants() {
  const sections = document.querySelectorAll("section[class^='participant']");
  for (const section of sections) {
    const first = section.querySelector("input[id^='fname']");
    const date = section.querySelector("input[id^='date']");
    if (!first || !first.value.trim()) return { ok: false, message: "Please enter a first name for each participant." };
    if (!date || !date.value) return { ok: false, message: "Please select a desired date for each participant." };
  }
  return { ok: true };
}

function handleSubmit(event) {
  event.preventDefault();

  const participantValidation = validateParticipants();
  if (!participantValidation.ok) {
    alert(participantValidation.message);
    return;
  }

  const adultNameInput = document.getElementById('adult_name');
  if (!adultNameInput || !adultNameInput.value.trim()) {
    alert("Please enter the adult/primary contact name.");
    return;
  }

  const total = totalFees();
  const info = {
    adultName: adultNameInput.value.trim(),
    count: document.querySelectorAll("section[class^='participant']").length,
    fees: total
  };

  form.style.display = "none";
  summaryEl.innerHTML = successTemplate(info);
}

addBtn.addEventListener('click', addParticipant);
form.addEventListener('submit', handleSubmit);
