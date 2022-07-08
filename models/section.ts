import JSModel from './JSModel';

export default class Section extends JSModel {
	id?: number;
	title?: string;
	pages_count?: number;
	pdf_url?: string;
	premium?: boolean;
	member_lock?: boolean;
	constructor(json: {} | undefined) {
		super(json);
		if (this.validate(json)) {
			// this.chapters = json.chapters.map(i => new BookChapter(i));
			// this.group = new Group(json.group)
		}
	}

	get_pdf_url() {
		console.log("get pdf url called")
		if (this.pdf_url != undefined) {
			return encodeURI(this.pdf_url)
		}
		return this.pdf_url
	}

	get_premium() {
		return this.premium == undefined ? false : this.premium
	}

}