import { getData } from './api.js';
import { showAlertMessage } from './utils.js';
import { setUserFormSubmit } from './validation.js';
import { closeSentForm } from './file-form.js';
import { setFilterListeners } from './image-filters.js';
import { setFullsizeListeners } from './big-image.js';
import { IMAGES_COUNT } from './consts.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
picturesList.classList.remove('hidden');

const renderPhotosList = (photos) => {
  picturesList.querySelectorAll('.picture').forEach((element) => {
    picturesList.removeChild(element);
  });
  const pictureListFragment = document.createDocumentFragment();
  photos.forEach((element) => {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('.picture__img').setAttribute('id', element['id']);
    newPicture.querySelector('.picture__img').setAttribute('src', element['url']);
    newPicture.querySelector('.picture__img').setAttribute('alt', element['description']);
    newPicture.querySelector('.picture__likes').textContent = element['likes'];
    newPicture.querySelector('.picture__comments').textContent = element['comments'].length;
    pictureListFragment.appendChild(newPicture);
  });
  picturesList.appendChild(pictureListFragment);
};

getData().then((image) => {
  setFilterListeners(image);
  setFullsizeListeners(image);
  renderPhotosList(image.slice(0, IMAGES_COUNT));
})
  .then(() => {
    const filters = document.querySelector('.img-filters');
    filters.classList.remove('img-filters--inactive');
  })
  .catch(
    (err) => {
      showAlertMessage(err.message);
    }
  );

setUserFormSubmit(closeSentForm);

export {renderPhotosList};
