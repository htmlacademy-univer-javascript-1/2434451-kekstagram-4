const ALERT_SHOW_TIME = 50;
const isEscapeKey = (evt) => evt.key === 'Escape';
const isEnterKey = (evt) => evt.key === 'Enter';
const IMAGES_COUNT = 25;
const REGEXP = /^#[a-zа-яё0-9]{1,19}$/i; //Шаблон для валидации хэштегов
const FILTER_DELAY = 500;

export {ALERT_SHOW_TIME, isEnterKey, isEscapeKey, IMAGES_COUNT, REGEXP, FILTER_DELAY};
