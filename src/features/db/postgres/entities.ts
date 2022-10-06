import { EntitySchema, MixedList } from 'typeorm';
import { User } from '../../models/User';
import { File } from '../../models/File';
import { UserMetadata } from '../../models/UserMetadata';
import { Avatar } from '../../models/Avatar';

const entities: MixedList<string | Function | EntitySchema<any>> = [
  User,
  File,
  UserMetadata,
  Avatar,
];

export default entities;
