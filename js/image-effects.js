import { preview } from './file-form.js';

const effectSlider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelectorAll('.effects__item');
const sliderField = document.querySelector('.img-upload__effect-level');
const effectValue = document.querySelector('.effect-value-to-form');
const effectValueForm = document.querySelector('.effect-level__value');
let selectedEffect = 'none';

const effectsFormat = {
  'sepia': (value) => `sepia(${value})`,
  'marvin': (value) => `invert(${value}%)`,
  'phobos': (value) => `blur(${value}px)`,
  'none': () => 'none',
  'chrome': (value) => `grayscale(${value})`,
  'heat': (value) => `brightness(${value})`
};
const sliderOptionEdit = {
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
  },
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
  }
};
effectsList.forEach((element) => {
  element.addEventListener('change', (evt) => {
    evt.preventDefault();
    preview.style.filter = 'none';
    selectedEffect = element.querySelector('input[name="effect"]:checked').value;
    sliderField.classList.remove('hidden');
    sliderOptionEdit[selectedEffect]();
    preview.style.filter = effectsFormat[selectedEffect](effectSlider.noUiSlider.get());
    effectValue.value = preview.style.filter;
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
  preview.style.filter = effectsFormat[selectedEffect](effectSlider.noUiSlider.get());
  effectValue.value = preview.style.filter;
  effectValueForm.value = effectSlider.noUiSlider.get();
});
sliderField.classList.add('hidden');
