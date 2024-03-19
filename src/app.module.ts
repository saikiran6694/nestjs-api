import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { EmployeeModule } from './employees/employee.module';
import { DatabaseModule } from './database/database.module';
import {ThrottlerGuard, ThrottlerModule} from "@nestjs/throttler"
import { APP_GUARD } from '@nestjs/core';
import { MyLoggerModule } from './my-logger/my-logger.module';

@Module({
  imports: [UserModule, 
    DatabaseModule, 
    EmployeeModule, 
    ThrottlerModule.forRoot([{
    name: "short",
    ttl: 1000,
    limit: 1
  },
  {
    name: 'medium',
    ttl: 10000,
    limit: 20
  }, {
    name:"long",
    ttl: 60000,
    limit: 100
  }]), MyLoggerModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule {}
