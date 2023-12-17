import { renderPhotosList } from './getImages.js';
import { debounce } from './utils.js';


const FILTER_DELAY = 500;
const countDefault = 25;
const countRandom = 10;
const countDiscussed = 25;

const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');

const filterDefault = (photos) => photos;
const filterRandom = (photos) => {
  photos.sort(() => Math.random() - 0.5);
  return photos;
};

function compareCommentLength(a, b) {
  if (a['comments'].length < b['comments'].length) {
    return -1;
  } else if (a['comments'].length > b['comments'].length) {
    return 1;
  }
  return 0;
}

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
  filterDefaultButton.addEventListener('click', debounce((evt) => filterPhotos(evt, filterDefault, countDefault, photos)), FILTER_DELAY);
  filterRandomButton.addEventListener('click', debounce((evt) => filterPhotos(evt, filterRandom, countRandom, photos)), FILTER_DELAY);
  filterDiscussedButton.addEventListener('click', debounce((evt) => filterPhotos(evt, filterDiscussed, countDiscussed, photos)), FILTER_DELAY);
};

export {setFilterListeners};
