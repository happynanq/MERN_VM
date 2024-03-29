import React from 'react'
import {Switch, Route, Redirect, Router} from 'react-router-dom'
import { LinksPage } from './pages/LinksPage'
import { CreatePage } from './pages/CreatePage'
import { DetailPage } from './pages/DetailPage'
import { AuthPage } from './pages/AuthPage'
export const useRoutes = isAuth=>{
  if(isAuth){
    return(
      <Switch>
        <Route path='/links' exact>
          <LinksPage/>
        </Route>
        <Route path='/create' exact>
          <CreatePage/>
        </Route>
        <Route path='/detail/:id'>
          <DetailPage/>
        </Route>
        <Redirect to="/create"/>
      </Switch>
    )
  }
  return(
    <Switch>
      <Route path="/">
        <AuthPage/>
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}