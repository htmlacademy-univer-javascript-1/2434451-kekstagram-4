import { isEscapeKey, isEnterKey } from './consts.js';
import { renderImage, renderComments } from './rendering-image.js';
import { filterDefault } from './image-filters.js';

const bigPictureImage = document.querySelector('.big-picture');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');

let onLoadComments;

const closeImage = (func) => {
  const commentsList = document.querySelector('.social__comments');
  commentsList.innerHTML = '';
  bigPictureImage.classList.add('hidden');
  document.removeEventListener('keydown', func);
  document.querySelector('.comments-loader').removeEventListener('click', onLoadComments);
  document.body.classList.remove('modal-open');
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.removeEventListener('keydown', onDocumentKeydown);
    closeImage();
  }
};

const openImage = (image, data) => {
  if (image.target.classList.contains('picture__img')){
    image.preventDefault();
    const commentLoader = bigPictureImage.querySelector('.comments-loader');
    const commentsObject = renderComments(filterDefault(data), image, 0, commentLoader);
    commentsObject();
    onLoadComments = (evt) => {
      evt.preventDefault();
      commentsObject();
    };
    renderImage(image);
    commentLoader.addEventListener('click', onLoadComments);
    document.addEventListener('keydown', onDocumentKeydown);
    document.body.classList.add('modal-open');
    commentLoader.classList.remove('hidden');
    bigPictureImage.classList.remove('hidden');
  }
};

const setFullsizeListeners = (data) => {
  const picturesList = document.querySelector('.pictures');
  picturesList.addEventListener('click', (evt) => {
    openImage(evt, data);
  });
  picturesList.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt)) {
      openImage(evt, data);
    }
  });
};

bigPictureCloseButton.addEventListener('click', () => {
  closeImage(onDocumentKeydown);
});

bigPictureCloseButton.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeImage(onDocumentKeydown);
  }
});

export {setFullsizeListeners};
