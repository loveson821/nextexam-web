import axiosInstance from "../helper/axiosInstance";
const querystring = require('query-string');

export default class UsersPaperService {
  // load paper pages content
  static load(id: number) {
    return new Promise((resolve, reject) => {
      console.log("loading users paper " + id);
      axiosInstance
        .get("/users_papers/" + id + ".json")
        .then((res) => {
          if (res.data.doc) {
            resolve(res.data.doc);
          } else {
            reject(res.data.error);
          }
        })
        .catch((err) => {
          reject(err.response ? err.response.data : { error: 'Something went wrong, try agin' })
        });
    });
  }

  static submit(id: number) {
    return new Promise((resolve, reject) => {
      console.log("submiting users paper id " + id);
      axiosInstance
        .post("/users_papers/" + id + "/submit.json")
        .then((res) => {
          console.log(res.data)
          if (res.data.success) {
            resolve(res);
          } else {
            console.log(res.data);
            reject(res.data.error);
          }
        })
        .catch((err) => {
          console.log("error here")
          console.log(err)
          reject(err.response ? err.response.data : { error: 'Something went wrong, try agin' })
        });
    });
  }

  static submit_correction(id: number, users_questions: any, comment?: string) {
    return new Promise((resolve, reject) => {
      console.log("submiting correction users paper id " + id);
      axiosInstance
        .post("/users_papers/" + id + "/submit_correction.json",{
          is_submited: true,
          comment: comment,
          users_questions: users_questions
        })
        .then((res) => {
          console.log("submited correction success")
          // console.log(res.data.doc)
          if (res.data.doc) {
            resolve(res.data);
          } else {
            console.log(res.data);
            reject(res.data.error);
          }
        })
        .catch((err) => {
          reject(err.response ? err.response.data : { error: 'Something went wrong, try agin' })
        });
    });
  }

  static practices_can_correct(params: any) {
    return new Promise((resolve, reject) => {
      console.log("me/practices_can_correct.json?" + querystring.stringify(params))
      axiosInstance
        .get("me/practices_can_correct.json?" + querystring.stringify(params))
        .then((res) => {
          if (res.data.docs) {
            resolve(res.data.docs);
          } else {
            reject(res.data.error);
          }
        })
        .catch((err) => {
          reject(err.response ? err.response.data : { error: 'Something went wrong, try agin' })
        });
    });
  }

  static load_waiting_correct_users_papers(paper_id: number, params: any) {
    return new Promise((resolve, reject) => {
      console.log("load waiting correct users papers / paper_id " + paper_id);
      console.log("/me/paper_can_correct_list/" + paper_id + ".json?" + querystring.stringify(params))
      axiosInstance
        .get("/me/paper_can_correct_list/" + paper_id + ".json?" + querystring.stringify(params))
        .then((res) => {
          if (res.data) {
            resolve(res.data);
          } else {
            reject(res.data.error);
          }
        })
        .catch((err) => {
          reject(err.response ? err.response.data : { error: 'Something went wrong, try agin' })
        });
    });
  }

  static check_paper_can_correct(users_paper_id: number) {
    return new Promise((resolve, reject) => {
      console.log("check_paper_can_correct users papers id " + users_paper_id);
      console.log("/users_papers/" + users_paper_id + "/check_paper_can_correct.json")
      axiosInstance
        .get("/users_papers/" + users_paper_id + "/check_paper_can_correct.json")
        .then((res) => {
          if (res.data) {
            resolve(res.data);
          } else {
            reject(res.data.error);
          }
        })
        .catch((err) => {
          reject(err.response ? err.response.data : { error: 'Something went wrong, try agin' })
        });
    });
  }

