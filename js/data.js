import { getRandomInteger } from './util.js';
import { MESSAGES, AUTHORS } from './consts.js';

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

export {createComment, createPhotoDiscription};
