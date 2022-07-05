import axiosInstance from "../helper/axiosInstance";

export default class AuthService {
    static signIn(username: string, password: string) {
        return new Promise((resolve, reject) => {
            axiosInstance
            .post('users/sign_in.json', {
                user: {
                  password: password,
                  email: username
                }
              }).then((res) => {
                if (res.data.success) {
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