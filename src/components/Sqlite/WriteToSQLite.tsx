import { Database } from 'sqlite3';
const path = require('path');
import fs from 'fs';
import readline from 'readline';
import SqliteDBFunc from './SqliteDBFunc';

async function writeToSQLite(filename: string, testId: string) {

  console.log('Write to sql function');

  const workspaceLocation =import.meta.env.CONFIG.env['workspace-location'];
  console.log('workspace location: %s', workspaceLocation);
  const file = path.basename(filename);
  console.log('Filename: %s', file);
  const dbFilePath = `${workspaceLocation}${file}`;
  console.log('DB Filepath: %s', dbFilePath);

  
  // const sqliteFunction = new SqliteDBFunc();

  const db = new Database(dbFilePath, (err: any) => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
      console.log('Connected to the database:', dbFilePath);
        // sqliteFunction.createSQLiteDB(dbFilePath, filename);
    }
  });

  // Close the database when you are done with it
  // db.close((err: any) => {
  //   if (err) {
  //     console.error('Error closing database:', err.message);
  //   } else {
  //     console.log('Database closed.');
  //   }
  // });
}


export default writeToSQLite;