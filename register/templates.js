export function participantTemplate(count) {
  return `
    <section class="participant${count}">
      <p>Participant ${count}</p>

      <div class="item">
        <label for="fname${count}"> First Name<span>*</span></label>
        <input id="fname${count}" type="text" name="fname${count}" required />
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
          <option value="" disabled selected></option>
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

export function successTemplate(info) {
  const { adultName, count, fees } = info;
  return `
    <div style="padding:16px; border:1px solid #ccc; border-radius:6px; background:#f9fff9;">
      <h2>Registration Complete</h2>
      <p>Thank you <strong>${adultName || 'Parent/Guardian'}</strong> for registering.</p>
      <p>You have registered <strong>${count}</strong> participant${count === 1 ? '' : 's'} and owe <strong>$${fees.toFixed(2)}</strong> in fees.</p>
    </div>
  `;
}
