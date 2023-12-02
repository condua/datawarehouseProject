import React,{useState} from 'react';
import '../scss/component/Login.scss'
import { auth, signInWithEmailAndPassword  } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user,setUser] = useState('')

    const navigate = useNavigate()
    const [isLog, setIsLog] = useState(() => {
        const storedIsLog = localStorage.getItem('isLog')?.toString();
        return storedIsLog ? storedIsLog : '';
      });

    useEffect(() => {
        if (isLog === 'true') {
          navigate('/tracuu');
        }
      }, [isLog, navigate]);
    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          // Đăng nhập thành công, userCredential.user chứa thông tin người dùng đã đăng nhập
          console.log('Đăng nhập thành công!', userCredential.user.providerData);
          alert('Đăng nhập thành công')
          localStorage.setItem('isLog', 'true')
          localStorage.setItem('user',JSON.stringify(userCredential.user.displayName))
          localStorage.setItem('allFieldsUser',JSON.stringify(userCredential.user))
          localStorage.setItem('userCredential',JSON.stringify(userCredential))

          setIsLog(localStorage.getItem('isLog'))
          navigate('/tracuu')
          window.location.reload();
        } catch (error) {
          alert('Lỗi đăng nhập:' + error.message)
          console.error('Lỗi đăng nhập:', error.message);
        }
      };
    return (
            <div className='Login'>
                <form className='form-login'>
                    <div className='text'>
                        <h1>Đăng nhập</h1>
                    </div>
                    <div className='form-infor'>
                        <p>Tài khoản</p>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        <p>Mật khẩu</p>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                        <div style={{width:'100%',display:'flex',justifyContent:'flex-end'}}>
                            <a href='#'>Quên mật khẩu ?</a>
                        </div>
                        <button onClick={handleSignIn}>Đăng nhập</button>
                        <div style={{width:'100%',display:'flex',justifyContent:'flex-end'}}>
                            <p>Bạn chưa có tài khoản ? <span><a href='/register' style={{color:'blue'}}>Đăng kí ngay ?</a></span></p>
                        </div>
                    </div>
                </form>
            </div>
        
    );
};

export default Login;