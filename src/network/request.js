import axios from 'axios'



export function request(config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/h8',
    timeout: 5000
  })

  //响应拦截
  instance.interceptors.response.use(res => {
    return res.data;
  }, err => {
    console.log(err);
  })

  // 发送网络请求
  return instance(config)
}
