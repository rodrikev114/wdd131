// register.js

// Track how many participant sections exist (page loads with 1)
let participantCount = 1;

const form = document.getElementById('registerForm');
const addBtn = document.getElementById('add');
const summaryEl = document.getElementById('summary');

// Template for a participant block with unique IDs/names.
function participantTemplate(count) {
  // Count is the NEW participant number (2, 3, 4, ...)
  return `
    <section class="participant${count}">
      <p>Participant ${count}</p>

      <div class="item">
        <label for="fname${count}"> First Name<span>*</span></label>
        <input id="fname${count}" type="text" name="fname${count}" value="" required />
      </div>

      <div class="item activities">
        <label for="activity${count}">Activity #<span>*</span></label>
        <input id="activity${count}" type="text" name="activity${count}" />
      </div>

      <div class="item">
        <label for="fee${count}">Fee ($)<span>*</span></label>
        <input id="fee${count}" type="number" name="fee${count}" min="0" step="0.01" />
      </div>

      <div class="item">
        <label for="date${count}">Desired Date <span>*</span></label>
        <input id="date${count}" type="date" name="date${count}" />
      </div>

      <div class="item">
        <p>Grade</p>
        <select id="grade${count}" name="grade${count}">
          <option selected value="" disabled></option>
          <option value="1">1st</option>
          <option value="2">2nd</option>
          <option value="3">3rd</option>
          <option value="4">4th</option>
          <option value="5">5th</option>
          <option value="6">6th</option>
          <option value="7">7th</option>
          <option value="8">8th</option>
          <option value="9">9th</option>
          <option value="10">10th</option>
          <option value="11">11th</option>
          <option value="12">12th</option>
        </select>
      </div>
    </section>
  `;
}

// Insert the new participant right before the Add button (so the button stays last)
function addParticipant() {
  participantCount += 1;
  addBtn.insertAdjacentHTML('beforebegin', participantTemplate(participantCount));
}

// Sum all fee inputs (any element whose id starts with "fee")
function totalFees() {
  let feeElements = document.querySelectorAll("[id^=fee]");
  // Convert NodeList -> Array
  feeElements = [...feeElements];

  // Reduce to sum of numbers (treat blanks as 0)
  const sum = feeElements.reduce((acc, el) => {
    const val = parseFloat(el.value);
    return acc + (isNaN(val) ? 0 : val);
  }, 0);

  return sum;
}

// Build the success message HTML
function successTemplate(info) {
  const { adultName, count, fees } = info;
  return `
    <div style="padding:16px; border:1px solid #ccc; border-radius:6px; background:#f9fff9;">
      <h2>Registration Complete</h2>
      <p>Thank you <strong>${adultName || 'Parent/Guardian'}</strong> for registering.</p>
      <p>You have registered <strong>${count}</strong> participant${count === 1 ? '' : 's'} and owe <strong>$${fees.toFixed(2)}</strong> in fees.</p>
    </div>
  `;
}

// Basic validation helper: require first names & dates for all participants
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
  event.preventDefault(); // stop the default page reload

  // Simple validations (participants + adult name/email, as examples)
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

  // Hide the form, show the summary
  form.style.display = "none";
  summaryEl.innerHTML = successTemplate(info);
}

// Wire up events
addBtn.addEventListener('click', addParticipant);
form.addEventListener('submit', handleSubmit);
