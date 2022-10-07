import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserMetadata, UserMetaDataField } from './UserMetadata';
import { Avatar, AvatarField } from './Avatar';
import { hash } from '../bcrypt';
import * as moment from 'moment';

export enum UserField {
  Id = 'id',
  UserName = 'userName',
  Password = 'password',
  Email = 'email',
  CreatedDate = 'CreatedDate',
  IsActive = 'isActive',
  IsOnline = 'isOnline',
  UserMetaData = 'userMetaData',
  Images = 'images',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  [UserField.Id]: number;

  @Column({ unique: true, type: 'text', nullable: false })
  [UserField.UserName]: string;

  @Column({ type: 'text', nullable: false })
  [UserField.Password]: string;

  @Column({ type: 'text', default: null })
  [UserField.Email]: string | null;

  @Column({ default: true, nullable: false })
  [UserField.IsActive]: boolean;

  @Column({ type: Date })
  [UserField.CreatedDate]: Date;

  @Column({ default: false, nullable: false })
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

  @BeforeInsert()
  @BeforeUpdate()
  async hashPasswordOnCreate() {
    if (this[UserField.Password]) {
      this[UserField.Password] = await hash(this[UserField.Password]);
    }
  }

  @BeforeInsert()
  onCreate() {
    this[UserField.CreatedDate] = moment().toDate();
  }
}
