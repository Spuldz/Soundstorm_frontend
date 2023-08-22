import { useContext, useEffect, useState } from 'react'
import styles from '../css/audioBar.module.css'
import { audioContext } from '../App'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import appData from '../appData.json'
import prev from '../assets/audio_controls/icons8-previous-30.svg'
import play from '../assets/audio_controls/icons8-play-button-30_2.svg'
import pause from '../assets/audio_controls/icons8-pause-button-24_2.svg'
import next from '../assets/audio_controls/icons8-last-64.svg'
import audio from '../assets/audio_controls/icons8-audio-48.svg'
import { AudioProgressBar } from './AudioProgressBar'
import { audioPause, audioPlay, getSong } from '../services/audioControls'
import { Volume } from './Volume'

export const AudioBar = () => {

    const [playing, setPlaying] = useState(false)
    const [audioData, setAudioData] = useContext(audioContext)
    const [playingAudioData, setPlayingAudioData] = useState<any>(null)
    const [playingAudio, setPlayingAudio] = useState<HTMLAudioElement>(new Audio())
    const [cookies, setCookies] = useCookies()
    const [active, setActive] = useState<boolean>(true)
    const [progress, setProgress] = useState(0)



    function handlePlayPause(){
        if(playing){
            audioPause(playingAudio, setPlaying(false))
        }else{
            audioPlay(playingAudio, setPlaying(true))
        }
    }


    useEffect(() => {
         
        const handleData = async () => {        

            if(!audioData){
                return
            }

            if(audioData?._id !== playingAudioData?._id){


                if(playing){
                    playingAudio?.pause()
                }

                const song:HTMLAudioElement = await getSong(() => setActive(true), audioData, cookies) as HTMLAudioElement
                setPlayingAudio(song)
                setPlayingAudioData(audioData)
                setPlaying(true)
                song.play()
                return

            }else{
                if(playing){
                    playingAudio?.pause()
                    setPlaying(false)
                }else{
                    playingAudio?.play()
                    setPlaying(true)
                }

            }
        }

        handleData()
        .catch(
            err => console.log(err)
        )
        
    }, [audioData])

    useEffect(() => {
        if(!playingAudio){return}

        playingAudio.ontimeupdate = () => {
            const percent = (playingAudio.currentTime / playingAudio.duration) * 100
            setProgress(percent)
        }

    }, [playingAudio])
    

    return(
        <div className={active ? styles.main : styles.hidden}>
            <div className={styles.middleCont}>
                <img className={styles.control} src={prev} />
                <img className={styles.control} src={playing ? pause : play} onClick={handlePlayPause}/>
                <img className={styles.control} src={next}/>
                <AudioProgressBar duration={progress} onChange={(t:number) => playingAudio.currentTime = (t / 100) * playingAudio.duration}/>
                <Volume onChange={(v:number) => playingAudio.volume = v}/>
            </div>
        </div>
    )
}