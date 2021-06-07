import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <div className={styles.Header}>
        <Image
          src='/pexels-teddy-yang-2263410.jpg'
          alt='background image'
          layout='fill'
          object-fit='cover'
          objectPosition='center'
          className={styles.LandingImage}
        ></Image>
        <div className={styles.TextDiv}>
          <h1>Upcoming Events</h1>
        </div>
      </div>
    </div>
  )
}
