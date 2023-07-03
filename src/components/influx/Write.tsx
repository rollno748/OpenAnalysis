import { InfluxDB, Point, WriteApi } from '@influxdata/influxdb-client';
import { INFLUX_URL, INFLUX_TOKEN, INFLUX_ORG, INFLUX_BUCKET } from '../../env';
import fs from 'fs';
import readline from 'readline';


async function Write(filename: string, testId: string): Promise<void> {

    const influxClient = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN });
    const writeApi = influxClient.getWriteApi(INFLUX_ORG, INFLUX_BUCKET, 'ns');

    let headers: string[] = [];
    let points: Point[] = [];

    try {

        if (await validateConnection(writeApi)) {
            console.log("Connection established successfully !")
            //await deleteAllData(influxClient, INFLUX_BUCKET, INFLUX_ORG);

            const rl = await readLinesFromFile(filename);

            for await (const line of rl) {

                if (headers.length === 0) { // If headers array is empty, extract the headers from the first line
                    headers = line.split(',');
                    // console.log('Headers ::: ' + headers); //timeStamp,elapsed,label,responseCode,responseMessage,threadName,success,bytes,grpThreads,allThreads,Latency,Hostname,Connect
                    continue; // Skip the first line
                }

                const values = line.split(','); // split each line of the JTL file using delimiter

                // Create a new point 
                let point = new Point(testId)
                    .timestamp(parseInt(values[0]))
                    .tag(headers[2], values[2])//label=purchaseRequest
                    .intField(headers[1], values[1])//elapsed=21
                    .intField(headers[3], values[3])//responseCode=200
                    .stringField(headers[4], values[4])//responseMessage=OK
                    .stringField(headers[5], values[5])//threadName=Event-TG\ 1-24
                    .booleanField(headers[6], values[6])//success=true
                    .intField(headers[7], values[7])//bytes=5404
                    .intField(headers[8], values[8])//grpThreads=24
                    .intField(headers[9], values[9])//,allThreads=24,
                    .intField(headers[10], values[10])//Latency=21,
                    .stringField(headers[11], values[11])//Hostname=jmeter.vgw-preprod.aws.featurespace.net,
                    .intField(headers[12], values[12])//Connect=16

                points.push(point);

                // Upload data in batches of 5000 points
                if (points.length >= 5000) {
                    await writeApi.writePoints(points);
                    points = [];
                }
            }

        }

        // Write any remaining points
        if (points.length > 0) {
            await writeApi.writePoints(points);
        }

        // Flush the write API to ensure all data is written
        await writeApi.flush();

        console.log('Results file uploaded successfully.');

    } catch (e) {
        console.error('Error uploading file:', e);
    }
}


async function readLinesFromFile(filename: string): Promise<readline.Interface> {
    const fileStream = fs.createReadStream(filename);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    return rl;
}

async function validateConnection(writeApi: WriteApi): Promise<boolean> {
    let result = false;
    try {
        await writeApi.writePoints([]);
        result = true;
    } catch (error) {
        console.log('Connection failed:', error);
    }
    return result;
}

async function deleteAllData(influxClient: InfluxDB, bucket: string, org: string) {
    const queryApi = influxClient.getQueryApi(org);
    const deleteScript = `from(bucket: "${bucket}") |> range(start: 0) |> delete()`;
    try {
        await queryApi.queryRaw(deleteScript);
        console.log('Deleted all the from the bucket!');
    } catch (error) {
        console.log('Exception occurred while deleting data from the bucket: ', error);
    }
}

export default Write;
