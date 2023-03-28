import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import PassageLogin from '@/components/login'
import { getAuthenticatedUserFromSession } from '@/utils/passage'
import { useEffect } from 'react'
import Router from 'next/router';

const inter = Inter({ subsets: ['latin'] })

export default function Home(props) {
  const {userID, isAuthorized} = props;

  useEffect(()=> {
    if(isAuthorized){
      Router.push('/dashboard')
    }
  })
  
    return(
      <div className={styles.main}>
        <PassageLogin />
      </div>
    ) 
}


export const getServerSideProps = async (context) => {
  const loginProps = await getAuthenticatedUserFromSession(context.req, context.res)
    return {
      props: {
        isAuthorized: loginProps.isAuthorized?? false,
        userID: loginProps.userID?? ''
      },
    }
}