import { useEffect, useRef, useState } from 'react'
import appData from '../appData.json'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { Header } from '../components/Header'
import styles from '../css/home.module.css'
import { Song } from '../components/Song'
import { ISong } from '../types/Song'

export const Home = () => {

    const [user, setUser] = useState()
    const [cookies, setCookies, removeCookies] = useCookies()
    const [songs, setSongs] = useState<ISong[]>()
    const [playing, setPlaying] = useState(false)
    const [playingAudio, setPlayingAudio] = useState<any>()

    async function getUser(){
        const accessToken = cookies.accessToken

        const res = await axios.get(`${appData.apiUrl}/user`, {
            headers:{
                "Authorization": `Bearer ${accessToken}`
            }
        })

        return res.data.user
    }

    useEffect(() => {
        const accessToken = cookies.accessToken
        async function inner() {
            setUser(await getUser())
        }

        inner()

        if(typeof songs === 'undefined'){
            axios.get(`${appData.apiUrl}/song`, {
                headers:{
                    "Authorization": `Bearer ${accessToken}`
                }
            })
            .then(res => {
                setSongs(res.data.songs)
                console.log(res.data)
            })
            .catch(err => console.log(err))
        }


    }, [])

    const handleInteraction = (audio:any) => {

        if(playingAudio === audio){
           if(playing){
            audio.pause()
            setPlaying(false)
            return
           }else{
            audio.play()
            setPlaying(true)
            return
           }
        }

        if(typeof playingAudio !== 'undefined' && playing){
            playingAudio.pause()
            setPlayingAudio(audio)
            audio.currentTime = 0
            audio.play()
        }else{
            audio.currentTime = 0
            audio.play()
            setPlaying(true)
            setPlayingAudio(audio)
        }
    }

    return(
        <div>   
            <Header/>
            <div className={styles.main}>
                <p>All Songs</p>
                <div className={styles.all}>
                    {typeof songs === 'undefined' ? (
                        <p>Loading...</p>
                    ) : (
                        songs.map((song:ISong, i:number) => (
                            <Song data={song} key={i} handleInteraction={(audio:any) => {
                                handleInteraction(audio)
                            }}/>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}