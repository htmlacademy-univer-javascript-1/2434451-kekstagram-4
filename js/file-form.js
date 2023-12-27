import { pristine } from './validation.js';
import { isEscapeKey, isEnterKey } from './consts.js';
import {scaleBigger, scaleSmaller, onScaleBiggerClick, onScaleSmallerClick} from './slider.js';

const sliderField = document.querySelector('.img-upload__effect-level');
const overlay = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const closeForm = document.querySelector('.img-upload__cancel');
const imageForm = document.querySelector('.img-upload__form');
const previewImage = imageForm.querySelector('.img-upload__preview img');
const effectsPreview = imageForm.querySelectorAll('.effects__preview');


const successMessageTemplate = document.querySelector('#success');
const errorMessageTemplate = document.querySelector('#error');


const closeFileForm = (func=()=>(null)) => {
  if (!(document.activeElement === imageForm.querySelector('.text__hashtags')
  || document.activeElement === imageForm.querySelector('.text__description'))) {
    uploadFile.value = '';
    overlay.classList.add('hidden');
    scaleBigger.removeEventListener('click', onScaleBiggerClick);
    scaleSmaller.removeEventListener('click', onScaleSmallerClick);
    document.removeEventListener('keydown', func);
    document.body.classList.remove('modal-open');
    imageForm.reset();
    pristine.reset();
    previewImage.style.filter = 'none';
    sliderField.classList.add('hidden');
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
  previewImage.setAttribute('src', urlImg);
  document.addEventListener('keydown', onDocumentKeydown);
  scaleBigger.addEventListener('click', onScaleBiggerClick);
  scaleSmaller.addEventListener('click', onScaleSmallerClick);
  document.body.classList.add('modal-open');
};

closeForm.addEventListener('click', () => {
  closeFileForm(onDocumentKeydown);
});

closeForm.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeFileForm(onDocumentKeydown);
  }
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

document.querySelector('.img-upload__input').addEventListener('change', (evt) => {
  evt.preventDefault();
  openFileForm();
});


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
  const errorButton = errorMessage.querySelector('.error__button');
  errorMessage.querySelector('.error__title').textContent = `${message  }\n`;
  document.body.appendChild(errorMessage, true);
  errorButton.addEventListener('click', (evt) => {
    document.body.removeChild(document.body.querySelector('.error'));
    document.removeEventListener('keydown', onDocumentKeydownError);
    overlay.classList.remove('hidden');
    evt.preventDefault();
  });
  document.addEventListener('keydown', onDocumentKeydownError);
};


export {closeSentForm, closeSentFormError, previewImage};
