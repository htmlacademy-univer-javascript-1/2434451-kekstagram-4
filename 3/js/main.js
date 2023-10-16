const COUNT_PHOTO = 25;
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
]; //Как-то много негативных комментариев :(
const AUTHORS = ['Миша', 'Главный Хейтер', 'Младший хейтер', 'Дарья Магомедова', 'Маша', 'Данил'];

function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

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

Array.from({length: COUNT_PHOTO}, createPhotoDiscription());

