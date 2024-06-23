import { Injectable } from "@nestjs/common";
import { CommonService } from "src/common.service";
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SensorService {
    constructor(
        private readonly commonService: CommonService,
    ) {

    }

    getTemperature() {
        let temperature = []
        const fileContent = fs.readFileSync("/root/sensor_proj/sensor_proj/sensor_data.csv", 'utf8');
        const lines = fileContent.split('\n')
        lines.forEach(line => {
            console.log(line)
            let temp = line.split(',')[2]
            let time = line.split(',')[3]
            temperature.push({
                time: time,
                temperature: temp
            })
        });
        let res = this.commonService.encrypt(JSON.stringify(temperature))
        return res
    }

    getMoisture() {
        let moisture = []
        const fileContent = fs.readFileSync("/root/sensor_proj/sensor_proj/sensor_data.csv", 'utf8');
        const lines = fileContent.split('\n')
        lines.forEach(line => {
            console.log(line)
            let moist = line.split(',')[1]
            let time = line.split(',')[3]
            moisture.push({
                time: time,
                moisture: moist
            })
        });
        let res = this.commonService.encrypt(JSON.stringify(moisture))
        return res
    }

    async readData(encrypted, iv, priv) {
        let s = await this.commonService.decrypt(encrypted, iv, priv)
        return JSON.parse(s.decrypted)
        
    }
}
