import React, { useState, useEffect } from 'react';
import '../scss/component/Register.scss';
import { auth, createUserWithEmailAndPassword, updateProfile,firestore,addDoc,collection,getDoc,doc,updateDoc  } from '../firebase';
import { setDoc, Timestamp } from "firebase/firestore";

import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();
  const [isLog, setIsLog] = useState(() => {
    const storedIsLog = localStorage.getItem('isLog')?.toString();
    return storedIsLog ? storedIsLog : '';
  });

  useEffect(() => {
    if (isLog === 'true') {
      navigate('/tracuu');
    }
  }, [isLog, navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (repassword === '') {
    alert('Vui lòng nhập lại mật khẩu');
    return;
    }
    if (password !== repassword) {
    alert('Mật khẩu không khớp');
    return;
    }
    try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Cập nhật thông tin người dùng sau khi đăng ký thành công
    await updateProfile(user, {
        displayName: displayName
    });

    const { uid } = user;

    // Thêm document mới vào collection 'users' với ID là UID từ Auth
    const docRef = doc(firestore, 'users', uid);
    await setDoc(docRef, {
      uid: uid,
      displayName: displayName,
      email: email,
      password: password,
      role: 'user',
      phone: 'none',
      birthday: 'none',
      gender: 'none',
      address: 'none',
      avatar:'https://firebasestorage.googleapis.com/v0/b/data-warehouse-18412.appspot.com/o/images%2FLogo%20HCMUT.jpg?alt=media&token=09c0b0ae-5039-4614-a8e0-ac480c2f6376'
    });

    localStorage.setItem('aaa', JSON.stringify({ ...user, idDoc: uid }));
    console.log('Đăng ký thành công!', user);
    alert('Đăng ký thành công!');

    navigate('/login');
    } catch (error) {
      console.error('Lỗi đăng ký:', error.message);
      alert('Lỗi đăng ký: ' + error.message);
    }
  }

  return (
    <div className='Register'>
        <form className='form-login'>
            <div className='text'>
            <h1>Đăng ký</h1>
            </div>
            <div className='form-infor'>
            <p>Tên hiển thị</p>
            <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder='Display Name' />
            <p>Tài khoản</p>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <p>Mật khẩu</p>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <p>Nhập lại mật khẩu</p>
            <input type="password" value={repassword} onChange={(e) => setRePassword(e.target.value)} placeholder='Re-enter Your password' />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                <a href='/reset'>Quên mật khẩu ?</a>
            </div>
            <button onClick={handleSignUp}>Đăng ký</button>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                <p>Bạn đã có tài khoản ? <span><a href='/login' style={{ color: 'blue' }}>Đăng nhập ngay ?</a></span></p>
            </div>
            </div>
        </form>
    </div>
  );
};

export default Register;
