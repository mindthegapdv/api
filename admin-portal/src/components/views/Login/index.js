import React from 'react';
import { useAuth0 } from 'auth'

export const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button onClick={loginWithRedirect}>
      Login
    </button>
  )
}
