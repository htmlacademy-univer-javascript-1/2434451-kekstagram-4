import { COUNT_PHOTO } from './consts.js';
import { createPhotoDiscription } from './data.js';
import { printPhoto } from './printMiniatures.js';

const photosDiscriptions = Array.from({length: COUNT_PHOTO}, createPhotoDiscription());

photosDiscriptions.forEach((item) => {
  printPhoto(item);
});
