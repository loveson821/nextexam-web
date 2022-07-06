import Answer from './Answer';
import Question from './Question';
import JSModel from './JSModel';
import _ from 'lodash';

export default class UsersQuestion extends JSModel {
  id?: number;
  answer?: Answer;
  correction?: Answer;
  model_answer?: Answer;
  question?: Question;
  question_id?: number;
  score?: number;
  users_paper_id?: number;
  remark?: string;
  proofread?: boolean;

  constructor(json: any) {
    super(json);
    if (this.validate(json)) {
      // 	this.keyMapper({ first_name: 'firstName', last_name: 'lastName' });
      this.answer = new Answer(json.answer);
      this.correction = new Answer(json.correction);
      this.model_answer = new Answer(json.model_answer);
      this.question = new Question(json.question);
      if (json.question != undefined) {
        // console.log(json.question);
        this.question_id = json.question.id;
      }
    }
  }

  toParam() {
    var param: any = {}
    if (this.id != undefined) {
      param["id"] = this.id
    }
    if (this.question_id != undefined) {
      param["question_id"] = this.question_id
    }
    if (this.score != undefined) {
      param["score"] = this.score
    }
    if (this.users_paper_id != undefined) {
      param["users_paper_id"] = this.users_paper_id
    }
    param["remark"] = this.remark
    param["proofread"] = this.proofread

    if (this.answer) {
      console.log("has answer")
      param["answer_attributes"] = this.answer.toParam()
    }
    if (this.correction) {
      console.log("has correction")
      param["correction_attributes"] = this.correction.toParam()
    }
    if (this.model_answer) {
      console.log("has model_answer")
      console.log(this.model_answer)
      param["model_answer_attributes"] = this.model_answer.toParam()
      console.log("should print this")
    }



    return param
  }

  hasAnswer() {
    return this.answer != undefined && this.answer.writing != undefined && this.answer.writing != '';
  }

  noAnswer() {
    return !this.hasAnswer()
  }

  hasCorrection() {
    return this.correction != undefined && this.correction.writing != undefined && this.correction.writing != '';
  }

  hasCorrectionOnIndex(index: number){
    return this.hasCorrection() && this.correction?.writing.split(",")[index] != undefined;
  }

  correction_on_index(index: number){
    return this.correction?.writing.split(",")[index]
  }

  noCorrection() {
    return !this.hasCorrection()
  }

  hasModelAnswer() {
    return _.isEmpty(this.model_answer)
  }

  isMC() {
    return this.question?.isMC()
  }

  isText() {
    if (this.hasAnswer() && this.answer != undefined) {
      return this.answer.isText()
    }

    return false
  }

  set_image_data_to_answer_with_index(data: any, index: number) {
    if (this.answer == undefined) { // 答案不存在
      this.answer = new Answer({})
      this.answer.set_image_data_to_answer_with_index(data, 0)
    } else {
      if (index == -1) { // 追加的答案
        this.answer.add_image_data_to_answer(data)
      } else {
        this.answer.set_image_data_to_answer_with_index(data, index)
      }
    }
  }

  set_image_data_to_correction_with_index(data: any, index: number){
    if (this.correction == undefined) { // 答案不存在
      this.correction = new Answer({})
      this.correction.set_image_data_to_answer_with_index(data, 0)
    } else {
      if (index == -1) { // 追加的答案
        this.correction.add_image_data_to_answer(data)
      } else {
        this.correction.set_image_data_to_answer_with_index(data, index)
      }
    }
  }

  get_image_answer_path_by_index(index: number) {

    if (this.answer == undefined || index < 0) {
      return undefined
    }

    var imgs = this.answer.images()
    if (index > imgs.length) {
      return undefined
    } else {
      return imgs[index]
    }

  }

  addImage(data: any) {
    if (this.answer == undefined) {
      this.answer = new Answer({})
      this.answer.add_image_data_to_answer(data)
    } else {
      this.answer.add_image_data_to_answer(data)
    }
  }

  isCorrectAnswer() {
    if (this.hasAnswer() && this.hasModelAnswer()) {
      if (this.answer?.writing == this.model_answer?.writing) {
        return true
      }
    }

    return false
  }


}