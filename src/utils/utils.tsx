import { differenceInHours } from "date-fns"

const formatHintsIndex = (originIndex: string | number) => {
  return Number(originIndex) > 9 ? originIndex.toString() : `0${Number(originIndex)}`
}

const calculateTime = (originTime: string) => {
  if (!originTime) {
    return '--'
  }
  let status = ''
  const diffTime = differenceInHours(new Date(), new Date(originTime))
  if (diffTime < 1) {
    status = '刚刚活跃'
  } else if (diffTime < 24) {
    status = `${diffTime}小时前在线`
  } else if (diffTime < 24 * 7) {
    status = `${Math.floor(diffTime / 24)}天前在线`
  } else {
    status = `${Math.floor(diffTime / (24 * 7))}周前在线`
  }
  return status
}

const calculateSize = (originSize: number) => {
  if (!originSize) {
    return '--'
  }
  let status = ''
  if (originSize < 1024) {
    status = `${originSize}KB`
  } else if (originSize < 1024 * 1024) {
    status = `${(originSize / 1024).toFixed(2)}MB`
  } else if (originSize < 1024 * 1024 * 1024) {
    status = `${(originSize / 1024 / 1024).toFixed(2)} GB`
  }
  return status
}

export {
  formatHintsIndex,
  calculateTime,
  calculateSize,
}
