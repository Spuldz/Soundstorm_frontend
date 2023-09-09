import axios from "axios"
import appData from '../appData.json'



export const getSong = async (id:string, accessToken:string) => {
    const res = await axios.get(`${appData.apiUrl}/song/${id}`, {
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    })
    return res.data.song
}

export const searchSongs = async (query:string, accessToken:string) => {
    const res = await axios.get(`${appData.apiUrl}/song/search/${query}`, {
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
    })

    return res.data.songs
}