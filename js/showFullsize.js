import { isEscapeKey, isEnterKey } from './consts.js';
import { picturesList } from './getImages.js';
import { renderImage, renderComments } from './renderImage.js';

export const bigPictureImage = document.querySelector('.big-picture');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');

let onLoadComments;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImage();
  }
};

function openImage(image, data) {
  if (image.target.classList.contains('picture__img')){
    image.preventDefault();
    const commentLoader = bigPictureImage.querySelector('.comments-loader');
    commentLoader.classList.remove('hidden');
    bigPictureImage.classList.remove('hidden');
    const commentsObj = renderComments(data, image, 0, commentLoader);
    commentsObj();
    onLoadComments = (evt) => {
      evt.preventDefault();
      commentsObj();
    };
    renderImage(image);
    commentLoader.addEventListener('click', onLoadComments);
    document.addEventListener('keydown', onDocumentKeydown);
    document.body.classList.add('modal-open');
  }
}

function closeImage () {
  const commentsList = document.querySelector('.social__comments');
  commentsList.innerHTML = '';
  bigPictureImage.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
  document.querySelector('.comments-loader').removeEventListener('click', onLoadComments);
}

const setFullsizeListeners = (data) => {
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
  closeImage();
});

bigPictureCloseButton.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeImage();
  }
});

export {setFullsizeListeners};
