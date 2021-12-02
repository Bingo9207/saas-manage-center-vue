import axios from 'axios'

const instance = axios.create({
  timeout: 1000,
  headers: {
    Authorization: "Basic ZGJzX3dlYjpkYnNfd2ViX3NlY3JldA=="
  }
});

instance.interceptors.request.use(function (config) {
  const tenantValue = sessionStorage.getItem("tenant");
  const token = sessionStorage.getItem("token");
  config.headers.tenant = tenantValue;
  config.headers.token = `Bearer ${token}`;
  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use(function (res) {
  // if (res.data.code !== undefined && res.data.code !== 0) {
  //   ElMessage({
  //     message: res.data.msg,
  //     type: 'error'
  //   })
  // }
  return res;
}, function (error) {
  return Promise.reject(error);
});

export function request(config) {
  if (!config.method) config.method = 'POST';
  return new Promise((resolve, reject) => {
    instance.request(config).then(
      res => {
        resolve(res.data);
      },
      err => {
        reject(err);
      }
    );
  });
}