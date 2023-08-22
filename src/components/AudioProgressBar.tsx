import styles from '../css/audioProgressBar.module.css'
import { audioContext } from '../App'
import { useContext, useRef } from 'react'



export const AudioProgressBar = (props: {onChange:Function, duration:number}) => {

    const audioRef = useRef<any>()

    return(
        <input type="range"
         min={0}
         max={100}
         className={styles.main} 
         defaultValue={0} 
         value={props.duration} 
         onChange={() => props.onChange(audioRef.current.value)} 
         ref={audioRef}/>
    )
}