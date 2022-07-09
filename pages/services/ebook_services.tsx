import axiosInstance from "../helper/axiosInstance";
const querystring = require('query-string');

export default class EbookService {
    static list(group_id: number) {
        return new Promise((resolve, reject) => {
            axiosInstance
            .get('books.json',  { params: { group_id: group_id } }).then((res) => {
                if (res.data.docs) {
                    resolve(res.data.docs);
                  } else {
                    reject(res.data.error);
                  }
            }).catch((err) => {
                reject(err.response ? err.response.data : { error: 'Something went wrong, try agin' })
            })
        })
    }
    static detail(book_id: number) {
        return new Promise((resolve, reject) => {
            axiosInstance
            .get(`books/${book_id}.json`).then((res) => {
                if (res.data.doc) {
                    resolve(res.data.doc);
                  } else {
                    reject(res.data.error);
                  }
            }).catch((err) => {
                reject(err.response ? err.response.data : { error: 'Something went wrong, try agin' })
            })
        })
    }
}