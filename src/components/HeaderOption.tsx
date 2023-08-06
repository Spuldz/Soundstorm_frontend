import { useNavigate } from 'react-router-dom'
import styles from '../css/headerOption.module.css'

type Props = {
    text:string
    path:string
}

export const HeaderOption = (props: Props) => {

    const navigate = useNavigate()

    return(
        <div
         onClick={() => navigate(props.path)}
         className={window.location.pathname.includes(props.path) ? styles.selected : styles.main}>
            <span>{props.text}</span>
        </div>
    )
}