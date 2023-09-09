import styles from '../css/header.module.css'
import logo from '../assets/logo.svg'
import { HeaderOption } from './HeaderOption'
import pfp from '../assets/pfp.svg'
import notification from '../assets/notification.svg'
import mail from '../assets/mail.svg'
import dots from '../assets/dots.svg'
import { useNavigate } from 'react-router-dom'
import { Search } from './Search'
import { searchSongs } from '../services/song'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { ISong } from '../types/Song'

export const Header = () => {

    const navigate = useNavigate()
    const [query, setQuery] = useState<string>("")
    const [cookies, setCookies, removeCookies] = useCookies()
    const [songs, setSongs] = useState<ISong[]>([])

    useEffect(() => {
        if(query === ""){
            setSongs([])
            return
        }

        searchSongs(query, cookies.accessToken)
        .then(songs => {
            setSongs(songs)
        })

    }, [query])

    return(
        <div className={styles.main}>
            <div className={styles.left}>
                <img src={logo}/>
            </div>
            <div className={styles.right}>
                <HeaderOption text='Home' path='/discover'/>
                <HeaderOption text='Feed' path='/feed'/>
                <HeaderOption text='Libary' path='/libary'/>
                <div>
                     <input className={styles.search} placeholder='Search' onChange={(e) => setQuery(e.target.value)}/>
                     {songs.length !== 0 ? (
                        <div className={styles.searchWrapper}>
                            {songs.map((song:ISong, i:number) => {
                                return(
                                    <Search data={song} key={i}/>
                                )
                            })}
                        </div>
                     ) : null}
                </div>
                <div className={styles.rightOptions}>
                    <span onClick={() => navigate("/upload")}>Upload</span>
                    <div className={styles.pfp} style={{backgroundImage: "URL("+pfp+")"}}></div>
                    <div className={styles.icon} style={{backgroundImage: "URL("+notification+")"}}></div>
                    <div className={styles.icon} style={{backgroundImage: "URL("+mail+")"}}></div>
                    <div className={styles.icon} style={{backgroundImage: "URL("+dots+")"}}></div>
                </div>
            </div>
        </div>
    )
}