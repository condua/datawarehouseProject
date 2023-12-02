import React, { useState, useEffect,useRef  } from 'react';
import { auth, firestore,doc,getDoc,updateDoc,uploadBytes, onSnapshot, storage, ref,  } from '../firebase';
import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { getAuth, updateProfile } from 'firebase/auth';
import {
  getFirestore,
} from 'firebase/firestore';
 // Import Firestore và Firebase auth từ file firebase của bạn
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import logo from '../images/logo.png'
import camera from '../images/camera.png'
import '../scss/pages/Profile.scss'
import Header from '../component/Header';
import { Alert, Button, Spin, message } from 'antd';
import { ca } from 'date-fns/locale';

const Profile = () => {
  const [userData, setUserData] = useState('');
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('userInfor')))
  const navigate = useNavigate();
  const [name, setName] = useState(user.fullname);
  const [birthday, setBirthday] = useState(user.birthday);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAdress] = useState(user.address);
  const [imageUrl, setImageUrl] = useState(null);
  const [isHovered, setIsHovered] = useState(false); // State để theo dõi hover
  const [imageUrlChange, setImageUrlChange] = useState(null);
  const [avatar,setAvatar] = useState(JSON.parse(localStorage.getItem('userInfor')).avatar)
  const [updateButton, setUpdateButton] = useState(false)
  const fileInputRef = useRef(null);
  const [isLog,setIslog] = useState(localStorage.getItem('isLog'))

  const genders = [
    {value:'None', text:'Choose the options'},
    {value:'Nam', text:'Nam'},
    {value:'Nữ', text:'Nữ'},
  ]
  const [gender, setGender] = useState(user.gender);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageUrlChange(file)
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result); // Gán đường dẫn ảnh vào state
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconClick = () => {
    fileInputRef.current?.click(); // Kích hoạt trường nhập file ẩn
  };
  const handleUpdate = async () => {
    try {
      if (imageUrl) {
        const auth = getAuth();
        const user = auth.currentUser;
        const imageId = uuidv4();
        const storage = getStorage();
        const storageRef = ref(storage, `avatar/${user.uid}/${imageId}`);
  
        await uploadBytes(storageRef, imageUrlChange);
  
      
        const downloadURL = await getDownloadURL(storageRef);
  
        const firestore = getFirestore();
        const userRef = doc(firestore, 'users', user.uid);
  
        await updateDoc(userRef, {
          // displayName: name,
          // Các trường thông tin cần cập nhật khác
          avatar: downloadURL, // Cập nhật trường avatar với URL ảnh mới
        });
  
        await updateProfile(user, {
          // displayName: name,
          // Các trường thông tin cần cập nhật khác
          photoURL: downloadURL, // Cập nhật URL ảnh trong Firebase Auth
        });
        const userInfor = JSON.parse(localStorage.getItem('userInfor'));

        // Cập nhật trường avatar trong userInfor
        if (userInfor) {
          userInfor.avatar = downloadURL;
          localStorage.setItem('userInfor', JSON.stringify(userInfor)); // Lưu lại userInfor mới vào localStorage
        }
        alert('Cập nhật thành công')

        window.location.reload()
        console.log('Thông tin người dùng đã được cập nhật thành công!');
        // window.location.reload(); // Load lại trang sau khi cập nhật thành công
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin người dùng:', error);
    }
  };
  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {

        fetchUserData(user.uid,);
      } else {
        navigate('/login'); // Chuyển hướng về trang đăng nhập nếu chưa đăng nhập
      }
    });
    console.log(name)
    console.log(birthday)
    console.log(gender)
    return () => {
      unsubscribe(); // Unsubscribe khi unmount component
    };
  }, [navigate,name,birthday,gender]);

  //fetch dữ liệu người dùng dựa vào Id của document
  //dùng doc(firebase, 'tên collection', id)
  const handleUpdateInfor = async () => {
    try {
        const user = auth.currentUser;
        const firestore = getFirestore();
        const userRef = doc(firestore, 'users', user.uid);

        // Tạo một object để lưu trữ thông tin cần cập nhật
        const updateData = {};

        // Kiểm tra và thêm các trường có giá trị vào object updateData
        if (name) {
            updateData.displayName = name;
        }
        if (birthday) {
            updateData.birthday = birthday;
        }
        if (gender) {
            updateData.gender = gender;
        }
        if (phone) {
            updateData.phone = phone;
        }
        if (address) {
            updateData.address = address;
        }

        // Nếu updateData không rỗng, tiến hành cập nhật
        if (Object.keys(updateData).length > 0) {
            await updateDoc(userRef, updateData);
            message.success('Cập nhật thành công');
            console.log('Cập nhật thành công');
            // Cập nhật thông tin người dùng vào localStorage
            const updatedUserInfo = {
              displayName: name,
              birthday: birthday,
              gender: gender,
              phone: phone,
              address: address,
            };

            let userInfoFromLocalStorage = localStorage.getItem('userInfor');

            if (userInfoFromLocalStorage) {
                userInfoFromLocalStorage = JSON.parse(userInfoFromLocalStorage);
                userInfoFromLocalStorage = { ...userInfoFromLocalStorage, ...updatedUserInfo };
            } else {
                userInfoFromLocalStorage = updatedUserInfo;
            }

            localStorage.setItem('userInfor', JSON.stringify(userInfoFromLocalStorage));
            window.location.reload()
        } else {
            console.log('Không có thông tin cần cập nhật');
            // Thông báo cho người dùng nếu không có thông tin cần cập nhật
        }
    } catch (err) {
        console.log(err);
        alert(err);
    }
};
  const fetchUserData = async (userId) => {
    try {
      const userRef = doc(firestore, 'users', userId);
      const docUser = await getDoc(userRef)
      if (docUser.exists) {
        setUserData(docUser.data());
        // console.log(docUser)
      } else {
        console.log('Không tìm thấy thông tin người dùng');
      }
    } catch (error) {
      console.error('Lỗi khi truy xuất thông tin người dùng:', error);
    }
  };
  
  return (
    <div>
    {
      isLog === 'true'
      ?
      <div>
        {/* <h2>Thông tin người dùng</h2> */}
        {userData ? (
            <div  className='Profile'>
                <div className='container-avatar'>
                  <label style={{ cursor: 'pointer', position: 'relative', display: 'inline-block' }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} htmlFor="avatarInput">
                    {
                      isHovered === true
                      ?<div style={{width:'100%',height:'100%',position:'absolute',backgroundColor:'rgb(240,240,240,0.7)',borderRadius:'50%'}}>
                        <img alt='' src={camera} style={{width:'152px',height:'114px',position:'absolute',top:'50%',left:'50%',transform: 'translate(-50%, -50%)',}}/>
                      </div>
                      :null
                    }
                    <img alt='' src={imageUrl || avatar} onClick={handleIconClick} className='avatar'/>
                  </label>
                  <input type='file' accept='image/*' id="avatarInput" onChange={handleFileChange} style={{ display: 'none' }}/>
                  {
                    imageUrl && (
                      <Button style={{marginTop:'30px'}} onClick={handleUpdate}>
                        Cập nhật
                      </Button>
                    )
                  }

                </div>
                <div className='container-informations'>
                  <div className='items'>
                    <p>Tên:</p>
                    <input type='text' defaultValue = {userData.displayName} onChange={(e)=>setName(e.target.value)}/>
                  </div>
                  <div className='items'>
                    <p>Email:</p>
                    <input type='text' style={{backgroundColor:'#f1f1f1'}} value= {userData.email}/>
                  </div>
                  <div className='items'>
                    <p>Ngày sinh: </p>
                    <input type='date' defaultValue={userData.birthday} onChange={(e)=>setBirthday(e.target.value)} />
                  </div>
                  <div className='items'>
                    <p>Giới tính:</p>
                    <select defaultValue={gender} onChange={(e)=>setGender(e.target.value)}>
                      {
                        genders.map(option =>(
                          <option key={option.value} defaultValue={option.value}>
                            {option.text}
                          </option>
                        ))
                      }
                    </select>
                    {/* <input value={userData.gender}/> */}
                  </div>
                  <div className='items'>
                    <p>Số điện thoại:</p>
                    <input type='number' defaultValue={userData.phone} onChange={(e) => setPhone(e.target.value)}/>
                  </div>
                  <div className='items'>
                    <p>Địa chỉ:</p>
                    <TextArea style={{ resize: 'none',paddingBottom:'30px' }} defaultValue={userData.address} onChange={(e) => setAdress(e.target.value)}/>
                  </div>
                  <Button style={{marginTop:'26px'}}  onClick={handleUpdateInfor}>Cập nhật</Button>
                </div>
          </div>
        ) : (
          <div>
            <Spin></Spin>
            <p>Đang tải thông tin người dùng...</p>
          </div>
        )}
      </div>
      :<div>
        {
          navigate('/login')
        }
        </div>
      }
    </div>
    
  );
};

export default Profile;
