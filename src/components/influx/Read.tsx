import { InfluxDB, Point, WriteApi } from '@influxdata/influxdb-client';
import { INFLUX_URL, INFLUX_TOKEN, INFLUX_ORG, INFLUX_BUCKET } from '../../env';



async function Read(filename: string, testId: string): Promise<void> {

    const influxClient = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN });
    const writeApi = influxClient.getWriteApi(INFLUX_ORG, INFLUX_BUCKET, 'ns');
}


export default Read;
