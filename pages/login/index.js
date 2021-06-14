import React from 'react'
import { signin, signOut, useSession, getSession } from 'next-auth/client'
import styles from '../../styles/Login.module.css'

const Login = ({ session }) => {
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1>Sign in to Continue</h1>
        {!session ? (
          <button className={styles.btn} onClick={signin}>
            Sign In
          </button>
        ) : (
          <button onClick={signOut}>Sign Out</button>
        )}
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  let session = await getSession(context)
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }
  return {
    props: {
      session,
    },
  }
}

export default Login
