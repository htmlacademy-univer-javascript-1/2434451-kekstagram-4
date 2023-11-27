import { getRandomInteger } from './util.js';
import { MESSAGES, AUTHORS } from './consts.js';
import { COUNT_PHOTO } from './consts.js';
import { printPhoto } from './printMiniatures.js';
import { printBigPhoto } from './printImage.js';

function createPhotoDiscription(){ //Создание объекта описания фотографии
  let photoID = 0;
  return function(){
    photoID++;
    return {
      id: photoID,
      url: `photos/${photoID}.jpg`,
      description: `Самая классная картинка на свете №${photoID}`,
      likes: getRandomInteger(15,200),
      comments: Array.from({length: getRandomInteger(0,30)}, createComment())
    };
  };
}

function createComment(){
  let commentID = 0;
  return function(){
    commentID++;
    return {
      id: commentID,
      avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
      message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
      name: AUTHORS[getRandomInteger(0, AUTHORS.length - 1)]
    };
  };
}

const photosDiscriptions = Array.from({length: COUNT_PHOTO}, createPhotoDiscription());

photosDiscriptions.forEach((item) => {
  printPhoto(item);
});
const photos = document.querySelector('.pictures');
photos.addEventListener('click', printBigPhoto);

export {createComment, createPhotoDiscription, photosDiscriptions, photos};
