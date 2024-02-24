import spin from "./../../assets/Lottie/spin.json";
import React from 'react'
import styles from './Loader.module.scss'
import Lottie from 'react-lottie-player'


export const Loader = () => <>
    <div className={styles.wrapper} >
    </div>
    <div className={styles.loader} ><Lottie
        loop
        animationData={spin}
        play
        data-test-id='loader'
        style={{width: 150, height: 150}}
    />
    </div>
</>
