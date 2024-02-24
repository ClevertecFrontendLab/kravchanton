import spin from "./../../assets/Lottie/spin.json";
import React from 'react'
import styles from './Loader.module.scss'
import Lottie from 'react-lottie-player'


export const Loader = () => <>
    <div className={styles.wrapper} data-test-id='loader'>
    </div>
    <div className={styles.loader}><Lottie
        loop
        animationData={spin}
        play
        style={{width: 150, height: 150}}
    />
    </div>
</>
