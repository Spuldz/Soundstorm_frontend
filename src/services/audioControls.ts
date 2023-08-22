import axios from "axios"
import appData from '../appData.json'
import { useCookies } from "react-cookie"

export const audioPause = (audio:any, onPause:any) => {
    audio.pause()
    onPause()
}

export const audioPlay = (audio:any, onPlay:any) => {
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