import axiosInstance from '../helper/axiosInstance';

export default class PaperService {

  // load users papers 
  static papers_can_do(id: number) {
    return new Promise((resolve, reject) => {
      console.log("loading paper " + id);
      axiosInstance
        .get("/me/papers_can_do/" + id + ".json")
        .then((res) => {
          if (res.data.doc) {
            resolve(res.data.doc);
          } else {
            reject(res.data.error);
          }
        })
        .catch((err) => {
          console.log("err.response.status",err);
          
          reject(err.response ? err.response.data : { error: 'Something went wrong, try agin' })
        });
    });
  }

  // load paper pages content
  static load(id: number) {
    return new Promise((resolve, reject) => {
      console.log("loading paper " + id);
      axiosInstance
        .get("/papers/" + id + ".json")
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