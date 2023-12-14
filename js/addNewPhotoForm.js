import { isEscapeKey } from './consts.js';

const uploadFile = document.querySelector('#upload-file');
const uploadWindow = document.querySelector('.img-upload__overlay');


function closeWindow(){
  uploadWindow.classList.add('hidden');
}


document.querySelector('.img-upload__cancel').addEventListener('click', () =>{
  closeWindow();
});

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeWindow();
  }
};
document.addEventListener('keydown', onDocumentKeydown);

uploadFile.addEventListener('change', () => {
  uploadWindow.classList.remove('hidden');
});
