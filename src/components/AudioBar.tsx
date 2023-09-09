import { useContext, useEffect, useState } from 'react'
import styles from '../css/audioBar.module.css'
import { audioContext, playingContext } from '../App'
import { useCookies } from 'react-cookie'
import prev from '../assets/audio_controls/icons8-previous-30.svg'
import play from '../assets/audio_controls/icons8-play-button-30_2.svg'
import pause from '../assets/audio_controls/icons8-pause-button-24_2.svg'
import next from '../assets/audio_controls/icons8-last-64.svg'
import { AudioProgressBar } from './AudioProgressBar'
import { audioPause, audioPlay, getNextSong, getPrevSong, getSong } from '../services/audioControls'
import { Volume } from './Volume'
import { songsContext } from '../App'


export const AudioBar = () => {

    const [playing, setPlaying] = useContext(playingContext)
    const [audioData, setAudioData] = useContext(audioContext)
    const [playingAudioData, setPlayingAudioData] = useState<any>(null)
    const [playingAudio, setPlayingAudio] = useState<HTMLAudioElement>(new Audio())
    const [cookies, setCookies] = useCookies()
    const [active, setActive] = useState<boolean>(false)
    const [progress, setProgress] = useState(0)
    const [songs, setSongs] = useContext(songsContext)



    function handlePlayPause(){
        if(playing){
            audioPause(playingAudio, () => setPlaying(false))
        }else{
            audioPlay(playingAudio, () => setPlaying(true))
        }
    }

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

    useEffect(() => {

        handleData()
        .catch(
            err => console.log(err)
        )
        
    }, [audioData])

    useEffect(() => {
        if(!playingAudio){return}

        playingAudio.volume = 0.2

        playingAudio.ontimeupdate = () => {
            const percent = (playingAudio.currentTime / playingAudio.duration) * 100
            setProgress(percent)
        }

    }, [playingAudio])
    

    return(
        <div className={active ? styles.main : styles.hidden}>
            <div className={styles.middleCont}>
                <img className={styles.control} src={prev} onClick={() => setAudioData(getPrevSong(songs, audioData._id))}/>
                <img className={styles.control} src={playing ? pause : play} onClick={handlePlayPause}/>
                <img className={styles.control} src={next} onClick={() => setAudioData(getNextSong(songs, audioData._id))}/>
                <AudioProgressBar duration={progress} onChange={(t:number) => playingAudio.currentTime = (t / 100) * playingAudio.duration}/>
                <Volume onChange={(v:number) => playingAudio.volume = v}/>
            </div>
        </div>
    )
}