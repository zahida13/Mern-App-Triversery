import React, { useEffect } from 'react'
import { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'


const Login = () => {

  const [formData , setFormData] = useState({
    email: '', 
    password: '',
  }) 

  const {email, password} = formData 

  const naviagate = useNavigate()
  const dispatch = useDispatch()
const {user, isLoading, isSuccess, isError, message} = useSelector((state) => state.auth) 


const  onSubmit = (e) => {
      e.preventDefault()

       
        const userData = {
           email, password
        }
        dispatch(login(userData))
      

  }


    useEffect (() => {
      if(isError) {
        toast.error(message)
      }

      if(isSuccess || user) {
        naviagate('/')
      }
      dispatch(reset)
    }, [user, isError, isLoading, isSuccess, message,naviagate, dispatch])
  const onChange = (e) => {
    setFormData((previosState) => ({
      ...previosState, [e.target.name]: e.target.value
      
    }))
  }
  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login To Your Account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
           
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>
                   <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login