import { useState, useEffect } from 'react'
import queryString from 'query-string'
import { useRouter } from 'useRouter'

export const useToken = () => {
  const [token, setToken] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const { token } = queryString.parse(router.location.search)
    setToken(token)
  }, [location])

  return token
}
