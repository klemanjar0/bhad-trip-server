import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User, UserField } from './User';

export enum UserMetaDataField {
  Id = 'id',
  FirstName = 'firstName',
  LastName = 'lastName',
  DateOfBirth = 'dateOfBirth',
  Description = 'description',
  PhoneNumber = 'phoneNumber',
  SocialLink = 'socialLink',
  User = 'user',
}

@Entity()
export class UserMetadata extends BaseEntity {
  @PrimaryGeneratedColumn()
  [UserMetaDataField.Id]: number;

  @Column({ type: 'text', default: null })
  [UserMetaDataField.FirstName]: string | null;

  @Column({ type: 'text', default: null })
  [UserMetaDataField.LastName]: string | null;

  @Column({ type: 'date', default: null })
  [UserMetaDataField.DateOfBirth]: Date | null;

  @Column({ type: 'text', default: null })
  [UserMetaDataField.Description]: string | null;

  @Column({ type: 'text', default: null })
  [UserMetaDataField.PhoneNumber]: string | null;

  @Column({ type: 'text', default: null })
  [UserMetaDataField.SocialLink]: string | null;

  @OneToOne(() => User, (user) => user[UserField.UserMetaData])
  @JoinColumn()
  [UserMetaDataField.User]: User;
}
