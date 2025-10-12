// === MENU TOGGLE ===
const menuButton = document.querySelector("#menu");
const menu = document.querySelector(".menu");

// Hide menu by default on load
menu.classList.add("hide");

menuButton.addEventListener("click", () => {
  menu.classList.toggle("hide");
});

// === HANDLE WINDOW RESIZE ===
function handleResize() {
  if (window.innerWidth > 1000) {
    menu.classList.remove("hide");
  } else {
    menu.classList.add("hide");
  }
}

handleResize(); // run once on page load
window.addEventListener("resize", handleResize);

// === IMAGE VIEWER (MODAL) ===
const gallery = document.querySelector(".gallery");

gallery.addEventListener("click", (event) => {
  const clickedImage = event.target.closest("img");
  if (!clickedImage) return;

  // Build the modal element
  const modal = document.createElement("dialog");

  modal.innerHTML = `
    <img src="${`${clickedImage.src.split("-")[0]}-full.jpeg`}" alt="${clickedImage.alt}">
    <button class="close-viewer">X</button>
  `;

  document.body.appendChild(modal);
  modal.showModal();

  // Close modal when clicking X
  const closeButton = modal.querySelector(".close-viewer");
  closeButton.addEventListener("click", () => {
    modal.close();
    modal.remove();
  });

  // Close modal when clicking outside the image
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.close();
      modal.remove();
    }
  });
});
