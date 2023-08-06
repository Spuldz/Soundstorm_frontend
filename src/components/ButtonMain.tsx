import styles from '../css/buttonMain.module.css'

type Props = {
    text: string
    onPress: Function
}

export const ButtonMain = (props: Props) => {
    return(
        <div className={styles.main} onClick={() => props.onPress()}>
            <span>{props.text}</span>
        </div>
    )
}