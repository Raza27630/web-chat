import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as DocSchema } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({
        required: true,
        type: String,
        unique: true
    })
    userEmail: string;

    @Prop({
        required: true,
        type: String,
    })
    displayName: string;

    @Prop()
    img: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

@Schema()
export class UserGroup extends Document {
    @Prop({
        type: DocSchema.Types.ObjectId,
        required: true,
        unique: true
    })
    groupUser: string;
    @Prop([{ type: DocSchema.Types.ObjectId, ref: User.name, required: true }])
    members: string[];
}
export const UserGroupSchema = SchemaFactory.createForClass(UserGroup);
