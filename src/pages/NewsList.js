import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { firestore, collection, getDocs } from '../firebase';
import '../scss/pages/NewsList.scss'
import { Spin } from 'antd';
const NewsList = () => {
  const [documents, setDocuments] = useState([]);
  console.log(documents)
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'documents'));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title, // Lấy tiêu đề từ dữ liệu Firestore
        background: doc.data().background // Lấy URL của ảnh nền từ dữ liệu Firestore
      }));
      setDocuments(data);
    };

    fetchData();
  }, []);

  return (
    <div className='NewsList'>
      {documents.length
      ? <h1 style={{textDecoration:'none',color:'Blue',fontSize:'35px'}}>Tin tức tuyển sinh </h1>
      : <Spin style={{marginTop:'50px'}} size="large" tip="Loading..."></Spin>
       }
      <ul>
        {documents.map((doc) => (
          <li key={doc.id}>
            <Link className='infor' style={{display:'flex',flexDirection:'column'}} to={`/documents/${doc.id}`}>
              {doc.background && <img className='picture' src={doc.background} alt="Ảnh nền" />}
              {doc.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
