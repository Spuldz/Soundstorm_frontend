import styles from '../css/header.module.css'
import logo from '../assets/logo.svg'
import { HeaderOption } from './HeaderOption'
import pfp from '../assets/pfp.svg'
import notification from '../assets/notification.svg'
import mail from '../assets/mail.svg'
import dots from '../assets/dots.svg'
import { useNavigate } from 'react-router-dom'

export const Header = () => {

    const navigate = useNavigate()

    return(
        <div className={styles.main}>
            <div className={styles.left}>
                <img src={logo}/>
            </div>
            <div className={styles.right}>
                <HeaderOption text='Home' path='/discover'/>
                <HeaderOption text='Feed' path='/feed'/>
                <HeaderOption text='Libary' path='/libary'/>
                <input className={styles.search} placeholder='Search'/>
                <div className={styles.rightOptions}>
                    <span onClick={() => navigate("/upload")}>Upload</span>
                    <div className={styles.pfp} style={{backgroundImage: "URL("+pfp+")"}}></div>
                    <div className={styles.icon} style={{backgroundImage: "URL("+notification+")"}}></div>
                    <div className={styles.icon} style={{backgroundImage: "URL("+mail+")"}}></div>
                    <div className={styles.icon} style={{backgroundImage: "URL("+dots+")"}}></div>
                </div>
            </div>
        </div>
    )
}