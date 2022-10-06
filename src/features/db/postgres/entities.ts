import { EntitySchema, MixedList } from 'typeorm';

const entities: MixedList<string | Function | EntitySchema<any>> = [];

export default entities;
