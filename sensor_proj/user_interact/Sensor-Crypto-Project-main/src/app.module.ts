import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { SensorModule } from './sensor/sensor.module';

@Module({
  imports: [
    LoginModule,
    SensorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
