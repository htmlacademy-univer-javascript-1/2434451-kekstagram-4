const PHOTOS_COUNT = 25;
const imageForm = document.querySelector('.img-upload__form');
const preview = imageForm.querySelector('.img-upload__preview img');
const isEscapeKey = (evt) => evt.key === 'Escape';

const isEnterKey = (evt) => evt.key === 'Enter';

const regexp = /^#[a-zа-яё0-9]{1,19}$/i; //Шаблон для проверки хэштегов

const ALERT_SHOW_TIME = 50;

export {PHOTOS_COUNT, preview, isEnterKey, isEscapeKey, ALERT_SHOW_TIME, regexp};
