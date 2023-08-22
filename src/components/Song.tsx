import styles from '../css/song.module.css'
import { useContext, useEffect, useState } from "react";
import { audioContext } from "../App";

export const Song = (props: {data:any}) => {

    const [audioData, setAudioData] = useContext(audioContext)



    return(
        <div className={styles.main} onClick={ () => {
            const data = {...props.data}
            setAudioData(data)
        }}>
            <div className={styles.img} style={{backgroundImage: `URL(${props.data?.thumbnail})`}}></div>
            <div className={styles.data}>
                <span className={styles.artist}>{props.data?.ownerName}</span>
                <br/>
                <span className={styles.title}>{props.data?.name}</span>
            </div>
        </div>
    )
}