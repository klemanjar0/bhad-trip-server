import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User, UserField } from "./User";

export enum AvatarField {
  Id = 'id',
  AvatarName = 'fileName',
  AvatarFilePath = 'filePath',
  AvatarFileType = 'fileType',
  AvatarFileSize = 'fileSize',
  User = 'user',
}

@Entity()
export class Avatar extends BaseEntity {
  @PrimaryGeneratedColumn()
  [AvatarField.Id]: number;

  @Column({ type: 'text' })
  [AvatarField.AvatarName]: string;

  @Column({ type: 'path' })
  [AvatarField.AvatarFilePath]: string;

  @Column({ type: 'text' })
  [AvatarField.AvatarFileType]: string;

  @Column({ type: 'text' })
  [AvatarField.AvatarFileSize]: string;

  @ManyToOne(() => User, (user) => user[UserField.Images])
  [AvatarField.User]: User;
}
