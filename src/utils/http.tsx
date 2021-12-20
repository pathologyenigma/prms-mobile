import * as Auth from './auth'

const post = (uri: string, body = {}) => {
  return fetch(uri, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    credentials: 'same-origin',
  })
    .then(response => response.json())
    .then(json => Promise.resolve(json))
    .catch(e => Promise.reject(e))
}
// 'Content-Type': 'multipart/form-data; charset = utf-8',
const postImage = (uri: string, formData: FormData) => {
  console.log('body: ', formData)
  return fetch(uri, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data;charset=utf-8',
    },
    body: formData,
  })
    .then(response => {
      console.log('111111111: ', response)
      response.json()
    })
    .then(json => console.log('333: ', json))
    .catch(e => console.log('2222222: ', e))
}

const postWithToken = (uri: string, body = {}) => {
  return Auth.getToken()
    .then(token =>
      fetch(uri, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          jwtsessiontoken: token ?? '',
        },
        body: JSON.stringify(body),
        credentials: 'same-origin',
      }),
    )
    .then(response => response.json())
    .then(json => Promise.resolve(json))
    .catch(e => Promise.reject(e))
}

const patchWithToken = (uri: string, body = {}) => {
  return Auth.getToken()
    .then(token =>
      fetch(uri, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          jwtsessiontoken: token ?? '',
        },
        body: JSON.stringify(body),
        credentials: 'same-origin',
      }),
    )
    .then(response => response.json())
    .then(json => Promise.resolve(json))
    .catch(e => Promise.reject(e))
}

const putWithToken = (uri: string, body = {}) => {
  return Auth.getToken()
    .then(token =>
      fetch(uri, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          jwtsessiontoken: token ?? '',
        },
        body: JSON.stringify(body),
        credentials: 'same-origin',
      }),
    )
    .then(response => response.json())
    .then(json => Promise.resolve(json))
    .catch(e => Promise.reject(e))
}

const get = (uri: string, timeout: number = 30000) => {
  const request = () => {
    return fetch(uri)
      .then(response => response.json())
      .then(json => Promise.resolve(json))
      .catch(e => Promise.reject(e))
  }

  if (timeout) {
    return Promise.race([
      request(),
      new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('request timeout')), timeout)
      }),
    ])
  }
  return request()
}

const getWithToken = (uri: string, token?: string, timeout: number = 30000) => {
  const request = () => {
    return Auth.getToken()
      .then(token =>
        fetch(uri, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            jwtsessiontoken: token ?? '',
          },
        }),
      )
      .then(response => response.json())
      .then(json => Promise.resolve(json))
      .catch(e => Promise.reject(e))
  }

  if (timeout) {
    return Promise.race([
      request(),
      new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error('request timeout')), timeout)
      }),
    ])
  }
  return request()
}

const graphql = (uri: string, body = '') => {
  return fetch(uri, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/graphql',
    },
    body,
    credentials: 'same-origin',
  })
    .then(r => r.json())
    .then(json => Promise.resolve(json))
    .catch(ex => Promise.reject(ex))
}

// 是否登录
const uploadFile = (
  uri: string,
  opts: any,
  callback?: (error: any, result?: any) => void,
  onProgress?: (error: any, result?: any) => void,
) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(opts.method || 'post', uri)
    for (const k in opts.headers || {}) {
      if (opts.headers[k]) {
        xhr.setRequestHeader(k, opts.headers[k])
      }
    }
    xhr.onload = e => resolve(e)
    xhr.onreadystatechange = e => {
      if (xhr.readyState !== 4) {
        return
      }
      // 阿里云状态码需在opt 中指定 success_action_status : '200'
      if (xhr.status === 200) {
        if (callback) {
          callback(undefined, xhr)
        }
      } else if (callback) {
        callback(xhr)
      }
    }
    xhr.onerror = reject
    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = onProgress
    }
    xhr.setRequestHeader('Content-Type', 'multipart/form-data')
    xhr.send(opts.body)
  })
}

export {
  get,
  getWithToken,
  post,
  postWithToken,
  graphql,
  patchWithToken,
  putWithToken,
  postImage,
  uploadFile,
}
