import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { User, CreateUserDto, UserGroup } from '@web-chat/api-interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(UserGroup.name) private readonly userGroupModel: Model<UserGroup>) { }
  getData(): { message: string } {
    return { message: 'Welcome to user-api!' };
  }
  createUser(payload: CreateUserDto) {
    const createdUser = new this.userModel(payload);
    return from(createdUser.save());
  }
  addUserToGroup(userId: string, memberId: string) {
    if (userId === memberId) {
      throw new BadRequestException('Creator can not add himself');
    }
    return from(this.userGroupModel.findOne({ groupUser: userId })).pipe(switchMap((res) => {
      if (!res) {
        const createdUserGroup = new this.userGroupModel({
          groupUser: userId,
          members: [memberId]
        });
        return createdUserGroup.save();
      } else {
        res.members.push(memberId);
        return res.save();
      }
    }), catchError(err => of(err)));
  }
  getUser(email: string) {
    return from(this.userModel.findOne({ userEmail: email }).exec());
  }
}
