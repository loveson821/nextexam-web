import Admission from './Admission';
import JSModel from './JSModel';
import Vpass from './Vpass';

export default class Group extends JSModel {
	id?: number;
	vpass?: Vpass;
	name: string | undefined;
	admission?: Admission;
	role?: string;
	avatar?: string;
	name1?: string;
	name2?: string;
  	is_free?: boolean;
	// paper_pages: [PaperPage] | undefined;
	//   vpass ?: string;
	//   invalid_date ?: string;
	constructor(json: any) {
		super(json);
		if (this.validate(json)) {
			// 	this.keyMapper({ first_name: 'firstName', last_name: 'lastName' });
			// this.paper_pages = json.paper_pages.map(i => new PaperPage(i));
		}
	}

	show() {

	}

	hasVpass() {
		if (this.vpass && this.vpass.invalid_date) {
			return Date.parse(this.vpass.invalid_date) > Date.now()
		}
		return false
	}
}