import { Group } from './group.model';

export class Student {
    constructor(
        public _id: string,
        public fullName: string, 
        public group: Group,
        public isAllowed: Boolean) { }
}
