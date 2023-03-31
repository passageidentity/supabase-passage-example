import styles from '@/styles/Home.module.css'
import { useEffect } from 'react';
import Router from 'next/router';
import { getAuthenticatedUserFromSession } from '@/utils/passage'
import { getSupabase } from '../utils/supabase'
import { PassageUser } from '@passageidentity/passage-elements/passage-user'

export default function Dashboard({isAuthorized, userID, todos}) {
    useEffect(() => {
      if(!isAuthorized){
        Router.push('/');
      }
      
    })

    const signOut = async ()=>{
        new PassageUser().signOut()
        Router.push('/')
    }

    
    return(
        <div className={styles.main}>
          <div className={styles.container}>
          <h1>
          Welcome {userID}!{' '}
          </h1>
          <br></br>

          <button onClick={signOut}>Sign Out</button>
          <br></br>
          <div className={styles.list}>
          {todos?.length > 0 ? (
          todos.map((todo) => <li key={todo.id}>{todo.title}</li>)
        ) : (
          <p>You have completed all todos!</p>
        )}
        </div>
      </div>
      </div>
    )
  }

export const getServerSideProps = async (context) => {
    const loginProps = await getAuthenticatedUserFromSession(context.req, context.res)

    if(loginProps.isAuthorized){
        const supabase = getSupabase(loginProps.userID)
        const {data} = await supabase.from('todo').select()


        return {
            props: {
              isAuthorized: loginProps.isAuthorized?? false,
              userID: loginProps.userID?? '',
              todos: data?? [],
            },
          }
    } else {
            return {
                props: {
                    isAuthorized: loginProps.isAuthorized?? false,
                    userID: loginProps.userID?? ''
                },
            }
        }
}