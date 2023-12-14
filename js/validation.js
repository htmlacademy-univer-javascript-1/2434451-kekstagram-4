const uploadForm = document.querySelector('.img-upload__form');

const regexp = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(uploadForm, {
  classTo: 'form__item',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'form__item',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
}, false);

function validateDescription (value) {
  return value.length <= 140;
}


function validateHashtags(value) {
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
    if (!regexp.test(element) || repeatHashtags.includes(element)) {
      flag = false;
    }
    repeatHashtags.push(element);
  });
  if (repeatHashtags.length === 0) {
    return false;
  }
  return flag;
}

function dropError(){
  const hashtags = uploadForm.querySelector('.text__hashtags');
  const hashtagsArr = hashtags.value.split(' ');
  if (hashtagsArr.length > 5){
    return 'Максимальное возможное количество тэгов: 5';
  }
  let message = '';
  const repeatHashtags = [];
  hashtagsArr.forEach((element) => {
    if (!regexp.test(element)){
      message = 'Введён невалидный хэш-тег';
    }
    if (repeatHashtags.includes(element)) {
      message = 'Хэш-теги повторяются';
    }
    repeatHashtags.push(element);
  });
  return message;
}


pristine.addValidator(uploadForm.querySelector('.text__hashtags'), validateHashtags, dropError);
pristine.addValidator(uploadForm.querySelector('.text__description'),
  validateDescription,
  'Комментарий к изображению не может быть длиннее 140 символов.');


uploadForm.addEventListener('submit', (evt) => {
  if (pristine.validate()) {
    return true;
  }
  else {
    evt.preventDefault();
  }
});
