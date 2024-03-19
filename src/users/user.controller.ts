import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService){}

  @Get() // /users
  findAll(@Query("role") role?: "INTERN" | "ENGINEEER" | "ADMIN") {
    return this.userService.findAll(role)
  }

  @Get(':id') // /users/:id
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id)
  }

  @Post() // /users
  createOne(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Patch(":id") // /users/:id
  updateOne(@Param("id", ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto){
    return this.userService.updateOne(id, updateUserDto)
  }

  @Delete(":id") // /users/:id
  deleteOne(@Param("id", ParseIntPipe) id: number){
    return this.userService.deleteOne(id);
  }
}
