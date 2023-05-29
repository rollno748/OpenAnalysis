import { useState } from 'react'
import './../../assets/scss/upload.scss'

console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)



function Signin(){
    return(
        <div className='sigin-div'>
            <p className='sign'>Sign in</p>
            <form className='singin-form'>
                <input className='un ' type='text' placeholder='Username'>
                    Username
                </input>
                <input className='pass' type='password' placeholder='Password'>
                    Password
                </input>
                <a className='submit'>Sign in</a>
            </form>
        </div>
    )
}

// function Signin() {
//     const [count, setCount] = useState(0)
//     return (
//         <div className="signin-main">
//             <p className="sign" align="center">Sign in</p>
//             <form className="form1">
//                 <input className='un ' type="text" align="center" placeholder="Username">
//                 <input className='pass' type="password" align="center" placeholder="Password">
//                 <a className='submit' align='center'>Sign in</a>
//             </form>
//         </div>
//     )
// }


export default Signin

{/* https://codemyui.com/progressive-disclosure-signup-form/</form> */}