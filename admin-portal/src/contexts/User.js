import { createContext, userState, useEffect } from 'react'
import { useToken } from 'hooks'

const UserContext = createContext()

const UserProvider = ({ location }) => {
  const [user, setUser] = useState({ id: null, email: null, dietaryRequirements: null })
  const token = useToken(location)

  return (
    <UserContext.Provider value={}>

    </UserContext.Provider>
  )
}
