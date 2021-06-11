import React from 'react'
import styles from '../../styles/EventDetail.module.css'
import Image from 'next/image'
import moment from 'moment'
import { faCalendar, faMapMarker } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MeetupDetails = ({ data: { meetup } }) => {
  console.log('meetup', meetup)
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <p className={styles.horizontalText}>
          <FontAwesomeIcon
            className={styles.mapMarkerLogo}
            icon={faMapMarker}
          />{' '}
          {meetup?.venue}{' '}
          <span className={styles.textSpan}>
            <FontAwesomeIcon
              icon={faCalendar}
              className={styles.calendarLogo}
            />
            {moment(meetup?.date).format('MMMM Do YYYY')}
          </span>
        </p>

        <h1 className={styles.headingText}>{meetup?.meetupName}</h1>
        <div className={styles.flexHorizontal}>
          <button className={styles.joinButton}>Join Now</button>
        </div>
      </div>
      <Image
        src={'/uploads/' + meetup?.image}
        height={600}
        width={1300}
        objectFit='cover'
        className={styles['custom-img']}
      ></Image>
      <div className={styles.about}>
        <p className={styles.aboutText}>{meetup?.about}</p>
      </div>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const { id } = ctx.params
  const response = await fetch(`http://localhost:3000/api/meetups/${id}`)
  console.log('response', response)
  const data = await response.json()
  console.log('data', data)
  return { props: { data } }
}

export default MeetupDetails
