import { renderPhotosList } from './getImages.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';
import { setUserFormSubmit } from './validation.js';
import { closeSentForm } from './showFileForm.js';
import { setFilterListeners } from './filters.js';
import { setFullsizeListeners } from './showFullsize.js';
import { PHOTOS_COUNT } from './consts.js';


getData().then((photos) => {
  setFilterListeners(photos);
  setFullsizeListeners(photos);
  renderPhotosList(photos.slice(0, PHOTOS_COUNT));
})
  .then(() => {
    const filters = document.querySelector('.img-filters');
    filters.classList.remove('img-filters--inactive');
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUserFormSubmit(closeSentForm);
