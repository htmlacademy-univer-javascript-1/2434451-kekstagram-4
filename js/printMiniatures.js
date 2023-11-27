const pictureTemplate = document.querySelector('#picture').content;

const printPhoto = function(photoInfo){
  const pictureListFragment  = document.createDocumentFragment();
  const newPhoto = pictureTemplate.cloneNode(true);
  const photoImage = newPhoto.querySelector('.picture__img');
  photoImage.src = photoInfo.url;
  photoImage.alt = photoInfo.description;
  photoImage.id = photoInfo.id;
  const aboutPhoto = newPhoto.querySelector('.picture__info');

  const photoLikes = newPhoto.querySelector('.picture__likes');
  photoLikes.textContent = photoInfo.likes;

  const photoComments = newPhoto.querySelector('.picture__comments');
  photoComments.textContent = photoInfo.comments.length;

  aboutPhoto.appendChild(photoComments);
  aboutPhoto.appendChild(photoLikes);

  pictureListFragment.append(newPhoto);

  const photos = document.querySelector('.pictures');
  photos.appendChild(pictureListFragment);

};

export {printPhoto};
