import { COUNT_PHOTO } from './consts.js';
import { createPhotoDiscription } from './data.js';

Array.from({length: COUNT_PHOTO}, createPhotoDiscription());
