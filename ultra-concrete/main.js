const jobPricing = {
  driveway: { label: "Driveway", pricePerYard: 185 },
  patio: { label: "Patio", pricePerYard: 175 },
  sidewalk: { label: "Sidewalk", pricePerYard: 165 },
  slab: { label: "Foundation", pricePerYard: 195 },
};

const jobTypes = Object.entries(jobPricing).map(([key, value]) => ({
  key,
  ...value
}));

function populateJobTypes() {
  const select = document.querySelector("#jobType");
  jobTypes.forEach(job => {
    const option = document.createElement("option");
    option.value = job.key;
    option.textContent = job.label;
    select.appendChild(option);
  });
}

function calculateYards(length, width, thickness) {
  return (length * width * (thickness / 12)) / 27;
}

function handleEstimate(e) {
  e.preventDefault();

  const length = +document.querySelector("#lengthFt").value;
  const width = +document.querySelector("#widthFt").value;
  const thickness = +document.querySelector("#thicknessIn").value;
  const job = jobPricing[document.querySelector("#jobType").value];

  const yards = calculateYards(length, width, thickness);
  const cost = yards * job.pricePerYard;

  const output = document.querySelector("#estimateOutput");
  output.textContent = `Estimated ${yards.toFixed(2)} yards. Cost: $${cost.toFixed(2)}`;
}

function handleWeather(e) {
  e.preventDefault();

  const temp = +document.querySelector("#tempF").value;
  const precip = document.querySelector("#precip").value;
  const output = document.querySelector("#weatherOutput");

  if (temp < 40 || precip === "likely") {
    output.textContent = "Poor conditions for concrete pouring.";
    output.className = "notice bad";
  } else {
    output.textContent = "Conditions look acceptable.";
    output.className = "notice good";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  populateJobTypes();
  document.querySelector("#estimate-form")?.addEventListener("submit", handleEstimate);
  document.querySelector("#weather-form")?.addEventListener("submit", handleWeather);
});
