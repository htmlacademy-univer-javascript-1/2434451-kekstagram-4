import { sendData } from './api.js';
import { closeSentFormError } from './file-form.js';
import { REGEXP } from './consts.js';

const imageForm = document.querySelector('.img-upload__form');
const submitButton = imageForm.querySelector('.img-upload__submit');

export const pristine = new Pristine(imageForm, {
  classTo: 'form__item',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'form__item',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});


const validateHashtags = (value) => {
  value = value.toLowerCase();
  if (value.length === 0) {
    return true;
  }
  let flag = true;
  const hashtagsArr = value.split(' ');
  const repeatHashtags = [];
  if (hashtagsArr.length > 5) {
    return false;
  }
  hashtagsArr.forEach((element) => {
    if (!REGEXP.test(element) || repeatHashtags.includes(element)) {
      flag = false;
    }
    repeatHashtags.push(element);
  });
  if (repeatHashtags.length === 0) {
    return false;
  }
  return flag;
};

const dropError = () => {
  const hashtags = imageForm.querySelector('.text__hashtags');
  const hashtagsArr = hashtags.value.split(' ');
  if (hashtagsArr.length > 5){
    return 'Максимальное возможное количество тэгов: 5';
  }
  let message = '';
  const repeatHashtags = [];
  hashtagsArr.forEach((element) => {
    if (repeatHashtags.includes(element)) {
      message = 'Хэш-теги повторяются';
    }
    else if (!REGEXP.test(element)){
      message = 'Введён невалидный хэш-тег';
    }
    repeatHashtags.push(element);
  });
  return message;
};

const validateComment = (value) => value.length <= 140;

pristine.addValidator(
  imageForm.querySelector('.text__hashtags'),
  validateHashtags,
  dropError()
);

pristine.addValidator(
  imageForm.querySelector('.text__description'),
  validateComment,
  'Комментарий к изображению не может быть длиннее 140 символов.'
);

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setUserFormSubmit = (onSuccess) => {
  imageForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      pristine.reset();
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch(
          (err) => {
            closeSentFormError(err.message);
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

export {setUserFormSubmit};
