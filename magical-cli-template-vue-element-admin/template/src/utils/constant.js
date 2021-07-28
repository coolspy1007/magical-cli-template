const paginationData = (data = {}, pageNum = 1, pageSize = 20) => {
  return { pageNum, pageSize, data }
}

export {
  paginationData
}
