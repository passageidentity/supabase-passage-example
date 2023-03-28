import styles from '@/styles/Home.module.css'
import PassageLogin from '@/components/login'
import { getAuthenticatedUserFromSession } from '@/utils/passage'
import { getSupabase } from '../utils/supabase'
import Link from 'next/link'


function Index ({isAuthorized, userID, todos})  {
  if (isAuthorized) {
    return (
      <div className={styles.container}>
      <p>
        Welcome {userID}!{' '}
      </p>
      {todos?.length > 0 ? (
        todos.map((todo) => <p key={todo.id}>{todo.title}</p>)
      ) : (
        <p>You have completed all todos!</p>
      )}
    </div>
    )
  } else {
    return(
      <div className={styles.main}>
        <PassageLogin />
      </div>
    ) 
  }
}

export const getServerSideProps = async (context) => {
  const loginProps = await getAuthenticatedUserFromSession(context.req, context.res)

  if (loginProps.isAuthorized) {
    const supabase = getSupabase(loginProps.userID)
    const { data: todos, error } = await supabase.from('todo').select('*')

    return {
      props: {
        isAuthorized: loginProps.isAuthorized,
        userID: loginProps.userID,
        todos: todos,
      },
    }
  } else {
    return {
      props: {
        isAuthorized: loginProps.isAuthorized,
        userID: loginProps.userID,
      },
    }
  }
}

export default Index
