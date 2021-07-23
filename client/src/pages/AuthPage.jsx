import React, { useState,useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage =() =>{
  // const message = useMessage()
  const {loading, request, error, clearError} = useHttp() 
  const [form, setForm] = useState({
    email:'',
    password:''
  })

  useEffect(() => {
    // message(error)
    clearError()
  }, [error, clearError]);
  const ChangeHandler = event=>{
    setForm({...form, [event.target.name] : event.target.value})
  }

  const registerHandler = async()=>{
    try {
      console.log('form-body: ', form);
      // clg
      const data = await request('/api/auth/register', 'POST', form)// !Ошибка когда мы делаем запрос на наш апи 
      console.log("Data", data);
    } catch (e) {
      // console.log( "ERROR FROM AUTH",e)
    }
  }

  return(
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи Ссылку</h1>
        <div className="card  blue darken-1">
        <div className="card-content white-text">
          <span className="card-title">Авторизация</span>
          <div>

            <div className="input-field">
              <input 
                placeholder="Введите емали" 
                id="email" 
                type="text" 
                name="email"
                className="yellow-input"
                onChange={ChangeHandler}
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="input-field">
              <input 
                placeholder="Введите пароль" 
                id="password" 
                type="password" 
                name="password"
                className="yellow-input"
                onChange={ChangeHandler}

              />
              <label htmlFor="password">Password</label>
            </div>
            
          </div>
        </div>
        <div className="card-action">
          <button 
            className="btn yellow darken-4"
            style={{marginRight:10}}
            disabled={loading}

          >
            Войти
          </button>
          <button 
            className="btn grey lighten-1 black-text"
            onClick={registerHandler}
            disabled={loading}
          >
            Регистрация
          </button>
        </div>
      </div>
      </div>
    </div> 
  )
}