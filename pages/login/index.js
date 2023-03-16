// Once we have the back end hooked up this will serve as the login form
// Log In -> Push to DB -> Authenticate -> Auto Direct to profile page to view your info!

import Link from "next/link"
import styles from '../../styles/forms.module.css'

const Login = () => {
  return (
    <div className={styles.center} >
      <Link href={"/sign-up"}>Don't have an Account? Sign up here</Link>
      <br/>

     <form className={styles.box} action="/api/form" method="post">
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
        pattern="[a-z0-9]{8,15}"
        title="Invalid Username or Password"
        minLength={8}
        maxLength={15}
       />

       <br/>

       <button type="submit">Submit</button>

     </form>
    </div>
  )
}

export default Login
