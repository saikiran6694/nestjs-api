import { Module } from "@nestjs/common";
import { MyLoggerService } from "./mu-logger.service";

@Module({
    providers:[MyLoggerService],
    exports:[MyLoggerService]
})
export class MyLoggerModule{}