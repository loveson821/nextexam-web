import User from "../../models/User";
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

    static signUp(user: User) {
      return new Promise((resolve, reject) => {
          axiosInstance
          .post('users.json', {
              user: user
            }).then((res) => {
              if (res.data.success) {
                  resolve(res.data);
                } else {
                  reject(res.data);
                }
          }).catch((err) => {
              reject(err.response ? err.response.data : { error: 'Something went wrong, try agin' })
          })
      })
  }

    static save(user: User) {
      return new Promise((resolve, reject) => {
          axiosInstance
          .put('me.json', { user: user }).then((res) => {
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

  static getInfo() {
    return new Promise((resolve, reject) => {
        axiosInstance
        .get('me.json').then((res) => {
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

  static modify_password (password: string) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post('me/reset_password.json', { password: password })
        .then((res) => {
          if (res.data.success) {
            resolve(res);
          } else {
            reject(res.data.error);
          }
        })
        .catch((err) => {
          reject(err.response ? err.response.data : { error: 'Something went wrong, try agin' })
        });
    });
  };

  static forget_password(email: string) {
    return new Promise((resolve, reject) => {
      axiosInstance
      .post('users/forget_password.json', {
        email: email
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