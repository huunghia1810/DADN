import {useEffect} from 'react'

//----------import actions---------------
import ActionUser from '../actions/User'
import {useDispatch} from 'react-redux'

const SignOut = props => {
  const dispatch = useDispatch()

  useEffect(() => {



    //dispatch(ActionUser.signOut())
  },[])

  return (
    <>
      <h4>Sign Out</h4>
    </>
  );
}

export default SignOut
