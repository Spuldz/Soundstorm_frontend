import styles from '../css/uploadPadInfo.module.css'
import { LabelInput } from './LabelInput'
import { ButtonMain } from './ButtonMain'
import { useEffect, useRef, useState } from 'react'
import defaultMusicLogo from '../assets/music_disk.png'

export const UploadPadInfo = (props: {onUpload:Function}) => {


    const [name, setName] = useState("")
    const [thumbnail, setThumbnail] = useState<any>()
    const [desc, setDesc] = useState("")
    const [thumbnailHover, setThumbnailHover] = useState(false)
    const [displayThumbnail, setDisplayThumbnail] = useState<any>()

    const fileRef = useRef<any>()

    async function fileFromUrl(url:string) {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], 'music_disk.png', { type: 'image/png' });
    }

    useEffect(() => {
        fileFromUrl(defaultMusicLogo).then(
            file => {
                setThumbnail(file)
                console.log(file)
            }
        ).catch(
            err => {
                console.error(err)
            }
        )
    }, [])

    useEffect(() => {
        let url = URL.createObjectURL(new Blob([thumbnail]))
        setDisplayThumbnail(url)

        return () => {
            URL.revokeObjectURL(url)
        }
    }, [thumbnail])

    return(
        <div className={styles.main}>
            <div className={styles.left}>
                <div className={styles.thumbnail}
                style={{backgroundImage: "URL("+displayThumbnail+")"}}
                onMouseEnter={() => setThumbnailHover(true)}
                onMouseLeave={() => setThumbnailHover(false)}
                onClick={() => fileRef.current.click()}>
                    {thumbnailHover ? <span className={styles.p1}>Upload Image</span> : null}
                    <input type='file' style={{display: 'none'}} ref={fileRef} onChange={() => setThumbnail(fileRef.current.files[0])}/>
                </div>
            </div>
            <div className={styles.right}>
                <LabelInput onChange={(val:string) => setName(val)} label='Name' size='small'/>
                <LabelInput onChange={(val:string) => {}} label='Tags' size='small'/>
                <label>
                    Description
                    <br/>
                    <textarea className={styles.desc} placeholder='Description...' onChange={(e) => setDesc(e.target.value)}>

                    </textarea>
                    <div>
                    <ButtonMain text='Upload' onPress={() => props.onUpload({
                        name,
                        desc,
                    }, thumbnail)}/>
                    </div>
                </label>
            </div>
        </div>
    )
}