import React, { useState, useEffect } from 'react';
import '../scss/component/Header.scss';
import logo from '../images/logo.png';
import { auth,doc,firestore,getDoc } from '../firebase'; // Import Firebase authentication instance
import { getDatabase, ref, onValue } from 'firebase/database';

import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [isLog,setIslog] = useState(localStorage.getItem('isLog'))
  const [user, setUser] = useState();
  const [avatar,setAvatar] = useState();
  const [_user,_setUser] = useState(auth.currentUser); // Lấy thông tin người dùng hiện tại
  const navigate = useNavigate()
  const [userId, setUserId] = useState('');

  const [userData, setUserData] = useState({});
  console.log(user)
  console.log(userData)

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

    };
  }, []);
  // useEffect(() => {
  //   setUserData(JSON.parse.localStorage.get('userInfor'));
  // }, [userData]);
  useEffect(() => {
    const u = localStorage.getItem('userInfor');
    if (u) {
      setUserData(JSON.parse(u));
    }
  }, []);
  useEffect(() => {
    // Kiểm tra xem localStorage đã có key 'userInfor' chưa
    const userInfor = localStorage.getItem('userInfor');
    if (!userInfor) {
      // Nếu chưa tồn tại, tạo một giá trị mặc định là {}
      localStorage.setItem('userInfor', JSON.stringify({}));
    }

    // Tiếp tục xử lý các logic khác
    // ...
  }, []);
  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        fetchUserData(user.uid);
        setAvatar(JSON.parse(localStorage.getItem('userInfor'))?.avatar);

        console.log(1)
      } else {
      }
    });

    return () => {
      unsubscribe(); // Unsubscribe khi unmount component
    };
  }, [auth]);

  const fetchUserData = async (userId) => {
    try {
      const userRef = doc(firestore, 'users', userId);
      const docUser = await getDoc(userRef);
      if (docUser.exists) {
        const userDataFromFirestore = docUser.data();
        if (userDataFromFirestore) { // Kiểm tra xem có dữ liệu không
          localStorage.setItem('userInfor', JSON.stringify(userDataFromFirestore));
          setUserData(userDataFromFirestore);
        } else {
          console.log('Dữ liệu từ Firestore không hợp lệ');
        }
      } else {
        console.log('Không tìm thấy thông tin người dùng');
      }
    } catch (error) {
      console.error('Lỗi khi truy xuất thông tin người dùng:', error);
    }
  };

  const handleLogout = ()=>{
    localStorage.setItem('isLog',false); 
    localStorage.setItem('userInfor', JSON.stringify({}));

    // localStorage.removeItem('userInfor');
    setIslog(false);
    navigate('/login')
  }


  return (
    <div className='Header'>
      <div style={{ width: '76%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <img className='logo' style={{ width: '110px', height: '100px', marginRight: '40px' }} alt='' src={logo} />
        <div className={`navbar ${isOpen ? 'open' : ''}`}>
          {isMobileView && (
            <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>☰</div>
          )}
          <a href="/about">Về chúng tôi</a>
          {/* <div className="dropdown">
            <button className="dropbtn">Nội dung</button>
            <div className="dropdown-content">
              <a href="/dao-duc-trong-kinh-doanh">Đạo đức trong kinh doanh</a>
              <a href="/tinh-huong-kho-xu-ve-dao-duc">Tình huống khó xử về đạo đức</a>
              <a href="/cau-chuyen-thuc-te">Câu chuyện  thực tế</a>
            </div>
          </div> */}
          <a href="/tracuu">Tra cứu điểm chuẩn</a>
          {/* <a href="/phodiem">Phổ điểm</a> */}
          <a href="/newslist">Tin tức tuyển sinh</a>
          {
            isLog === 'true'
            ? <div className='user'>
                <img className='avatar' style={{cursor:'pointer'}} onClick={()=>navigate('/settings')} alt='' src={JSON.parse(localStorage.getItem('userInfor')).avatar ||''}/>
                <p style={{marginLeft:'10px'}} className='dropdown'>Xin chào: {userData.displayName ||''}  
                  <div className="dropdown-content">
                    <a href="/settings">Settings</a>
                    <p onClick={handleLogout}>Logout</p>
                  </div>
                </p>

              </div>
            : 
            <div>
              <a href="/register">Đăng ký</a>
              <a href="/login">Đăng nhập</a>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Header;
