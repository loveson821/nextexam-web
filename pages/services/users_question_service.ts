import axiosInstance from '../helper/axiosInstance';
import { UsersQuestion } from '../../models';

export default class UsersQuestionService {
  // load paper pages content
  static save_to_server(uq: UsersQuestion) {
    return new Promise((resolve, reject) => {
      console.log("save users question " + uq.id);
      let params = { "users_question": uq.toParam() }
      axiosInstance
        .post("/users_questions/" + uq.id + "/auto_save_one_users_question.json", params)
        .then((res) => {
          if (res.data.doc || res.data.success) {
            resolve(res.data.doc);
          }else{
            reject(res.data.error);
          }
        })
        .catch((err) => {
          reject(err.response ? err.response.data : { error: 'Something went wrong, try agin' })
        });
    });
  }
}