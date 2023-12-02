import React, { useState, useEffect,useMemo,useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../scss/pages/News.scss';
import { firestore, collection, addDoc, onSnapshot, storage, ref, uploadBytes } from '../firebase'; // Import storage từ tệp firebase.js
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL } from 'firebase/storage';
import { format } from 'date-fns';


const News = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [timeNow, setTimeNow] = useState('')

  const editorRef = useRef();

  const handleEditorChange = (value) => {
    setContent(value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBackgroundChange = (event) => {
    const file = event.target.files[0];
    setBackgroundImage(file);
  };

  const handleSave = async () => {
    if (title && content && backgroundImage) {
      const imageId = uuidv4(); // Tạo UUID cho tên hình ảnh
      const imageRef = ref(storage, `images/${backgroundImage.name + imageId}`); // Sử dụng cấu trúc bạn đã cung cấp
      await uploadBytes(imageRef, backgroundImage); // Tải hình ảnh lên Firebase Storage
      const imageURL = await getDownloadURL(imageRef); // Lấy URL của hình ảnh
      const currentDateTime = format(new Date(), 'dd-MM-yyyy HH:mm:ss'); // Lấy ngày giờ hiện tại định dạng

      await addDoc(collection(firestore, 'documents'), {
        title: title,
        content: content,
        background: imageURL, // Lưu URL của hình ảnh nền
        timestamp: currentDateTime
      });
      setTitle('');
      setContent('');
      setBackgroundImage(null);
      alert('Tài liệu đã được lưu thành công!');
    } else {
      alert('Vui lòng nhập cả tiêu đề, nội dung và chọn hình ảnh nền!');
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, 'documents'), (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setDocuments(data);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    if (editorRef.current) {
      // Access the editor instance using editorRef.current.editor
      // You can use editorRef.current.editor.onChange to handle editor changes
    }
  }, []);
  return (
    <div className="News">
      <h1>Create a new news</h1>
      <div className="input-field">
        <label>Tiêu đề bài báo:</label>
        <input type="text" value={title} onChange={handleTitleChange} />
      </div>
      <div className="input-field-picture">
        <label>Chọn hình ảnh nền:</label>
        <input type="file" onChange={handleBackgroundChange} />
      </div>
      <div className="editor">
        <ReactQuill value={content} onChange={handleEditorChange} />
      </div>
      <button onClick={handleSave}>Lưu vào Firestore và Firebase Storage</button>

      <div className="preview">
        <h2>Preview:</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} /> {/* Dùng để chuyển cấu trúc html */}
      </div>
      {/* <div className="saved-documents">
        <h2>Saved Documents:</h2>
        <ul>
          {documents.map((doc) => (
            <li key={doc.id}>
              <strong>{doc.title}</strong>: {doc.content}
              {doc.background && <img src={doc.background} alt="Ảnh nền" />}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default News;
