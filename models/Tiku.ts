import JSModel from './JSModel';

export default class Tiku extends JSModel {
    id?: number;
    mila_id?: number;
    user_id?: number;
    kg_question_id?: number;
    pack?: string;
    status?: string;
    content?: string;
    
    answer?: string;
    correct_answer?: string;
    model_answer?: string;

    correct?: boolean;
    difficulty?: string;
    concept?: string;
    score?: string;
    submited_at?: string;
    updated_at?: string;
    
    constructor(json: {} | undefined) {
		super(json);
		if (this.validate(json)) {
			// this.chapters = json.chapters.map(i => new BookChapter(i));
			// this.group = new Group(json.group)
		}
	}
}