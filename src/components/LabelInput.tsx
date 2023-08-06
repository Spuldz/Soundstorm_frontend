import styles from '../css/labelInput.module.css'

type Props = {
    label:string
    onChange:Function
    size?: "large" | "small"
}

export const LabelInput = (props: Props) => {

    return(
            <label className={props.size === "large" ? styles.label : styles.labelSmall}>
                {props.label}
                <br/>
                <input type="text" className={props.size === "large" ? styles.input : styles.inputSmall}
                 onChange={(e) => props.onChange(e.target.value)}
                 placeholder={props.label}/>
            </label>
    )
}