import { Teacher } from './teacher.model';
import { Group } from './group.model';

export class Subject {
    constructor(
        public _id: string,
        public name: string, 
        public teacher: Teacher, 
        public group: Group) { }
}
