import { LabelInput } from '../components/LabelInput'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../css/register.module.css'
import google from '../assets/google.svg'
import github from '../assets/github.svg'
import facebook from '../assets/facebook.svg'
import { ButtonMain } from '../components/ButtonMain'
import axios from 'axios'
import appData from '../appData.json'
import { useState } from 'react'
import { useCookies } from 'react-cookie'

export const Login = () => {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate()
    const [cookies, setCookies, removeCookies] = useCookies()

    
    
    const login = async (email:string, password:string) => {
        try {
            const res = await axios.post(`${appData.apiUrl}/auth/login`, {
                email,
                password
            })
    
            if(res.status !== 200){
                console.log(res)
                alert("something went wrong")
                return
            }
    
    
            setCookies("accessToken", res.data.accessToken)
            setCookies("refreshToken", res.data.refreshToken)
            console.log(res)
            navigate("/discover")
        } catch (error) {
            alert("something went wrong")
            return
        }
    }

    return(
        <div className={styles.card}>
        <div className={styles.top}>
            <span>Login</span>
        </div>
        <div className={styles.middle}>
            <LabelInput label='Email' onChange={(val:string) => setEmail(val)} size='large'/>
            <LabelInput label='Password' onChange={(val:string) => setPassword(val)} size='large'/>
            <ButtonMain text='Login' onPress={() => login(email, password)}/>
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
            <Link to={"/register"} className={styles.link}>Dont have an account? Sign Up!</Link>
        </div>
    </div>
    )
}