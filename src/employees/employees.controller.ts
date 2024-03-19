import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Ip } from "@nestjs/common";
import { Prisma, Role } from "@prisma/client";
import { EmployeeService } from "./employees.service";
import { Throttle, SkipThrottle } from "@nestjs/throttler"
import { MyLoggerService } from "src/my-logger/mu-logger.service";

@SkipThrottle()
@Controller("employees")
export class EmployeeController{
    constructor(private readonly employeeService: EmployeeService){}
    private readonly logger = new MyLoggerService(EmployeeController.name)

    @Post()
    create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput){
        return this.employeeService.create(createEmployeeDto)
    }

    @SkipThrottle({default: false})
    @Get()
    findAll(@Ip() ip: string,@Query("role") role?: Role  ){
        this.logger.log(`Request for ALL Employees\t${ip}`, EmployeeController.name)
        return this.employeeService.findAll(role)
    }

    @Throttle({ short:{ttl: 1000, limit: 1}})
    @Get(":id")
    findOne(@Param("id") id: string){
        return this.employeeService.findOne(+id)
    }

    @Patch(":id")
    updateOne(@Param("id") id: string, @Body() updateEmployeeDto: Prisma.EmployeeCreateInput){
        return this.employeeService.updateOne(+id, updateEmployeeDto)
    }

    @Delete(":id")
    deleteOne(@Param("id") id: string){
        return this.employeeService.deleteOne(+id)
    }
}