import { useState } from 'react'
import dynamic from 'next/dynamic'
import Datetime from 'react-datetime'
import styles from '../../styles/CreateEvent.module.css'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading Text Editor...</p>,
})

const createMeetup = () => {
  const [meetupName, setMeetupName] = useState('')
  const [venueAddress, setVenueAddress] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <h1 className={styles.heading}>Create Meetup</h1>
        <form onSubmit={handleSubmit}>
          <p>Meetup Name</p>
          <input
            className={styles.field}
            type='text'
            placeholder='Meetup Name'
            value={meetupName}
            onChange={(e) => setMeetupName(e.target.value)}
          ></input>
          <p>Venue Address</p>
          <input
            className={styles.field}
            type='text'
            placeholder='Venue Address'
            value={venueAddress}
            onChange={(e) => setVenueAddress(e.target.value)}
          ></input>
          <p>Choose Date</p>
          <Datetime
            inputProps={{ className: styles.field }}
            timeFormat={false}
            initialValue={new Date()}
          />
          <p>Choose Time</p>
          <Datetime
            inputProps={{ className: styles.field }}
            dateFormat={false}
            initialValue={new Date().getTime()}
          />
          <p>Meetup Details</p>
          <QuillNoSSRWrapper
            theme='snow'
            style={{ marginTop: '1rem', marginBottom: '1rem' }}
          />
          <button type='submit' className={styles.button}>
            Post Meetup
          </button>
        </form>
      </div>
    </div>
  )
}

export default createMeetup
