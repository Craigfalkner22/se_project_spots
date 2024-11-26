const initialCards = [
  {
    name: "Golden Gate bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
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
const cardModal = document.querySelector("#add-card");
const cardForm = cardModal.querySelector(".modal__form");
const cardModalCloseButton = cardModal.querySelector(".modal__close-button");
const cardModalButton = document.querySelector(".profile__add-btn");
const cardNameInput = cardModal.querySelector("#add-card-name-input");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");
const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__img");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const previweModalCloseButton = previewModal.querySelector(
  ".modal__close-button"
);

const addCardSubmitButton = cardModal.querySelector("#add-card-btn");

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalKey);
  modal.addEventListener("click", closeModalOverlay);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalKey);
  modal.removeEventListener("click", closeModalOverlay);
}

const closeModalKey = (evt) => {
  if (evt.key === "Escape") {
    const openedModalEl = document.querySelector(".modal_opened");
    closeModal(openedModalEl);
  }
};

const closeModalOverlay = (evt) => {
  if (evt.target && evt.target.classList.contains("modal_opened")) {
    closeModal(evt.target);
  }
};

function handleProflieFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editInputName.value;
  profileDescription.textContent = editInputDescription.value;
  closeModal(editProfileModal);
}

function handleAddCardSumbit(evt) {
  evt.preventDefault();
  const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };
  const cardElement = getCardElement(inputValues);
  cardList.prepend(cardElement);
  closeModal(cardModal);
  evt.target.reset();
  disableButton(addCardSubmitButton, config);
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImg = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_liked");
  });

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImg.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
    previewModalCaptionEl.textContent = data.name;
  });

  cardNameEl.textContent = data.name;
  cardImg.src = data.link;
  cardImg.alt = data.name;

  return cardElement;
}

profileEditButton.addEventListener("click", () => {
  editInputName.value = profileName.textContent;
  editInputDescription.value = profileDescription.textContent;
  resetValidation(
    editProfileModal,
    [editInputName, editInputDescription],
    config
  );
  enableButton(submitModalButton, config);
  openModal(editProfileModal);
});

closeProfileButton.addEventListener("click", () => {
  closeModal(editProfileModal);
});

cardModalButton.addEventListener("click", () => {
  openModal(cardModal);
});

cardModalCloseButton.addEventListener("click", () => {
  closeModal(cardModal);
});

previweModalCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

editFormElement.addEventListener("submit", handleProflieFormSubmit);

cardForm.addEventListener("submit", handleAddCardSumbit);

initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardList.append(cardElement);
});
