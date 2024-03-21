import React, { useState } from 'react'
import SignIn from '../components/SingIn'
import SignUp from '../components/SignUp'


export default function UserScreen({setLoged, setIdNumber, setUser}) {
  const [newUser, setNewUser] = useState(false)
  return (
    <div>
      {!newUser ? 
       <SignIn setNewUser={setNewUser} setUser={setUser} setLoged={setLoged} setIdNumber={setIdNumber}/>
        :
       <SignUp setNewUser={setNewUser} setUser={setUser} setLoged={setLoged} setIdNumber={setIdNumber}/>
      }
      
    </div>
  )
}
