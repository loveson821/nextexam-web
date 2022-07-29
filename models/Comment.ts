import JSModel from './JSModel';
import User from './User';

export default class Comment extends JSModel {
    user?: User;
    body?: string;
    constructor(json: {} | undefined) {
		super(json);
		if (this.validate(json)) {
			// this.chapters = json.chapters.map(i => new BookChapter(i));
			// this.group = new Group(json.group)
		}
	}
}