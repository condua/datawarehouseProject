import React,{useState,useEffect} from 'react';
import '../scss/pages/Tracuu.scss'
import data from '../json/diemchuan.json'
import { Pagination } from 'antd';
import Login from '../component/Login';
import { useNavigate } from 'react-router-dom';

const Tracuu = () => {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 25;
    const [searchNganh, setSearchNganh] = useState('');
    const [searchDiem, setSearchDiem] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [searchSchool, setSearchSchool] = useState('');
    const [searchYear, setSearchYear] = useState('');
    const [sortNameOrder, setSortNameOrder] = useState('default');
    const [sortGradeOrder, setSortGradeOrder] = useState('default');
    const [sortYearOrder, setSortYearOrder] = useState('default');
    const [sortSubjectOrder, setSortSubjectOrder] = useState('default');
    const [sortBlockOrder, setSortBlockOrder] = useState('default');
  
    const [sortedFilteredData, setSortedFilteredData] = useState([...data]);

    const [isLog,setIslog] = useState(localStorage.getItem('isLog'))

    console.log(isLog)

    useEffect(() => {
        const filteredData = data.filter((item) => {
          return (
            item.name.toLowerCase().includes(searchSchool.toLowerCase()) &&
            item.grade.toString().includes(searchDiem) &&
            item.subject.toLowerCase().includes(searchNganh.toLowerCase()) &&
            item.year.toString().includes(searchYear.toLowerCase()) &&
            Object.values(item).some(
              (value) =>
                typeof value === 'string' &&
                (value.toLowerCase().includes(searchValue.toLowerCase()) ||
                  item.grade?.toString().includes(searchValue) ||
                  item.year?.toString().includes(searchValue))
            )
          );
        });
    
        let sortedData = [...filteredData];
    
        // Sắp xếp theo tên trường
        if (sortNameOrder === 'asc') {
          sortedData.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortNameOrder === 'desc') {
          sortedData.sort((a, b) => b.name.localeCompare(a.name));
        }
    
        // Sắp xếp theo điểm
        if (sortGradeOrder === 'asc') {
          sortedData.sort((a, b) => a.grade - b.grade);
        } else if (sortGradeOrder === 'desc') {
          sortedData.sort((a, b) => b.grade - a.grade);
        }
    
        // Sắp xếp theo năm
        if (sortYearOrder === 'asc') {
          sortedData.sort((a, b) => a.year - b.year);
        } else if (sortYearOrder === 'desc') {
          sortedData.sort((a, b) => b.year - a.year);
        }
    
        // Sắp xếp theo tên ngành
        if (sortSubjectOrder === 'asc') {
          sortedData.sort((a, b) => a.subject.localeCompare(b.subject));
        } else if (sortSubjectOrder === 'desc') {
          sortedData.sort((a, b) => b.subject.localeCompare(a.subject));
        }
    
        // Sắp xếp theo tổ hợp môn
        if (sortBlockOrder === 'asc') {
          sortedData.sort((a, b) => a.colleged_exam_block.localeCompare(b.colleged_exam_block));
        } else if (sortBlockOrder === 'desc') {
          sortedData.sort((a, b) => b.colleged_exam_block.localeCompare(a.colleged_exam_block));
        }
    
        setSortedFilteredData(sortedData);
      }, [searchSchool, searchDiem, searchNganh, searchYear, searchValue, sortNameOrder, sortGradeOrder, sortYearOrder, sortSubjectOrder, sortBlockOrder]);
    
    useEffect(() => {
      // Mặc định hiển thị toàn bộ dữ liệu khi trang được tải
      setSortedFilteredData(data);
      setIslog(localStorage.getItem('isLog'))
    }, []);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = sortedFilteredData.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(sortedFilteredData.length / recordsPerPage);
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
    const handleSearchSchool = (e) => {
      setSearchSchool(e.target.value);
      setCurrentPage(1);
    };
  
    const handleNganhSearch = (e) => {
      setSearchNganh(e.target.value);
      setCurrentPage(1);
    };
  
    const handleDiemSearch = (e) => {
      setSearchDiem(e.target.value);
      setCurrentPage(1);
    };
  
    const handleSearchAll = (e) => {
      setSearchValue(e.target.value);
      setCurrentPage(1);
    };
  
    const handleSortByName = () => {
        if (sortNameOrder === 'default') {
          // Chuyển sang sắp xếp theo A-Z khi nhấn lần đầu
          setSortNameOrder('asc');
        } else if (sortNameOrder === 'asc') {
          // Chuyển sang sắp xếp theo Z-A khi nhấn lần tiếp theo
          setSortNameOrder('desc');
        } else {
          // Trở về trạng thái ban đầu khi nhấn lần nữa
          setSortNameOrder('default');
        }
      };
      
      const handleSortByGrade = () => {
        if (sortGradeOrder === 'default') {
          setSortGradeOrder('asc');
        } else if (sortGradeOrder === 'asc') {
          setSortGradeOrder('desc');
        } else {
          setSortGradeOrder('default');
        }
      };
      
      const handleSortByYear = () => {
        if (sortYearOrder === 'default') {
          setSortYearOrder('asc');
        } else if (sortYearOrder === 'asc') {
          setSortYearOrder('desc');
        } else {
          setSortYearOrder('default');
        }
      };
      
      // Thêm các hàm sort khác cho tên ngành, tổ hợp môn, điểm chuẩn...
      
      const handleSortBySubject = () => {
        if (sortSubjectOrder === 'default') {
          setSortSubjectOrder('asc');
        } else if (sortSubjectOrder === 'asc') {
          setSortSubjectOrder('desc');
        } else {
          setSortSubjectOrder('default');
        }
      };
      
      const handleSortByExamBlock = () => {
        if (sortBlockOrder === 'default') {
            setSortBlockOrder('asc');
        } else if (sortBlockOrder === 'asc') {
            setSortBlockOrder('desc');
        } else {
            setSortBlockOrder('default');
        }
      };
      return(
        <div>
          {
            isLog === 'true'
            ? 
            <div>
                  <div className='Tracuu'>
                  <div className='list-menu'>
                      <input className='school-filter' placeholder='Trường' value={searchSchool} onChange={handleSearchSchool}/>
                      <input className='school-filter' placeholder='Ngành' value={searchNganh} onChange={handleNganhSearch}/>
                      <input className='grade-filter' placeholder='Điểm' value={searchDiem} onChange={handleDiemSearch}/>
                      <div className='dropdown'>
                          <button className='dropbtn'>{searchYear === ''?'Năm':searchYear}</button>
                          <div className='dropdown-content'>
                              <button onClick={()=>{setSearchYear(''); setCurrentPage(1);}}>Tất cả</button>
                              <button onClick={()=>{setSearchYear('2016'); setCurrentPage(1);}}>2016</button>
                              <button onClick={()=>{setSearchYear('2017'); setCurrentPage(1);}}>2017</button>
                              <button onClick={()=>{setSearchYear('2018'); setCurrentPage(1);}}>2018</button>
                              <button onClick={()=>{setSearchYear('2019'); setCurrentPage(1);}}>2019</button>
                              <button onClick={()=>{setSearchYear('2020'); setCurrentPage(1);}}>2020</button>
                              <button onClick={()=>{setSearchYear('2021'); setCurrentPage(1);}}>2021</button>
                              <button onClick={()=>{setSearchYear('2022'); setCurrentPage(1);}}>2022</button>
                          </div>
                      </div>
                      {/* <button className='year-filter'>Năm</button> */}
                      {/* <div className='dropdown'>
                          <button className='dropbtn'>Hệ</button>
                          <div className='dropdown-content'>
                              <button>Đại học</button>
                              <button>Cao đẳng</button>
                          </div>
                      </div> */}

                      <input className='search' placeholder='Search' value={searchValue} onChange={handleSearchAll}/>
                  </div>
                  <table className='grade-table'>
                      <thead>
                          <tr>
                              <th>STT</th>
                              <th onClick={handleSortByName}>Tên trường</th>
                              <th>Mã trường</th>
                              <th onClick={handleSortBySubject }>Tên ngành</th>
                              <th onClick={handleSortByName}>Tổ hợp môn</th>
                              <th onClick={handleSortByExamBlock}>Điểm chuẩn</th>
                              <th onClick={handleSortByYear}>Năm</th>
                          </tr>
                      </thead>
                      <tbody>
                          {currentRecords.map((item, index) => (
                              <tr key={index}>
                                  <td>{index + indexOfFirstRecord + 1}</td>
                                  <td>{item.name}</td>
                                  <td>{item.collegeId}</td>
                                  <td style={{textAlign:'left',paddingLeft:'5%'}}>{item.subject}</td>
                                  <td>{item.colleged_exam_block}</td>
                                  <td>{item.grade}</td>
                                  <td>{item.year}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
                  <Pagination
                      style={{marginBottom:'30px'}}
                      className='pagination'
                      current={currentPage}
                      pageSize={recordsPerPage}
                      total={sortedFilteredData.length}
                      onChange={handlePageChange}
                      // showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                      showSizeChanger={false}
                      showQuickJumper={false}
                      pageSizeOptions={['25']}
                      defaultPageSize={recordsPerPage}
                      // total={totalPages}
                  />
              </div>
            </div>
            : <div>
              {
                navigate('/login')
              }
            </div>
          }
        </div>
      )
    // return (
        // <div className='Tracuu'>
        //     <div className='list-menu'>
        //         <input className='school-filter' placeholder='Trường' value={searchSchool} onChange={handleSearchSchool}/>
        //         <input className='school-filter' placeholder='Ngành' value={searchNganh} onChange={handleNganhSearch}/>
        //         <input className='grade-filter' placeholder='Điểm' value={searchDiem} onChange={handleDiemSearch}/>
        //         <div className='dropdown'>
        //             <button className='dropbtn'>{searchYear === ''?'Năm':searchYear}</button>
        //             <div className='dropdown-content'>
        //                 <button onClick={()=>{setSearchYear(''); setCurrentPage(1);}}>Tất cả</button>
        //                 <button onClick={()=>{setSearchYear('2016'); setCurrentPage(1);}}>2016</button>
        //                 <button onClick={()=>{setSearchYear('2017'); setCurrentPage(1);}}>2017</button>
        //                 <button onClick={()=>{setSearchYear('2018'); setCurrentPage(1);}}>2018</button>
        //                 <button onClick={()=>{setSearchYear('2019'); setCurrentPage(1);}}>2019</button>
        //                 <button onClick={()=>{setSearchYear('2020'); setCurrentPage(1);}}>2020</button>
        //                 <button onClick={()=>{setSearchYear('2021'); setCurrentPage(1);}}>2021</button>
        //                 <button onClick={()=>{setSearchYear('2022'); setCurrentPage(1);}}>2022</button>
        //             </div>
        //         </div>
        //         {/* <button className='year-filter'>Năm</button> */}
        //         {/* <div className='dropdown'>
        //             <button className='dropbtn'>Hệ</button>
        //             <div className='dropdown-content'>
        //                 <button>Đại học</button>
        //                 <button>Cao đẳng</button>
        //             </div>
        //         </div> */}

        //         <input className='search' placeholder='Search' value={searchValue} onChange={handleSearchAll}/>
        //     </div>
        //     <table className='grade-table'>
        //         <thead>
        //             <tr>
        //                 <th>STT</th>
        //                 <th onClick={handleSortByName}>Tên trường</th>
        //                 <th>Mã trường</th>
        //                 <th onClick={handleSortBySubject }>Tên ngành</th>
        //                 <th onClick={handleSortByName}>Tổ hợp môn</th>
        //                 <th onClick={handleSortByExamBlock}>Điểm chuẩn</th>
        //                 <th onClick={handleSortByYear}>Năm</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {currentRecords.map((item, index) => (
        //                 <tr key={index}>
        //                     <td>{index + indexOfFirstRecord + 1}</td>
        //                     <td>{item.name}</td>
        //                     <td>{item.collegeId}</td>
        //                     <td style={{textAlign:'left',paddingLeft:'5%'}}>{item.subject}</td>
        //                     <td>{item.colleged_exam_block}</td>
        //                     <td>{item.grade}</td>
        //                     <td>{item.year}</td>
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table>
        //     <Pagination
        //         style={{marginBottom:'30px'}}
        //         className='pagination'
        //         current={currentPage}
        //         pageSize={recordsPerPage}
        //         total={sortedFilteredData.length}
        //         onChange={handlePageChange}
        //         // showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        //         showSizeChanger={false}
        //         showQuickJumper={false}
        //         pageSizeOptions={['25']}
        //         defaultPageSize={recordsPerPage}
        //         // total={totalPages}
        //     />
        // </div>
    // );
};

export default Tracuu;