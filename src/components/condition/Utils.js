export  function generateSnowflakeId() {
  const timestamp = Date.now().toString(16).padStart(13, '0')
  const randomChars = Math.random().toString(36).substring(2, 10)

  return timestamp + randomChars
}
