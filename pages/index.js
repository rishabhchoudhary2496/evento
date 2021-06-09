import Image from 'next/image'
import styles from '../styles/Home.module.css'
import moment from 'moment'
import Link from 'next/link'
import { faCalendar, faMapMarker } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Home({ data }) {
  console.log('data', data)
  return (
    <div>
      <div className={styles.Header}>
        <Image
          src='/bg.png'
          alt='background image'
          layout='fill'
          object-fit='cover'
          objectPosition='center'
          className={styles.LandingImage}
        ></Image>
        <div className={styles.TextDiv}>
          <h1 className={styles.h1}>
            Find An <span className={styles.span}>Event</span>
          </h1>
          <input
            type='text'
            className={styles.textBox}
            placeholder='Event'
          ></input>
          <input
            type='text'
            className={styles.textBox}
            placeholder='Location'
          ></input>
          <button className={styles.button}>Search</button>
        </div>
      </div>
      <div className={styles.main}>
        <h1 className={styles.heading}>Upcoming Events</h1>
        <div className={styles.eventGrid}>
          {data?.events?.map((event) => (
            <Link href={`/event/${event._id}`}>
              <div className={styles.card}>
                <Image
                  src={'/uploads/' + event.image}
                  width={300}
                  height={200}
                  objectFit='cover'
                  className={styles.image}
                ></Image>
                <h2>{event.eventName}</h2>
                <p>
                  <FontAwesomeIcon
                    className={styles.mapMarkerLogo}
                    icon={faMapMarker}
                  />{' '}
                  {event.venue}
                </p>
                <p>
                  <FontAwesomeIcon
                    icon={faCalendar}
                    className={styles.calendarLogo}
                  />{' '}
                  {moment(event.date).format('MMMM Do YYYY')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const response = await fetch('http://localhost:3000/api/events/upcoming')
  console.log('response', response)
  const data = await response.json()
  console.log('data', data)
  return { props: { data } }
}
