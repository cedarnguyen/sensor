import { Module } from "@nestjs/common";
import { SensorService } from "./sensor.service";
import { SensorController } from "./sensor.controller";
import { CommonService } from "src/common.service";

@Module({
    imports: [
    ],
    providers: [SensorService, CommonService],
    controllers: [SensorController]
})
export class SensorModule { }
