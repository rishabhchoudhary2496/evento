import { useState } from 'react'
import dynamic from 'next/dynamic'
import Datetime from 'react-datetime'
import styles from '../../styles/CreateEvent.module.css'
import { useSession, getSession } from 'next-auth/client'
import moment from 'moment'
import axios from 'axios'
import { useRouter } from 'next/router'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading Text Editor...</p>,
})

const createMeetup = () => {
  const [meetupName, setMeetupName] = useState('')
  const [venueAddress, setVenueAddress] = useState('')
  const [editorValue, setEditorValue] = useState('')
  const [slots, setSlots] = useState('')
  const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const [time, setTime] = useState(
    moment(new Date().getTime()).format('hh:mm a')
  )
  const [image, setImage] = useState({})

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('meetupName', meetupName)
    data.append('venue', venueAddress)
    data.append('about', editorValue)
    data.append('date', date)
    data.append('time', time)
    data.append('image', image)
    data.append('slots', slots)
    for (let i of data.entries()) {
      console.log('i', i)
    }
    try {
      const result = await axios.post(
        'http://localhost:3000/api/meetups',
        data,
        {
          headers: { 'Content-type': 'multipart/form-data' },
        }
      )
      console.log('result', result)
      router.replace('/')
    } catch (e) {
      console.log('error: ', e)
    }
  }

  const handleImage = (image) => {
    setImage(image)
  }

  const handleDate = (dateTime) => {
    const date = moment(dateTime).format('YYYY-MM-DD')
    // here will extract date and set Date to state
  }

  const handleTime = (dateTime) => {
    const time = moment(dateTime).format('hh:mm a')

    //here we will extract time from date time and set it to state
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <h1 className={styles.heading}>Create Meetup</h1>
        <form onSubmit={handleSubmit}>
          <input
            type='file'
            id='actual-btn'
            onChange={(e) => handleImage(e.currentTarget.files[0])}
          />

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
            onChange={(e) => {
              handleDate(e._d)
            }}
          />
          <p>Choose Time</p>
          <Datetime
            inputProps={{ className: styles.field }}
            dateFormat={false}
            initialValue={new Date().getTime()}
            onChange={(e) => {
              handleTime(e._d)
            }}
          />
          <p>Slots</p>
          <input
            className={styles.field}
            type='text'
            placeholder='slots'
            value={slots}
            onChange={(e) => setSlots(e.target.value)}
          ></input>

          <p>Meetup Details</p>
          <QuillNoSSRWrapper
            theme='snow'
            style={{ marginTop: '1rem', marginBottom: '1rem' }}
            onChange={(text) => {
              setEditorValue(text)
            }}
          />
          <button type='submit' className={styles.button}>
            Post Meetup
          </button>
        </form>
      </div>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    }
  }
  return { props: {} }
}

export default createMeetup
