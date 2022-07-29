import PaperPage from './PaperPage';
import JSModel from './JSModel';

export default class Paper extends JSModel {
	id?: number;
	name?: string;
	title?: string;
	description?: string;
	total_questions?: number;
	paper_pages: Array<PaperPage> = [];
	whats_wrong_reasons?: [];
	deadline?: string;
	purpose?: string;
	correcting_count?: number;
	submited_count?: number;
	done_count?: number;

	constructor(json: any) {
		super(json);
		if (this.validate(json)) {
			// 	this.keyMapper({ first_name: 'firstName', last_name: 'lastName' });
			if (json.paper_pages != undefined) {
				this.paper_pages = json.paper_pages.map((i: any) => new PaperPage(i));
			}
		}
	}

	show() {
		console.log("---- printing to show paper detail ----- ")
		console.log(this.id)
		console.log(this.description)
		console.log(this.title)
	}

	get_index_of_question_serial_num(num: any) {
		num = parseInt(num)
		var count = 0;
		var index = 0;
		for (var pp of this.paper_pages) {
			if (pp.isQuestion()) {
				index += 1
			}
			count += 1
			if (index - 1 == num) return count - 1;
		}

		return 0
	}
	get_index_of_question_serial_num2(num: any) {
		num = parseInt(num)
		var count = 0;
		for (var pp of this.paper_pages) {
			if (num - 1 == count) {
				return count
			}

			if (pp.isQuestion()) {
				count += 1
			}
		}

		return 0
	}
}