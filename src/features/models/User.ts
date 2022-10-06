import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserMetadata, UserMetaDataField } from './UserMetadata';
import { Avatar, AvatarField } from './Avatar';

export enum UserField {
  Id = 'id',
  UserName = 'userName',
  Password = 'password',
  Email = 'email',
  IsActive = 'isActive',
  IsOnline = 'isOnline',
  UserMetaData = 'userMetaData',
  Images = 'images',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  [UserField.Id]: number;

  @Column({ unique: true, type: 'text' })
  [UserField.UserName]: string;

  @Column({ type: 'text' })
  [UserField.Password]: string;

  @Column({ type: 'text', default: null })
  [UserField.Email]: string | null;

  @Column({ default: true })
  [UserField.IsActive]: boolean;

  @Column({ default: false })
  [UserField.IsOnline]: boolean;

  @OneToOne(
    () => UserMetadata,
    (userMetaData) => userMetaData[UserMetaDataField.User],
    { cascade: true },
  )
  @JoinColumn()
  [UserField.UserMetaData]: UserMetadata;

  @OneToMany(() => Avatar, (avatar) => avatar[AvatarField.User])
  [UserField.Images]: Avatar[];
}
