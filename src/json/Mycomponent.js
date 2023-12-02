import React from 'react';
import data from '../json/firstJson.json'

const MyComponent = () => {
  return (
    <div>
      <h2>Danh sách dữ liệu</h2>
      <table>
        <thead>
          <tr>
            <th>College ID</th>
            <th>Môn học</th>
            <th>Điểm</th>
            <th>Loại</th>
            <th>Block</th>
            <th>Ghi chú</th>
            <th>Năm</th>
            <th>Tên trường</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.collegeId}</td>
              <td>{item.subject}</td>
              <td>{item.grade}</td>
              <td>{item.type}</td>
              <td>{item.colleged_exam_block}</td>
              <td>{item['GHI CHÚ']}</td>
              <td>{item.year}</td>
              <td>{item.collegeName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyComponent;
