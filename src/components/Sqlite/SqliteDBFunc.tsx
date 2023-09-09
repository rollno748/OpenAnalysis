import * as fs from 'fs';
require('dotenv').config();
import sqlite3 from 'sqlite3';
import readline from 'readline';


export default class SqliteDBFunc {

    async createSQLiteDB(dbFilePath: string, filename: string): Promise<void> {
        const exists = fs.existsSync(dbFilePath);
        // If not, create SQLite database 
        if (!exists) {
            new sqlite3.Database(dbFilePath);
            this.createMeasurementTable(dbFilePath, filename);
        }
    }
    
    async deleteSQLiteDB(dbFilePath: string): Promise<void> {
        const exists = fs.existsSync(dbFilePath);
      
        if (exists) {
          // Delete file if it exists
          fs.unlinkSync(dbFilePath); 
        }
    }
    
    async createMeasurementTable(dbFilePath:string, filename: string): Promise<void> {

        const db = new sqlite3.Database(dbFilePath);
        const headers = await getHeader(filename);         
        if(headers){
            // Build column definition
            const columns = headers.map((name: string) => `${name} TEXT`).join(', ');
            // Create table 
            db.run(`CREATE TABLE measurements (${columns})`);
        }
    
        db.close();
    }

    async streamDataIntoTable(dbFilePath: string, filename: string, tableName: string): Promise<void>{
        const db = new sqlite3.Database(dbFilePath);

        const stream = fs.createReadStream(filename);
        const rl = readline.createInterface({ input: stream });

        let batch = [];
        
        for await (const line of rl) {
            batch.push(line);
            // Insert in batches of 1000 rows
            if (batch.length >= 1000) {
            db.run(`INSERT INTO ${tableName} VALUES ?`, [batch]);
            batch = []; 
            }
        }

        // Insert remaining
        if (batch.length > 0) {
            db.run(`INSERT INTO ${tableName} VALUES ?`, [batch]);
        }

        db.close();      
    }
}

function getHeader(jtlFile: string): Promise<string[]> {
    const stream = fs.createReadStream(jtlFile);
    const rl = readline.createInterface({ input: stream });
  
    return new Promise(resolve => {
      let header: string[] = [];
      rl.once('line', line => {
        header = line.split(',');
        resolve(header); 
      });
    });
    
}
