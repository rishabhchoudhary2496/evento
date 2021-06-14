import React from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/EventDetail.module.css'
import Image from 'next/image'
import moment from 'moment'
import { faCalendar, faMapMarker } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession, getSession } from 'next-auth/client'

const EventDetails = ({ data }) => {
  console.log('data', data)
  const router = useRouter()
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <p className={styles.horizontalText}>
          <FontAwesomeIcon
            className={styles.mapMarkerLogo}
            icon={faMapMarker}
          />{' '}
          {data?.event?.venue}{' '}
          <span className={styles.textSpan}>
            <FontAwesomeIcon
              icon={faCalendar}
              className={styles.calendarLogo}
            />
            {moment(data?.event?.date).format('MMMM Do YYYY')}
          </span>
        </p>

        <h1 className={styles.headingText}>{data?.event?.eventName}</h1>
      </div>
      <Image
        src={'/uploads/' + data?.event?.image}
        height={600}
        width={1300}
        objectFit='cover'
        className={styles['custom-img']}
      ></Image>
      <div className={styles.about}>
        <p className={styles.aboutText}>{data?.event?.about}</p>
      </div>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  let session = await getSession(ctx)
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: { data, session },
    }
  }
  const { id } = ctx.params
  const response = await fetch(`http://localhost:3000/api/events/${id}`)
  console.log('response', response)
  const data = await response.json()
  console.log('data', data)
  return { props: { data, session } }
}

export default EventDetails
