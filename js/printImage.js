import { renderComments, renderImage } from './renderBigPhoto.js';


const isEscapeKey = (evt) => evt.key === 'Escape';
const isEnterKey = (evt) => evt.key === 'Enter';
const bigPictureImage = document.querySelector('.big-picture');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImage();
  }
};

function closeImage () {
  bigPictureImage.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  document.body.classList.remove('modal-open');
}

function printBigPhoto(photo){
  if (photo.target.classList.contains('picture__img')){
    bigPictureImage.classList.remove('hidden');
    renderImage(photo);
    renderComments(photo);
    document.addEventListener('keydown', onDocumentKeydown);
    const commentsCount = bigPictureImage.querySelector('.social__comment-count');
    const commentsLoad = bigPictureImage.querySelector('.comments-loader');
    commentsCount.classList.add('hidden');
    commentsLoad.classList.add('hidden');
    document.body.classList.add('modal-open');
  }
}

bigPictureCloseButton.addEventListener('click', () => {
  closeImage();
});

bigPictureCloseButton.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeImage();
  }
});

export {printBigPhoto, bigPictureImage, bigPictureCloseButton};
