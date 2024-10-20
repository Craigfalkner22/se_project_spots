const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

console.log(initialCards);

const profileEditButton = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const closeProfileButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editFormElement = editProfileModal.querySelector(".modal__form");
const editInputName = document.querySelector("#profile-name-input");
const editInputDescription = document.querySelector(
  "#profile-description-input"
);
const submitModalButton = editProfileModal.querySelector(
  ".modal__submit-button"
);
const cardTemplate = document.querySelector("#card-template");
const cardList = document.querySelector(".cards__list");

function openModal() {
  editInputName.value = profileName.textContent;
  editInputDescription.value = profileDescription.textContent;
  editProfileModal.classList.add("modal__opened");
}

function closeModal() {
  editProfileModal.classList.remove("modal__opened");
}

function handleProflieFormSubmit(e) {
  e.preventDefault();
  profileName.textContent = editInputName.value;
  profileDescription.textContent = editInputDescription.value;
  closeModal();
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImg = cardElement.querySelector(".card__image");

  cardNameEl.textContent = data.name;
  cardImg.src = data.link;
  cardImg.alt = data.name;

  return cardElement;
}

profileEditButton.addEventListener("click", openModal);

closeProfileButton.addEventListener("click", closeModal);

editProfileModal.addEventListener("submit", handleProflieFormSubmit);

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);
  cardList.append(cardElement);
}
