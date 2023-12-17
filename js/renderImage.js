import { bigPictureImage } from './showFullsize.js';

export function renderComments(data, image, startComment, commentLoader) {
  const imgId = image.target.id;
  const comments = data[imgId]['comments'];
  const commentTemplate = document.querySelector('#comment').content;
  const commentsList = document.querySelector('.social__comments');
  const commentsListFragment = document.createDocumentFragment();
  let k = 0;
  return function () {
    for (let i = startComment; i < startComment + 5; i++) {
      if (i > comments.length - 1) {
        commentLoader.classList.add('hidden');
        break;
      }
      k ++;
      const newComment = commentTemplate.cloneNode(true);
      newComment.querySelector('.social__picture').setAttribute('src', comments[i].avatar);
      newComment.querySelector('.social__picture').setAttribute('alt', comments[i].alt);
      newComment.querySelector('.social__text').textContent = comments[i].message;
      commentsListFragment.appendChild(newComment);
      commentsList.appendChild(commentsListFragment);
    }
    document.querySelector('.comments-view-count').textContent = k;
    startComment += 5;
  };
}

export function renderImage(image) {
  const likesCount = image.target.parentElement.querySelector('.picture__likes').textContent;
  const commentsCount = image.target.parentElement.querySelector('.picture__comments').textContent;
  bigPictureImage.querySelector('.big-picture__img img').setAttribute('src', image.target.currentSrc);
  bigPictureImage.querySelector('.social__caption').textContent = image.target.alt;
  bigPictureImage.querySelector('.likes-count').textContent = likesCount;
  bigPictureImage.querySelector('.comments-count').textContent = commentsCount;
}
