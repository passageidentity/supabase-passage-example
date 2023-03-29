import styles from '@/styles/Home.module.css'
import { useEffect } from 'react';
import Router from 'next/router';
import { getAuthenticatedUserFromSession } from '@/utils/passage'
import { getSupabase } from '../utils/supabase'


export default function Dashboard({isAuthorized, userID, todos}) {
    useEffect(() => {
      if(!isAuthorized){
        Router.push('/');
      }
    })
    
    return(
        <div className={styles.container}>
        <p>
          Welcome {userID}!
        </p>
        {todos?.length > 0 ? (
          todos.map((todo) => <p key={todo.id}>{todo.title}</p>)
        ) : (
          <p>You have completed all todos!</p>
        )}
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