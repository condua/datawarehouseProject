import React from 'react';
import '../scss/component/Footer.scss'
import logo from '../images/logo.png'
const Footer = () => {
    return (
        <div className='Footer'>
            <div className='bgtrans-overlay'>
                <div className='footer-content'>
                    <div className='footer-content-detail'>
                        <h3 style={{fontWeight:'bolder'}}>BÁCH KHOA E-LEARNING</h3>
                        <img style={{width:'110px',height:'100px'}} alt='' src={logo}/>
                    </div>
                    <div className='footer-content-detail'>
                        <h3 style={{fontWeight:'bolder'}}>WEBSITE</h3>
                        <h3><a href='https://hcmut.edu.vn/' target='blank'>HCMUT</a></h3>
                        <h3><a href='https://mybk.hcmut.edu.vn/my/index.action' target='blank'>MyBK</a></h3>
                        <h3><a href='https://mybk.hcmut.edu.vn/bksi/public/vi/' target='blank'>BKSI</a></h3>

                    </div>
                    <div className='footer-content-detail'>
                        <h3 style={{fontWeight:'bolder'}}>LIÊN HỆ</h3>
                        <p>📌268 Lý Thường Kiệt, P.14, Q.10, TP.HCM</p>
                        <p>📞 (028) 38 651 670 - (028) 38 647 256 (Ext: 5258, 5234)</p>
                        <p>💌 elearning@hcmut.edu.vn</p>
                    </div>
                </div>
            </div>
            <div className='footer-bottom'>
                Copyright 2023 - By Phan Hoàng Phúc
            </div>
        </div>
    );
};

export default Footer;