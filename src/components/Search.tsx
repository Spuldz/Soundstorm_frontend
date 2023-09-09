import { useNavigate } from 'react-router-dom'
import styles from '../css/search.module.css'
import { ISong } from '../types/Song'

type Props = {
    data?: ISong
}

export const Search = (props: Props) => {

    const nav = useNavigate()

    return(
        <div className={styles.main} onClick={() => nav(`/song/${props.data?._id}`)}>
            <span>{props.data?.name}</span>
        </div>
    )
}