import axiosInstance from "../helper/axiosInstance";
const querystring = require('query-string');

export default class MocksService {
    static groups() {
        return new Promise((resolve, reject) => {
            axiosInstance
            .get('me/groups.json').then((res) => {
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

    static courses(group_id: number) {
        return new Promise((resolve, reject) => {
            axiosInstance
            .get('courses/index_v2.json', { params: { group_id: group_id } }).then((res) => {
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

    static getLastMockDetail(curriculum_id: number, course_id: number) {
        console.log(`/curriculums/${curriculum_id}/last_mock.json?` + querystring.stringify(course_id))
        return new Promise((resolve, reject) => {
            axiosInstance
            .get(`curriculums/${curriculum_id}/last_mock.json`, { params: { course: course_id } }).then((res) => {
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

    static course_assignments(course_id: number, page: number, count: number) {
        return new Promise((resolve, reject) => {
            axiosInstance
            .get(`courses/${course_id}/assignments.json`, { params: { page: page, count: count } }).then((res) => {
                if (res.data) {
                    resolve(res.data);
                  } else {
                    reject(res.data.error);
                  }
            }).catch((err) => {
                reject(err.response ? err.response.data : { error: 'Something went wrong, try agin' })
            })
        })
    }

}