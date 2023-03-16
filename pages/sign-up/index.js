// Once we have the back end hooked up this will serve as the sign up form
// Sign-Up -> Push to DB -> Authenticate -> Auto Direct to profile page to view your info!

import Link from "next/link"
import styles from '../../styles/forms.module.css'

const SignUp = () => {
  return (
    <div className={styles.center}>

      <Link href={"/login"}>Already have an Account? Sign in here</Link>

      <br/>

      <form className={styles.box}  action="/api/form" method="post">
       <label htmlFor="email">Email:</label>
       <input
       type="email"
       id="email"
       name="email"
       required
       />
      <br/>
       <label htmlFor="password">Password:</label>
       <input
       type="password"
       id="password"
       name="password"
       required
       pattern="[a-z0-9]{8,15}"
       title="Invalid Username or Password"
       minLength={8}
       maxLength={15}
       />
   <br/>
       <label htmlFor="firstName">First Name</label>
       <input
       type="text"
       id='firstName'
       name='firstName'
       />
   <br/>
       <label htmlFor="lastName">Last Name</label>
       <input
       type="text"
       id='lastName'
       name='lastName'
       />
   <br/>
       <button type="submit">Submit</button>
     </form>
    </div>
    )}

export default SignUp
