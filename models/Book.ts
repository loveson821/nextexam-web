import JSModel from './JSModel';
import Group from './Group';
import Chapter from './chapter';

export default class Book extends JSModel {

  id?: number;
  name?: string;
  cover?: string;
  description?: string;
  publisher?: string;
  price_cents?: number;
  price_currency?: number;
  status?: string;
  bought?: boolean
  created_at?: string;
  updated_at?: string;
  group?: Group;
  chapters?: [Chapter];
  // paper_pages: [PaperPage] | undefined;

  constructor(json: {} | undefined) {
		super(json);
		if (this.validate(json)) {
			// this.chapters = json.chapters.map(i => new BookChapter(i));
			// this.group = new Group(json.group)
		}
	}

	show(){
		
	}
}