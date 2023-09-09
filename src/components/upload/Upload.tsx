import './../../assets/scss/upload.scss';
import writeToSQLite from '../Sqlite/WriteToSQLite';

async function Upload(filename: string, testId: string): Promise<void> {
  console.log('Upload Button clicked')

  await writeToSQLite(filename, testId);
  // await Write(filename, testId);

}

export default Upload;


// https://codepen.io/jdniki/pen/rewxPo
