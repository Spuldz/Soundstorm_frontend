import { ButtonMain } from '../components/ButtonMain'
import { LabelInput } from '../components/LabelInput'
import {Link, useNavigate} from 'react-router-dom'
import styles from '../css/register.module.css'
import google from '../assets/google.svg'
import github from '../assets/github.svg'
import facebook from '../assets/facebook.svg'
import axios from 'axios'
import appData from '../appData.json'
import { useState } from 'react'

export const Register = () => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [username, setUsername] = useState<string>("")

    const navigate = useNavigate()


    const register = async (email:string, password:string, username:string) => {
        const res = await axios.post(`${appData.apiUrl}/auth/register`, {
            email,
            password,
            username
        })

        if(res.status !== 200){
            console.log(res)
            alert("something went wrong")
            return
        }
        console.log(res)
        navigate("/login")
    }

    return(
        <div className={styles.card}>
            <div className={styles.top}>
                <span>Sign Up</span>
            </div>
            <div className={styles.middle}>
                <LabelInput label='Email' onChange={(val:string) => setEmail(val)} size='large'/>
                <LabelInput label='Password' onChange={(val:string) => setPassword(val)} size='large'/>
                <ButtonMain text='Sign Up' onPress={() => register(email, password, email.split("@")[0])}/>
                <div className={styles.textSeparator}>
                    <span>Or</span>
                </div>
                <div className={styles.oauthOptions}>
                    <div className={styles.authOption} style={{
                        backgroundImage: "URL("+google+")"
                    }}></div>
                    <div className={styles.authOption} style={{
                        backgroundImage: "URL("+github+")"
                    }}></div>
                    <div className={styles.authOption} style={{
                        backgroundImage: "URL("+facebook+")"
                    }}></div>
                </div>
            </div>
            <div className={styles.bottom}>
                <Link to={'/login'} className={styles.link}>Already have an account? Sign In!</Link>
            </div>
            
        </div>
    )
}