import { useState, useEffect } from 'react'
import queryString from 'query-string'
import { useRouter } from 'useRouter'

export const useToken = () => {
  const [token, setToken] = useState(null)
  const { search } = useRouter().location

  useEffect(() => {
    const { token } = queryString.parse(search)
    setToken(token)
  }, [search])

  return token
}
