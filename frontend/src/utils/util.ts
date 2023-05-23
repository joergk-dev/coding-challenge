export function formatGermanDateTime(inputDate: Date) {
  let date, month, year, hour, minute

  date = inputDate.getDate()
  month = inputDate.getMonth() + 1
  year = inputDate.getFullYear()
  hour = inputDate.getHours()
  minute = inputDate.getMinutes()

  date = date.toString().padStart(2, '0')
  month = month.toString().padStart(2, '0')

  hour = hour.toString().padStart(2, '0')
  minute = minute.toString().padStart(2, '0')

  return `${date}.${month}.${year} ${hour}:${minute}`
}
