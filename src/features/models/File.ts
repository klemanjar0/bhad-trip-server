import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

export enum FileField {
  Id = 'id',
  FileName = 'fileName',
  FilePath = 'filePath',
  FileType = 'fileType',
  FileSize = 'fileSize',
}

@Entity()
export class File extends BaseEntity {
  @PrimaryGeneratedColumn()
  [FileField.Id]: number;

  @Column({ type: 'text', nullable: false })
  [FileField.FileName]: string;

  @Column({ type: 'path', nullable: false })
  [FileField.FilePath]: string;

  @Column({ type: 'text' })
  [FileField.FileType]: string;

  @Column({ type: 'text', nullable: false })
  [FileField.FileSize]: string;
}
