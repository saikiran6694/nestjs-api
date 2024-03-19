import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable({})
export class UserService {
    private users = [{
        "id": 1,
        "name": "Leanne Graham",
        "email": "Sincere@april.biz",
        "role": "INTERN",
    },
    {
        "id": 2,
        "name": "Ervin Howell",
        "email": "Shanna@melissa.tv",
        "role": "INTERN",
    },
    {
        "id": 3,
        "name": "Clementine Bauch",
        "email": "Nathan@yesenia.net",
        "role": "ENGINEER",
    },
    {
        "id": 4,
        "name": "Patricia Lebsack",
        "email": "Julianne.OConner@kory.org",
        "role": "ENGINEER",
    },
    {
        "id": 5,
        "name": "Chelsey Dietrich",
        "email": "Lucio_Hettinger@annie.ca",
        "role": "ADMIN",
    }]

    findAll(role?: "INTERN" | "ENGINEEER" | "ADMIN"){
        if(role){
            const users =  this.users.filter(user => user.role === role)

            if(users.length === 0) throw new NotFoundException("User role not found")

            return users
        }
        return this.users
    }

    findOne(id: number){
        const user = this.users.find(user => user.id === id)

        if(!user) throw new NotFoundException("User not Found")

        return user
    }

    create(user: CreateUserDto){
        const usersByHighestId = [...this.users].sort((a, b)=> b.id - a.id)
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...user
        }
        this.users.push(newUser)
        return newUser
    }

    updateOne(id: number, updateUser: UpdateUserDto){
        this.users = this.users.map((user)=>{
            if(user.id === id){
                return {...user, ...updateUser}
            }

            return user
        })
        return this.findOne(id)
    }

    deleteOne(id: number){
        const removeUser = this.findOne(id)

        this.users = this.users.filter(user => user.id !== id)

        return removeUser
    }
}
