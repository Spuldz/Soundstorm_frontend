import { useRef, useState } from 'react'
import img from '../assets/audio_controls/icons8-audio-48.svg'
import styles from '../css/volume.module.css'

export const Volume = (props: {onChange?:Function}) => {

    const volumeRef = useRef<any>()
    const [hovering, setHovering] = useState(false)

    return(
        <div className={styles.main}>
            <div className={styles.top}
            style={{opacity: hovering ? 1 : 0}}
            onMouseEnter={() => hovering ? setHovering(true) : null}
            onMouseLeave={() => setHovering(false)}>
                <input
                 type='range'
                 className={styles.input}
                 min={0}
                 max={100}
                 defaultValue={20}
                 onChange={() => props.onChange ? props.onChange(volumeRef.current.value / 100) : null}
                 ref={volumeRef}
                 disabled={!hovering}/>
            </div>
            <div className={styles.bottom}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}>
                <img className={styles.img} src={img}/>
            </div>
        </div>
    )
}