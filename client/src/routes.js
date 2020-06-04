import React from 'react'
import {Switch} from 'react-router-dom'
export const useRoutes = isAuth=>{
  if(isAuth){
    return(
      <Switch>
      </Switch>
    )
  }
  return(
    <>

    </>
  )
}