import { InfluxDB, ClientOptions, Point, HttpError } from '@influxdata/influxdb-client'
import { INFLUX_URL, INFLUX_TOKEN, INFLUX_ORG, INFLUX_BUCKET } from '../../env'
import fs from 'fs';
import readline from 'readline';
import './../../assets/scss/upload.scss'


console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)


async function Upload(filename: string): Promise<void> {

    const influxDB = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN });
    const writeApi = influxDB.getWriteApi(INFLUX_ORG, INFLUX_BUCKET);

    try {
        const fileStream = fs.createReadStream(filename);

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        for await (const line of rl) {
            // Parse each line of the JTL file
            const [timeStamp, elapsed, label, responseCode, responseMessage, threadName, dataType, success, bytes, grpThreads, allThreads, URL, Latency, Encoding, SampleCount, ErrorCount, Hostname, IdleTime, Connect] = line.split(',');

            // Create a new point
            const point = new Point('jmeter_test1')
                .timestamp(parseInt(timeStamp))
                .tag('elapsed', elapsed)
                .tag('label', label)
                .tag('responseCode', responseCode)
                .tag('responseMessage', responseMessage)
                .tag('threadName', threadName)
                .tag('dataType', dataType)
                .tag('success', success)
                .tag('bytes', bytes)
                .tag('grpThreads', grpThreads)
                .tag('allThreads', allThreads)
                .tag('URL', URL)
                .tag('Latency', Latency)
                .tag('Encoding', Encoding)
                .tag('SampleCount', SampleCount)
                .tag('ErrorCount', ErrorCount)
                .tag('Hostname', Hostname)
                .tag('IdleTime', IdleTime)
                .tag('Connect', Connect);

            // Write the point to InfluxDB
            writeApi.writePoint(point);
        }

        // Flush the write API to ensure all data is written
        await writeApi.flush();

        console.log('Results file uploaded successfully.');
    } catch (error) {
        console.error('Error reading results file:', error);
    }
}

export default Upload

// https://codepen.io/jdniki/pen/rewxPo
