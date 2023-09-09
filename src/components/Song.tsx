import styles from '../css/song.module.css'
import { useContext, useEffect, useState } from "react";
import { audioContext, playingContext } from "../App";
import { useNavigate } from 'react-router-dom';
import play from '../assets/play.png'
import pause from '../assets/pause.png'

export const Song = (props: {data:any}) => {

    const [audioData, setAudioData] = useContext(audioContext)
    const [hovering, setHovering] = useState(false)
    const [playing, setPlaying] = useContext(playingContext)

    const nav = useNavigate()

    const darkBackground = `linear-gradient(rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.5)),URL(${props.data?.thumbnail})`

    const lightBackground = `URL(${props.data?.thumbnail})`

  

    return(
        <div
          className={styles.main}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}          >
            <div
             className={styles.img}
             style={{backgroundImage: hovering ? darkBackground : lightBackground}}>
                {hovering ? <div className={styles.play}
                style={{
                    backgroundImage: `URL(${playing && props.data._id === audioData._id ? pause : play})`
                }}
                onClick={ () => {
                    const data = {...props.data}
                    setAudioData(data)
                }}></div> : null}
            </div>
            <div className={styles.data}
                onClick={() => nav(`/song/${props.data._id}`)}
            >
                <span className={styles.artist}>{props.data?.ownerName}</span>
                <br/>
                <span className={styles.title}>{props.data?.name}</span>
            </div>
        </div>
    )
}