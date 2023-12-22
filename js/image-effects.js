import { previewImage } from './file-form.js';

const effectSlider = document.querySelector('.effect-level__slider');
const sliderField = document.querySelector('.img-upload__effect-level');
const effectValue = document.querySelector('.effect-value-to-form');
const effectValueForm = document.querySelector('.effect-level__value');

let selectedEffect = 'none';

const effectsFormat = {
  'chrome': (value) => `grayscale(${value})`,
  'sepia': (value) => `sepia(${value})`,
  'marvin': (value) => `invert(${value}%)`,
  'phobos': (value) => `blur(${value}px)`,
  'heat': (value) => `brightness(${value})`,
  'none': () => 'none'
};
const sliderOptionEdit = {
  'chrome': () => {
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0.5,
        max: 1,
      },
      step: 0.1,
      format: {
        to: (value) => value,
        from: (value) => parseFloat(value).toFixed(1),
      },
    });
    effectSlider.noUiSlider.set(1);
  },
  'sepia': () => {
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      format: {
        to: (value) => value,
        from: (value) => parseFloat(value).toFixed(1),
      },
    });
    effectSlider.noUiSlider.set(1);
  },
  'marvin': () => {
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
    });
    effectSlider.noUiSlider.set(100);
  },
  'phobos': () => {
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      step: 0.1,
    });
    effectSlider.noUiSlider.set(3);
  },
  'heat': () => {
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      step: 0.1,
    });
    effectSlider.noUiSlider.set(3);
  },
  'none': () => {
    sliderField.classList.add('hidden');
    effectSlider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
    });
    effectSlider.noUiSlider.set(1);
  }
};
document.querySelectorAll('.effects__item').forEach((element) => {
  element.addEventListener('change', (evt) => {
    evt.preventDefault();
    previewImage.style.filter = 'none';
    selectedEffect = element.querySelector('input[name="effect"]:checked').value;
    sliderField.classList.remove('hidden');
    sliderOptionEdit[selectedEffect]();
    previewImage.style.filter = effectsFormat[selectedEffect](effectSlider.noUiSlider.get());
    effectValue.value = previewImage.style.filter;
    effectValueForm.value = effectSlider.noUiSlider.get();

  });
});
noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});
effectSlider.noUiSlider.on('update', () => {
  previewImage.style.filter = effectsFormat[selectedEffect](effectSlider.noUiSlider.get());
  effectValue.value = previewImage.style.filter;
  effectValueForm.value = effectSlider.noUiSlider.get();
});
sliderField.classList.add('hidden');
