import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from "react-router-dom"

function Login() {
    const history = useNavigate()
    const [credentials, setCredentials] = useState({
        email: undefined,
        password: undefined
    })

    const { loading, error, dispatch } = useContext(AuthContext)

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch({ type: "LOGIN_START" })
        try {
            const response = await axios.post("/user/login", credentials)
            dispatch({ type: "LOGIN_SUCCESS", payload: response.data })
            history("/")
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE", payload: error.response.data })
        }
    }
    return (
        <div>
            <h2>Login </h2>
            <input type="text" id="email" onChange={handleChange} placeholder='enter email'></input>
            <input type="text" id="password" onChange={handleChange} placeholder='enter password'></input>
            <button onClick={handleSubmit}>Submit</button>
        </div >
    )
}

export default Login
