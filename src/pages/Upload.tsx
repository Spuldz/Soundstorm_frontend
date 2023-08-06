import { Header } from "../components/Header"
import { UploadPad } from "../components/UploadPad"
import styles from '../css/upload.module.css'

export const Upload = () => {
    return(
        <div>
            <Header/>
            <div className={styles.main}>
                 <UploadPad onSelect={() => {}}/>
            </div>
        </div>
    )
}