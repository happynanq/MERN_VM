import {useState, useCallback} from "react"

export const useHttp = ()=>{
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null )
  const request = useCallback(async(url, method ="GET", body=null, headers={})=>{
    console.log("body", body)
    setLoading(true)
    try {
      if(body){
        body=JSON.stringify(body)
        headers['Content-type'] = 'application/json'
        headers["Accepts"] = "application/json"
      }  
        
      console.log('data',' method', method, " url",url, " body",body, ' headers',headers);
      
      const response = await fetch(url,{method,body, headers}) // !ОШИБКА
      console.log('end req', response.ok)
      
      const data= await response.json()
      if(!response.ok){
        throw new Error(data.massage || 'Что-то пошло не так')
      }
      setLoading(false)
      return data
    } catch (e) {
      setLoading(false)
      setError(e.message)
      throw e
    }
  }, [])
  const clearError = useCallback(()=>setError(null), [])
  return {loading, error, request, clearError}
}