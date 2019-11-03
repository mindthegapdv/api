import React, { createContext, useState, useEffect } from 'react'
import { useToken } from 'hooks'
import { fetchUserPreferences } from 'api'

const UserContext = createContext()

const Provider = props => {
  const [user, setUser] = useState({ token: useToken(), id: null, email: null, dietaryRequirements: null })

  useEffect(() => {
    if (token) {
      fetchUserPreferences(token).then(({ id, email, dietaryRequirements }) => {
        setUser({ id, email, dietaryRequirements })
      })
    }
  }, [token])

  return (
    <UserContext.Provider value={{}}>
      {props.children}
    </UserContext.Provider>
  )
}

const Consumer = UserContext.Consumer

export { Provider, Consumer }
