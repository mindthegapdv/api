import { useState, useEffect } from 'react'
import queryString from 'query-string'

export const useToken = location => {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const { token } = queryString.parse(location.search)
    setToken(token)
  }, [location])

  return token
}
