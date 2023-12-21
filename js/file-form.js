import { isEscapeKey, isEnterKey } from './consts.js';

const overlay = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const closeForm = document.querySelector('.img-upload__cancel');
const fileInput = document.querySelector('.img-upload__input');
const imageForm = document.querySelector('.img-upload__form');
const hashTag = imageForm.querySelector('.text__hashtags');
const comment = imageForm.querySelector('.text__description');
export const preview = imageForm.querySelector('.img-upload__preview img');
const effectsPreview = imageForm.querySelectorAll('.effects__preview');
const scaleSmaller = imageForm.querySelector('.scale__control--smaller');
const scaleBigger = imageForm.querySelector('.scale__control--bigger');
const scaleValue = imageForm.querySelector('.scale__control--value');
const successMessageTemplate = document.querySelector('#success');
const errorMessageTemplate = document.querySelector('#error');


const scaleImage = (value) => {
  preview.style.transform = `scale(${  Number(Number(value.slice(0, -1)) / 100)  })`;
};

const onScaleBiggerClick = (evt) => {
  evt.preventDefault();
  scaleValue.value = `${Math.min(Number(scaleValue.value.slice(0, -1)) + 25, 100)}%`;
  scaleImage(scaleValue.value);
};

const onScaleSmallerClick = (evt) => {
  evt.preventDefault();
  scaleValue.value = `${Math.max(Number(scaleValue.value.slice(0, -1)) - 25, 25 )}%`;
  scaleImage(scaleValue.value);
};

const closeFileForm = (func=()=>(null)) => {
  if (!(document.activeElement === hashTag || document.activeElement === comment)) {
    uploadFile.value = '';
    overlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    scaleBigger.removeEventListener('click', onScaleBiggerClick);
    scaleSmaller.removeEventListener('click', onScaleSmallerClick);
    document.removeEventListener('keydown', func);
    imageForm.reset();
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.removeEventListener('keydown', onDocumentKeydown);
    closeFileForm();
  }
};

const openFileForm = () => {
  const urlImg = URL.createObjectURL(uploadFile.files[0]);
  overlay.classList.remove('hidden');
  effectsPreview.forEach((element) => {
    element.style.backgroundImage = `url(${  urlImg  })`;
  });
  preview.setAttribute('src', urlImg);
  document.addEventListener('keydown', onDocumentKeydown);
  document.body.classList.add('modal-open');
  scaleBigger.addEventListener('click', onScaleBiggerClick);
  scaleSmaller.addEventListener('click', onScaleSmallerClick);
};

closeForm.addEventListener('click', () => {
  closeFileForm(onDocumentKeydown);
});

closeForm.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeFileForm(onDocumentKeydown);
  }
});

fileInput.addEventListener('change', (evt) => {
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
    overlay.classList.remove('hidden');
  }
};

const closeSentForm = () => {
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
};

const closeSentFormError = (message) => {
  overlay.classList.add('hidden');
  const errorMessage = errorMessageTemplate.content.cloneNode(true);
  const errorText = errorMessage.querySelector('.error__title');
  errorText.textContent = `${message  }\n`;
  const errorButton = errorMessage.querySelector('.error__button');
  document.body.appendChild(errorMessage, true);
  errorButton.addEventListener('click', (evt) => {
    document.body.removeChild(document.body.querySelector('.error'));
    document.removeEventListener('keydown', onDocumentKeydownError);
    overlay.classList.remove('hidden');
    evt.preventDefault();
  });
  document.addEventListener('keydown', onDocumentKeydownError);
};


export {closeSentForm, closeSentFormError};
