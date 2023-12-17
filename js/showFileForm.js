import { isEscapeKey, isEnterKey } from './consts.js';
import { preview } from './consts.js';

const formOverlay = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const closeForm = document.querySelector('.img-upload__cancel');
const imageForm = document.querySelector('.img-upload__form');

const scaleSmaller = imageForm.querySelector('.scale__control--smaller');
const scaleBigger = imageForm.querySelector('.scale__control--bigger');
const scaleValue = imageForm.querySelector('.scale__control--value');
const successMessageTemplate = document.querySelector('#success');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFileForm();
  }
};


const plusScale = (evt) => {
  evt.preventDefault();
  scaleValue.value = `${Math.min(Number(scaleValue.value.slice(0, -1)) + 25, 100)}%`;
  scaleImage(scaleValue.value);
};

const minusScale = (evt) => {
  evt.preventDefault();
  scaleValue.value = `${Math.max(Number(scaleValue.value.slice(0, -1)) - 25, 25 )}%`;
  scaleImage(scaleValue.value);
};


function openFileForm() {
  const urlImg = URL.createObjectURL(uploadFile.files[0]);
  formOverlay.classList.remove('hidden');
  imageForm.querySelectorAll('.effects__preview').forEach((element) => {
    element.style.backgroundImage = `url(${  urlImg  })`;
  });
  preview.setAttribute('src', urlImg);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.classList.add('modal-open');
  scaleBigger.addEventListener('click', plusScale);
  scaleSmaller.addEventListener('click', minusScale);
}

function scaleImage(value) {
  preview.style.transform = `scale(${  Number(Number(value.slice(0, -1)) / 100)  })`;
}

function closeFileForm() {
  if (!(document.activeElement === imageForm.querySelector('.text__hashtags')
  || document.activeElement === imageForm.querySelector('.text__description'))) {
    uploadFile.value = '';
    formOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeydown);
    document.body.classList.remove('modal-open');
    scaleBigger.removeEventListener('click', plusScale);
    scaleSmaller.removeEventListener('click', minusScale);
    imageForm.reset();

  }
}

closeForm.addEventListener('click', () => {
  closeFileForm();
});

closeForm.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeFileForm();
  }
});

document.querySelector('.img-upload__input').addEventListener('change', (evt) => {
  evt.preventDefault();
  openFileForm();
});

const onDocumentKeydownSuccess = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.removeEventListener('keydown', onDocumentKeydownSuccess);
    document.body.removeChild(document.body.querySelector('.success'));
  }
};

const onDocumentKeydownError = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.removeEventListener('keydown', onDocumentKeydownError);
    document.body.removeChild(document.body.querySelector('.error'));
    formOverlay.classList.remove('hidden');
  }
};

function closeSentForm() {
  closeFileForm();
  const successMessage = successMessageTemplate.content.cloneNode(true);
  const successButton = successMessage.querySelector('.success__button');
  document.body.appendChild(successMessage, true);
  successButton.addEventListener('click', (evt) => {
    document.body.removeChild(document.body.querySelector('.success'));
    document.removeEventListener('keydown', onDocumentKeydownSuccess);
    evt.preventDefault();
  });
  document.addEventListener('keydown', onDocumentKeydownSuccess);
}

const closeSentFormError = (message) => {
  formOverlay.classList.add('hidden');
  const error = document.querySelector('#error');
  const errorMessage = error.content.cloneNode(true);
  const errorText = errorMessage.querySelector('.error__title');
  errorText.textContent = `${message}\n`;
  const errorButton = errorMessage.querySelector('.error__button');
  document.body.appendChild(errorMessage, true);
  errorButton.addEventListener('click', (evt) => {
    document.body.removeChild(document.body.querySelector('.error'));
    document.removeEventListener('keydown', onDocumentKeydownError);
    formOverlay.classList.remove('hidden');
    evt.preventDefault();
  });
  document.addEventListener('keydown', onDocumentKeydownError);
};
export {closeSentForm, closeSentFormError};
