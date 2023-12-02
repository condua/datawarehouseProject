import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore, collection, doc, getDoc } from '../firebase';
import '../scss/pages/News.scss'
import { format } from 'date-fns';

const NewsDetails = () => {
    const { id } = useParams();
    const [documentContent, setDocumentContent] = useState('');
    const [timestamp, setTimestamp] = useState('');

    useEffect(() => {
      const fetchData = async () => {
        const documentRef = doc(firestore, 'documents', id);
        const docSnapshot = await getDoc(documentRef);
        if (docSnapshot.exists()) {
          setDocumentContent(docSnapshot.data().content);
          setTimestamp(docSnapshot.data().timestamp)

        }
      };
  
      fetchData();
    }, [id]);
  
    return (
      <div>
        <div className='News'>
            <div className='preview'>
                <p>Thời gian: {timestamp}</p>
                <div dangerouslySetInnerHTML={{ __html: documentContent }} />
            </div>
        </div>
      </div>
    );
};

export default NewsDetails;
