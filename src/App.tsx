import { createContext, useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route, Routes, useNavigate} from 'react-router-dom'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import axios from 'axios'
import appData from './appData.json'
import { Home } from './pages/Home'
import { useCookies } from 'react-cookie'
import { Upload } from './pages/Upload'
import { AudioBar } from './components/AudioBar'
import { ISong } from './types/Song'

export const audioContext = createContext<any>({})
export const songsContext = createContext<any>([])

function App() {

  const [cookies, setCookies, removeCookies] = useCookies()
  const navigate = useNavigate()

  const [audioData, setAudioData] = useState<ISong>()
  const [songs, setSongs] = useState<ISong[]>([])

  async function getAccessToken(){

    const refreshToken = cookies.refreshToken
    
    const res = await axios.get(`${appData.apiUrl}/auth/getAccessToken`, {
      headers:{
        "authorization": `Bearer ${refreshToken}`
      }
    })

    if(res.status === 401){
      navigate("/login")
    }

    return res.data.accessToken
  }

  useEffect(() => {

    

    if(cookies.refreshToken && cookies.accessToken){

      async function inner(){
        const accessToken = await getAccessToken()
        setCookies("accessToken", accessToken)
      }

      inner()

      setInterval(async () => {

        const accessToken = await getAccessToken()
        setCookies("accessToken", accessToken)
      }, 1000 * 60 * 13)
    }else{
      navigate("/login")
    }

    if(window.location.pathname === "/"){
      navigate('/discover')
    }
  }, [])

  return (
    <songsContext.Provider value={[songs, setSongs]}>
      <audioContext.Provider value={[audioData, setAudioData]}>
        <div>
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/discover' element={<Home/>}/>
          <Route path='/upload' element={<Upload/>}/>
        </Routes>
        <AudioBar/>
      </div>
      </audioContext.Provider>
    </songsContext.Provider>
  )
}

export default App
