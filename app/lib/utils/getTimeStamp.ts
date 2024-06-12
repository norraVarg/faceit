const ONE_MINUTE = 60 * 1000
const ONE_HOUR = 60 * ONE_MINUTE
const ONE_DAY = 24 * ONE_HOUR

export const getTimeStamp = (time?: string) => {
  if (!time) return 'Long time ago'

  const diff = Date.now() - new Date(time).getTime()
  if (diff < ONE_MINUTE) {
    return 'Just now'
  } else if (diff < ONE_HOUR) {
    return `${Math.floor(diff / ONE_MINUTE)} minutes ago`
  } else if (diff < ONE_DAY) {
    return `${Math.floor(diff / ONE_HOUR)} hours ago`
  }

  return new Date(time).toLocaleString()
}