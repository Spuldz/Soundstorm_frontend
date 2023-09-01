import { useEffect, useState } from "react"
import { Header } from "../components/Header"
import styles from '../css/songPage.module.css'
import { ISong } from "../types/Song"
import { getSong } from "../services/song"
import { useParams } from "react-router-dom"
import { useCookies } from "react-cookie"

export const SongPage = () => {

    const [song, setSong] = useState<ISong>()
    const {id} = useParams()
    const [cookies, setCookies, removeCookies] = useCookies()

    useEffect(() => {
        getSong(id as string, cookies.accessToken)
        .then(res => {
            setSong(res)
        }).catch(err => console.log(err))
    }, [])

    return(
        <div>
            <Header/>
            <div className={styles.main}>
                <div className={styles.songWrapper}>
                    {typeof song === 'undefined' ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                        <div className={styles.songLeft}>
                            {song.name}
                        </div>
                        <div className={styles.songRight}
                        style={{backgroundImage: `URL(${song.thumbnail})`}}>
                        </div>

                        </>   
                    )}
                </div>
                <div className={styles.info}>
                    <div className={styles.infoLeft}>
                        <p>{song?.desc}</p>
                    </div>
                    <div className={styles.infoRight}></div>
                </div>
            </div>
           
        </div>
    )
}