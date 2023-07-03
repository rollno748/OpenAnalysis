import './../../assets/scss/upload.scss';
import Write from './../influx/Write';

async function Upload(filename: string, testId: string): Promise<void> {
  try {
    await Write(filename, testId);
    console.log('File uploaded successfully.');
  } catch (error) {
    console.error('Error uploading file:', error);
  }

}

export default Upload;


// https://codepen.io/jdniki/pen/rewxPo
