import axios from "axios"
import appData from '../appData.json'
import { useCookies } from "react-cookie"
import { ISong } from "../types/Song"

export const audioPause = (audio:any, onPause:Function ) => {
    audio.pause()
    onPause()
}

export const audioPlay = (audio:any, onPlay:Function) => {
    audio.play()
    onPlay()
}


export function getSong(onGet:Function, audioData:any, cookies:any){
    onGet()
    return new Promise((resolve, reject) => {
        axios.get(`${appData.apiUrl}/song/getAudio/${audioData.fileName}`, {
            responseType: 'blob',
            headers:{
                "Authorization": `Bearer ${cookies.accessToken}`
            }
        })
        .then(res => {
            const audioURL = URL.createObjectURL(res.data)
            resolve(new Audio(audioURL))
        }).catch(
            err => {
                reject(err)
            }
        )
    })
}

export function getNextSong(songs:ISong[], currentSongId:string){
    const currentSong = songs.filter(s => s._id === currentSongId) as any
    const index:number = songs.indexOf(currentSong[0])
    let nextSong = songs[index + 1]

    if(!nextSong){
        nextSong = songs[0]
    }

    return nextSong
}

export function getPrevSong(songs:ISong[], currentSongId:string){
    const currentSong = songs.filter(s => s._id === currentSongId) as any
    const index:number = songs.indexOf(currentSong[0])
    let nextSong = songs[index - 1]

    if(!nextSong){
        nextSong = songs[songs.length - 1]
    }

    return nextSong
}