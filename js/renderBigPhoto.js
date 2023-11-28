import {photosDiscriptions} from './data.js';
import { bigPictureImage } from './printImage.js';

function renderComments(image) {
  const imgId = image.target.id;
  const comments = photosDiscriptions[imgId-1]['comments'];
  const commentTemplate = document.querySelector('#comment').content;
  const commentsList = document.querySelector('.social__comments');
  const commentsListFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const newComment = commentTemplate.cloneNode(true);
    newComment.querySelector('.social__picture').setAttribute('src', comment.avatar);
    newComment.querySelector('.social__picture').setAttribute('alt', comment.alt);
    newComment.querySelector('.social__text').textContent = comment.message;
    commentsListFragment.appendChild(newComment);
  });
  commentsList.appendChild(commentsListFragment);
}
function renderImage(image) {
  const likesCount = image.target.parentElement.querySelector('.picture__likes').textContent;
  const commentsCount = image.target.parentElement.querySelector('.picture__comments').textContent;
  bigPictureImage.querySelector('.likes-count').textContent = likesCount;
  bigPictureImage.querySelector('.comments-count').textContent = commentsCount;
  bigPictureImage.querySelector('.big-picture__img img').setAttribute('src', image.target.currentSrc);
  bigPictureImage.querySelector('.social__caption').textContent = image.target.alt;
}

export {renderComments, renderImage};
