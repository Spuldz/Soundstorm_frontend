import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import appData from '../appData.json'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { Header } from '../components/Header'
import styles from '../css/home.module.css'
import { Song } from '../components/Song'
import { ISong } from '../types/Song'
import { songsContext } from '../App'

export const Home = () => {

    const [user, setUser] = useState()
    const [cookies, setCookies, removeCookies] = useCookies()
    const [songs, setSongs] = useContext<any[]>(songsContext)
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

        if(songs.length === 0){
            axios.get(`${appData.apiUrl}/song/public`, {
                headers:{
                    "Authorization": `Bearer ${accessToken}`
                }
            })
            .then(res => {
                console.log("hey")
                setSongs(res.data.songs)
                console.log(res.data)
            })
            .catch(err => console.log(err))
        }


    }, [])



    return(
        <div>   
            <Header/>
            <div className={styles.main}>
                <p>All Songs</p>
                <div className={styles.all}>
                    {songs.length === 0 ? (
                        <p>Loading...</p>
                    ) : (
                        songs.map((song:ISong, i:number) => (
                            <Song data={song} key={i} />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}