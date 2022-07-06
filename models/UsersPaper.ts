import UsersQuestion from './UsersQuestion';
import JSModel from './JSModel';
import User from './User';
import Paper from './Paper';

export default class UsersPaper extends JSModel {
	id?: number;
	user?: User;
	paper?: Paper;
	users_questions?: [UsersQuestion];
	started_at?: string;
	status?: string;


	// var is_model_answer: Bool!
	//   var user: User!
	//   var paper: Paper!
	//   var progress: Int!
	//   var correction_progress: Int!
	//   var users_questions: [UsersQuestion]?
	//   var created_at: String!
	//   var head_cut_time: String?

	constructor(json: any) {
		super(json);
		if (this.validate(json)) {
			// 	this.keyMapper({ first_name: 'firstName', last_name: 'lastName' });
			// console.log(json.paper)
			this.users_questions = json.users_questions.map((i: any) => new UsersQuestion(i));
			this.user = new User(json.user);
			this.paper = new Paper(json.paper);
		}
	}

	isFiveMinLeft() {
		if (this.paper == undefined || this.paper.deadline == undefined) return false

		let FIVE_MINUTES = 10 * 60 * 1000;
		let dead = new Date(this.paper.deadline)
		if (this.paper.deadline) {
			if (dead.getTime() - new Date().getTime() <= FIVE_MINUTES) {
				return true
			}
		}
		return false
	}

	timesUp() {
		if (this.paper == undefined || this.paper.deadline == undefined) return false

		let dead = new Date(this.paper.deadline)
		if (this.paper.deadline) {
			if (dead.getTime() - new Date().getTime() <= 0) {
				return true
			}
		}

		return false
	}

	test() {
		return "users paper test"
	}

	// users_questions_to_params(){
	// 	var users_questions_params = {}

	// 	var uqs = []
	// 	for(const uq in users_questions){
	// 			uqs.append(users_questions[uq].toParam())
	// 	}
	// 	users_questions_params["users_questions"] = uqs
	// 	users_questions_params["is_submited"] = is_submited
	// 	users_questions_params["comment"] = comment
	// 	return users_questions_params
	// }

}