const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;

const renderPhotosList = (photos) => {
  picturesList.querySelectorAll('.picture').forEach((element) => {
    picturesList.removeChild(element);
  });
  const pictureListFragment = document.createDocumentFragment();
  photos.forEach((item) => {
    const newImage = pictureTemplate.cloneNode(true);
    newImage.querySelector('.picture__img').setAttribute('id', item['id']);
    newImage.querySelector('.picture__img').setAttribute('src', item['url']);
    newImage.querySelector('.picture__img').setAttribute('alt', item['description']);
    newImage.querySelector('.picture__likes').textContent = item['likes'];
    newImage.querySelector('.picture__comments').textContent = item['comments'].length;
    pictureListFragment.appendChild(newImage);
  });
  picturesList.appendChild(pictureListFragment);
};

picturesList.classList.remove('hidden');

export {picturesList, renderPhotosList};
