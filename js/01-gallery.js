import { galleryItems } from "./gallery-items.js";
// Change code below this line
const galleryListEl = document.querySelector(".gallery");
galleryListEl.addEventListener("click", handelEventImg);

function handelEventImg(e) {
  e.preventDefault();
  if (e.target.nodeName !== "IMG") {
    return;
  }
  const instance = basicLightbox.create(
    `<img class="gallery__image"
   src="${e.target.dataset.source}" alt="${e.target.description}"/>`,
    {
      onShow: (instance) => {
        document.addEventListener("keydown", closeModal, { once: true });
      },
    }
  );
  instance.show();
  function closeModal({ code }) {
    if (document.querySelector(".basicLightbox--visible")) {
      if (code === "Escape") {
        instance.close();
      }
    }
  }
}
const createGalleryItems = ({ preview, original, description }) => `
  <div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt='${description}'
    />
  </a>
</div>`;

const createGalleryItemsEl = galleryItems
  .map((e) => createGalleryItems(e))
  .join("");
galleryListEl.insertAdjacentHTML("beforeend", createGalleryItemsEl);
