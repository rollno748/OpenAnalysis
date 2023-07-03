import { InfluxDB, Point, WriteApi } from '@influxdata/influxdb-client';
import { INFLUX_URL, INFLUX_TOKEN, INFLUX_ORG, INFLUX_BUCKET } from '../../env';


const fluxQuery = {
    QUERY1: `from(bucket: "${INFLUX_BUCKET}") |> range(start: 0) |> filter(fn: (r) => r._measurement == "temperature")`,
    QUERY2: `from(bucket: "${INFLUX_BUCKET}") |> range(start: 0) |> filter(fn: (r) => r._measurement == "temperature")`,
    QUERY3: `from(bucket: "${INFLUX_BUCKET}") |> range(start: 0) |> filter(fn: (r) => r._measurement == "temperature")`
};


async function Read(filename: string, testId: string): Promise<void> {

    const influxClient = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN });
    const queryApi = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN }).getQueryApi(INFLUX_ORG);

    const myQuery = async () => {
        for await (const { values, tableMeta } of queryApi.iterateRows(fluxQuery.QUERY1)) {
            const o = tableMeta.toObject(values)
            console.log(`${o._time} ${o._measurement} in '${o.location}' (${o.sensor_id}): ${o._field}=${o._value}`)
        }
    }

    myQuery()

}


export default Read;
