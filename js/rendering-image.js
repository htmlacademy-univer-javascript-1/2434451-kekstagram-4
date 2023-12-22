const bigPictureImage = document.querySelector('.big-picture');
const commentTemplate = document.querySelector('#comment').content;
const commentsList = document.querySelector('.social__comments');
const commentsListFragment = document.createDocumentFragment();

const renderComment = (commentInfo) => {
  const newComment = commentTemplate.cloneNode(true);
  newComment.querySelector('.social__text').textContent = commentInfo.message;
  newComment.querySelector('.social__picture').setAttribute('src', commentInfo.avatar);
  newComment.querySelector('.social__picture').setAttribute('alt', commentInfo.alt);
  commentsListFragment.appendChild(newComment);
  commentsList.appendChild(commentsListFragment);
};

const renderComments = (data, image, startComment, commentLoader) => {
  const comments = data[image.target.id]['comments'];
  let countComments = 0;
  return function () {
    for (let i = startComment; i < startComment + 5; i++) {
      if (i > comments.length - 1) {
        commentLoader.classList.add('hidden');
        break;
      }
      countComments ++;
      renderComment(comments[i]);
    }
    document.querySelector('.comments-view-count').textContent = countComments;
    startComment += 5;
  };
};


const renderImage = (image) => {
  const likesCount = image.target.parentElement.querySelector('.picture__likes').textContent;
  const commentsCount = image.target.parentElement.querySelector('.picture__comments').textContent;
  bigPictureImage.querySelector('.big-picture__img img').setAttribute('src', image.target.currentSrc);
  bigPictureImage.querySelector('.social__caption').textContent = image.target.alt;
  bigPictureImage.querySelector('.likes-count').textContent = likesCount;
  bigPictureImage.querySelector('.comments-count').textContent = commentsCount;
};


export {renderComments, renderImage};
