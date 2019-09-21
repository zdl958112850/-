var sleep = someTime => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('message')
    }, someTime * 1000)
  })
}

sleep(2).then(message => console.log(message))