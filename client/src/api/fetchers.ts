import axios from 'axios'

export const getter = (url: string, params?: { arg?: any }) => {
  return axios
    .get(url, {
      withCredentials: true,
      params,
    })
    .then((res) => res.data)
}

export const putter = async (url: string, { arg }: { arg: any }) => {
  return axios.put(url, arg).then((res) => res.data)
}

export const poster = async (url: string, { arg }: { arg: any }) => {
  return axios.post(url, arg).then((res) => res.data)
}

export const deleter = async (url: string, params?: { arg?: any }) => {
  const { arg } = params || {}

  return axios.delete(url, { params: arg }).then((res) => res.data)
}
