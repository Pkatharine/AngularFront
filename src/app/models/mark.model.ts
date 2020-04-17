import { Teacher } from './teacher.model';
import { Group } from './group.model';
import { Subject } from './subject.model';

export class Mark {
    constructor(
        public _id: string,
        public mark: number, 
        public student: Group,
        public subject: Subject, 
        public teacher: Teacher) { }
}


