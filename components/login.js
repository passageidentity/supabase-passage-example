import { useEffect } from 'react';

const PassageLogin = () => {

    useEffect(()=>{
        require('@passageidentity/passage-elements/passage-auth');
    }, []);

    return (
        <>
          <passage-auth app-id={process.env.NEXT_PUBLIC_PASSAGE_APP_ID}></passage-auth>
        </>
      )
  }
  
  export default PassageLogin