import JSModel from './JSModel';
import Section from './section';

export default class Chapter extends JSModel {
    id?: number;
    title?: string;
    sections?: [Section];
    constructor(json: {} | undefined) {
		super(json);
		if (this.validate(json)) {
			// this.chapters = json.chapters.map(i => new BookChapter(i));
			// this.group = new Group(json.group)
		}
	}

}