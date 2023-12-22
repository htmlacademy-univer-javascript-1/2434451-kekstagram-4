
const imageForm = document.querySelector('.img-upload__form');
const previewImage = imageForm.querySelector('.img-upload__preview img');

const scaleBigger = imageForm.querySelector('.scale__control--bigger');
const scaleSmaller = imageForm.querySelector('.scale__control--smaller');
const scaleValue = imageForm.querySelector('.scale__control--value');


const scaleImage = (value) => {
  previewImage.style.transform = `scale(${  Number(Number(value.slice(0, -1)) / 100)  })`;
};

const onScaleSmallerClick = (evt) => {
  evt.preventDefault();
  scaleValue.value = `${Math.max(Number(scaleValue.value.slice(0, -1)) - 25, 25 )}%`;
  scaleImage(scaleValue.value);
};

const onScaleBiggerClick = (evt) => {
  evt.preventDefault();
  scaleValue.value = `${Math.min(Number(scaleValue.value.slice(0, -1)) + 25, 100)}%`;
  scaleImage(scaleValue.value);
};

export {scaleBigger, scaleSmaller, onScaleBiggerClick, onScaleSmallerClick};
