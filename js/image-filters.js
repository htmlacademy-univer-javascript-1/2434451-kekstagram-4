import { renderPhotosList } from './get-images.js';
import { debounce } from './utils.js';
import { FILTER_DELAY } from './consts.js';

const countDefaultImages = 25;
const countRandomImages = 10;
const countDiscussedImages = 25;


const filterRandom = (photos) => {
  photos.sort(() => Math.random() - 0.5);
  return photos;
};
const compareCommentLength = (a, b) => {
  if (a['comments'].length > b['comments'].length) {
    return 1;
  } else if (a['comments'].length < b['comments'].length) {
    return -1;
  }
  return 0;
};

const compareDefault = (a, b) => {
  if (a['id'] < b['id']) {
    return -1;
  } else if (a['id'] > b['id']) {
    return 1;
  }
  return 0;
};

const filterDefault = (photos) => {
  photos.sort((a, b) => compareDefault(a, b));
  return photos;
};


const filterDiscussed = (photos) => {
  photos.sort((a, b) => compareCommentLength(a, b));
  return photos;
};

const filterPhotos = (evt, filter, photosCount, photos) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
  evt.preventDefault();
  renderPhotosList(filter(photos).slice(0, photosCount));
};

const setFilterListeners = (photos) => {
  const filterDefaultButton = document.querySelector('#filter-default');
  const filterRandomButton = document.querySelector('#filter-random');
  const filterDiscussedButton = document.querySelector('#filter-discussed');
  filterDefaultButton.addEventListener('click', debounce((evt) => filterPhotos(evt, filterDefault, countDefaultImages, photos)), FILTER_DELAY);
  filterRandomButton.addEventListener('click', debounce((evt) => filterPhotos(evt, filterRandom, countRandomImages, photos)), FILTER_DELAY);
  filterDiscussedButton.addEventListener('click', debounce((evt) => filterPhotos(evt, filterDiscussed, countDiscussedImages, photos)), FILTER_DELAY);
};

export {setFilterListeners, filterDefault };