  static check_paper_can_proofread(users_paper_id: number) {
    return new Promise((resolve, reject) => {
      console.log("check_paper_can_proofread users papers id " + users_paper_id);
      console.log("/users_papers/" + users_paper_id + "/check_paper_can_proofread.json")
      axiosInstance
        .get("/users_papers/" + users_paper_id + "/check_paper_can_proofread.json")
        .then((res) => {
          if (res.data) {
            resolve(res.data);
          } else {
            reject(res.data.error);
          }
        })
        .catch((err) => {
          reject(err.response ? err.response.data : { error: 'Something went wrong, try agin' })
        });
    });
  }

  static start_edit_paper(paper_id: number) {
    // /users_papers/\(users_paper_id)/start_correction
    return new Promise((resolve, reject) => {
      console.log("start_edit_paper papers id " + paper_id);
      console.log("/users_papers.json")
      axiosInstance
        .post("/users_papers.json",{ "users_paper": {"is_model_answer": false, "paper_id": paper_id}})
        .then((res) => {
          if (res.data) {
            resolve(res.data);
          } else {
            reject(res.data.error);
          }
        })
        .catch((err) => {
          reject(err.response ? err.response.data : { error: 'Something went wrong, try agin' })
        });
    });
  }

  static start_correction(users_paper_id: number) {
    // /users_papers/\(users_paper_id)/start_correction
    return new Promise((resolve, reject) => {
      console.log("start_correction users papers id " + users_paper_id);
      console.log("/users_papers/" + users_paper_id + "/start_correction.json")
      axiosInstance
        .post("/users_papers/" + users_paper_id + "/start_correction.json")
        .then((res) => {
          if (res.data) {
            resolve(res.data);
          } else {
            reject(res.data.error);
          }
        })
        .catch((err) => {
          reject(err.response ? err.response.data : { error: 'Something went wrong, try agin' })
        });
    });
  }

  static start_proofread(users_paper_id: number) {
    return new Promise((resolve, reject) => {
      console.log("start_proofread users papers id " + users_paper_id);
      console.log("/users_papers/" + users_paper_id + "/start_proofread.json")
      axiosInstance
        .post("/users_papers/" + users_paper_id + "/start_proofread.json")
        .then((res) => {
          if (res.data) {
            resolve(res.data);
          } else {
            reject(res.data.error);
          }
        })
        .catch((err) => {
          reject(err.response ? err.response.data : { error: 'Something went wrong, try agin' })
        });
    });
  }

  static submit_proofread(users_paper_id: number, users_questions: any, comment?: string) {
    return new Promise((resolve, reject) => {
      console.log("submit_proofread users papers id " + users_paper_id);
      console.log("/users_papers/" + users_paper_id + "/submit_proofread.json")
      axiosInstance
        .post("/users_papers/" + users_paper_id + "/submit_proofread.json",{
          is_submited: true,
          comment: comment,
          users_questions: users_questions
        })
        .then((res) => {
          if (res.data) {
            resolve(res.data);
          } else {
            reject(res.data.error);
          }
        })
        .catch((err) => {
          reject(err.response ? err.response.data : { error: 'Something went wrong, try agin' })
        });
    });
  }

  /**
   * 更改做卷狀態
   * @param users_paper_id 
   * @param status 
   * @returns 
   */
  static set_status_by_teacher(users_paper_id: number, status: string) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post("/users_papers/" + users_paper_id + "/set_status_by_teacher.json",{status: status})
        .then((res) => {
          if (res.data) {
            resolve(res.data);
          } else {
            reject(res.data.error);
          }
        })
        .catch((err) => {
          reject(err.response ? err.response.data : { error: 'Something went wrong, try agin' })
        });
    });
  }

  static watch_video_once(users_paper_id: number, question_id: number) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post("/users_papers/" + users_paper_id + "/watch_video_once.json",{question_id: question_id})
        .then((res) => {
          if (res.data.doc) {
            resolve(res.data.doc);
          } else {
            reject(res.data.error);
          }
        })
        .catch((err) => {
          reject(err.response ? err.response.data : { error: 'Something went wrong, try agin' })
        });
    });
  }
}