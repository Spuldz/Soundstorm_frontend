import { ISong } from "../types/Song";
import styles from '../css/song.module.css'
import { useEffect, useState } from "react";
import appData from '../appData.json'
import axios from "axios";
import { useCookies } from "react-cookie";

export const Song = (props: {data?:ISong, handleInteraction:Function}) => {

    const [cookies, setCookies, removeCookies] = useCookies()
    const [audio, setAudio] = useState<any>()
    const [playing, setPlaying] = useState<boolean>()

    useEffect(() => {
        let audioURL:any;
        axios.get(`${appData.apiUrl}/song/getAudio/${props.data?.fileName}`, {
            responseType: 'blob',
            headers:{
                "Authorization": `Bearer ${cookies.accessToken}`
            }
        })
        .then(res => {
            audioURL = URL.createObjectURL(res.data)
            setAudio(new Audio(audioURL))
        })

    }, [])



    return(
        <div className={styles.main} onClick={() => props.handleInteraction(audio)}>
            <div className={styles.img} style={{backgroundImage: `URL(${props.data?.thumbnail})`}}></div>
            <div className={styles.data}>
                <span className={styles.artist}>{props.data?.ownerName}</span>
                <br/>
                <span className={styles.title}>{props.data?.name}</span>
            </div>
        </div>
    )
}