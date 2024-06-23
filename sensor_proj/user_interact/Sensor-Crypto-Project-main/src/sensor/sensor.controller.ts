import { Controller, Get, Post, UseGuards, Body } from "@nestjs/common";
import { AuthGuard } from '../login/auth.guard';
import { SensorService } from "./sensor.service";

@Controller('sensor')
export class SensorController {
    constructor(
        private readonly sensorService: SensorService,
    ) {
        
    }
    
    @UseGuards(AuthGuard)
    @Get("/get_temperature")
    getTemperature() {
        let res = this.sensorService.getTemperature()
        return res
    }

    @UseGuards(AuthGuard)
    @Get("/get_moisture")
    getMoisture() {
        let res = this.sensorService.getMoisture()
        return res
    }

    @Post("/read")
    read(@Body() req) {
        let res = this.sensorService.readData(req.encrypted, req.public, req.private)
        return res
    }
}