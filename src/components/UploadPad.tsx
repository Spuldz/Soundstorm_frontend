import { useEffect, useRef, useState } from 'react'
import styles from '../css/uploadPad.module.css'
import { ISong } from '../types/Song'
import axios from 'axios'
import appData from '../appData.json'
import { useCookies } from 'react-cookie'
import { UploadPadInfo } from './UploadPadInfo'

export const UploadPad = () => {

    const [isPublic, setPublic] = useState<boolean>(false)
    const [file, setFile] = useState<any>()
    const [cookies, setCookies, removeCookies] = useCookies()
    const [info, setInfo] = useState({})
    const fileRef = useRef<any>()
    const thumbnailRef = useRef<any>()

    const selectFile = () => {
        fileRef.current.click()
    }

    

    const uploadSong = (audioFile:any, info:any, thumbnailFile:any) => {
        const form = new FormData();

        const data = {...info}
        data.public = isPublic
    
        form.append("audio", audioFile);
        form.append("info", JSON.stringify(data));
        form.append("thumbnail", thumbnailFile);
    
        axios.post(`${appData.apiUrl}/song`, form, {
            headers: {
                "Authorization": `Bearer ${cookies.accessToken}`
            }
        }).then(
            res => {
                console.log(res.data.song);
            }
        ).catch(error => {
            console.error("Upload error:", error);
        });
    };


    return(
        <>
        {typeof file === 'undefined' ? (
        <div className={styles.main}>
            <span className={styles.p1}>Upload Your Track</span>
            <div className={styles.btn} onClick={selectFile}>
                Choose File
            </div>
            <div>
                <label>
                    Privacy: 
                    <input type='radio' onChange={() => setPublic(true)} checked={isPublic}/>
                    <span>Public</span>
                    <input type='radio' onChange={() => setPublic(false)} checked={!isPublic}/>
                    <span>Private</span>
                </label>
            </div>
            <div style={{display: "none"}}>
                <input type='file' ref={fileRef} onChange={() => setFile(fileRef.current.files[0])}
                accept='audio/*'/>
            </div>
        </div>
        ) : (
            <UploadPadInfo onUpload={(i:any, t:any) => uploadSong(file, i, t)}/>
        )}
        </>
    )
}