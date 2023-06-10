import { InfluxDB, Point, ClientOptions, HttpError } from '@influxdata/influxdb-client';
import { INFLUX_URL, INFLUX_TOKEN, INFLUX_ORG, INFLUX_BUCKET } from '../../env';
import fs from 'fs';
import readline from 'readline';
import './../../assets/scss/upload.scss';

console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`);

async function Upload(filename: string): Promise<void> {

  const influxDB = new InfluxDB({
    url: INFLUX_URL,
    token: INFLUX_TOKEN,
  });
  const writeApi = influxDB.getWriteApi(INFLUX_ORG, INFLUX_BUCKET, 'ns');

  console.log('Filename ::: ' + filename);

  try {
    const fileStream = fs.createReadStream(filename);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    let headers: string[] = [];
    let points: Point[] = [];

    try {
      // Write data to InfluxDB
      await writeApi.writePoints(points);
      console.log('Connection success.');
    } catch (error) {
      console.log('Connection failed:', error);
    }

    for await (const line of rl) {
      if (headers.length === 0) {
        // If headers array is empty, extract the headers from the first line
        headers = line.split(',');
        continue; // Skip the first line
      }

      // Parse each line of the JTL file
      const values = line.split(',');

      // Create a new point
      const point = new Point('measurement1', {
        timestamp: parseInt(values[0], 10),
      });

      // Assign values to tags dynamically based on the headers
      for (let i = 1; i < headers.length; i++) {
        point.tag(headers[i], values[i]);
      }

      points.push(point);

      // Upload data in batches of 1000 points
      if (points.length >= 5000) {
        await writeApi.writePoints(points);
        points = [];
      }
    }

    // Write any remaining points
    if (points.length > 0) {
      await writeApi.writePoints(points);
    }

    // Flush the write API to ensure all data is written
    await writeApi.flush();

    console.log('Results file uploaded successfully.');
  } catch (error) {
    console.error('Error reading results file:', error);
  }
}

export default Upload;


// https://codepen.io/jdniki/pen/rewxPo
