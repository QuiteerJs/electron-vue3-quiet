const toFormData = (obj: object) => {
  const formData = new FormData()
  Object.keys(obj).forEach((key) => {
    if (Array.isArray(obj[key])) {
      obj[key].forEach((item: any) => {
        formData.append(key, item)
      })
      return
    }
    formData.append(key, obj[key])
  })
  return formData
}

export default toFormData
