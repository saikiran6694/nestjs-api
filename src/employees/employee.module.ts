import { Module } from "@nestjs/common";
import { EmployeeService } from "./employees.service";
import { EmployeeController } from "./employees.controller";
import { DatabaseModule } from "src/database/database.module";

@Module({
    imports:[DatabaseModule],
    providers:[EmployeeService],
    controllers:[EmployeeController]
})
export class EmployeeModule{}