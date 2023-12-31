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
import { SongPage } from './pages/SongPage'

export const audioContext = createContext<any>({})
export const songsContext = createContext<any>([])
export const playingContext = createContext<any>(false)

function App() {

  const [cookies, setCookies, removeCookies] = useCookies()
  const navigate = useNavigate()

  const [audioData, setAudioData] = useState<ISong>()
  const [songs, setSongs] = useState<ISong[]>([])
  const [playing, setPlaying] = useState()

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
  <playingContext.Provider value={[playing, setPlaying]}>
    <songsContext.Provider value={[songs, setSongs]}>
      <audioContext.Provider value={[audioData, setAudioData]}>
        <div>
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/discover' element={<Home/>}/>
          <Route path='/upload' element={<Upload/>}/>
          <Route path='/song/:id' element={<SongPage/>}/>
        </Routes>
        <AudioBar/>
      </div>
      </audioContext.Provider>
    </songsContext.Provider>
  </playingContext.Provider>

  )
}

export default App
