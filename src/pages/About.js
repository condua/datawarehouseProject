import React from 'react';
import '../scss/pages/About.scss'
import logo from '../images/about.jpg'
import phuc from '../images/phuc.jpg'
import huy from '../images/anhHuy.jpg'
import nhan from '../images/nhan.jpg'
import phucanh from '../images/phucanh.jpg'
const About = () => {
    return (
        <div className="About">
            <div className='container-about'>
                <div className='left-side'>
                    <h1>Our mission</h1>
                    <p>Tại RoadToUniversity, sứ mệnh của chúng tôi là tiếp bước cho học sinh trên hành trình tri thức. Bằng việc cung cấp cho học sinh các công cụ và thông tin cần thiết, chúng tôi giúp học sinh định hướng tìm được ngôi trường đại học phù hợp với nguyện vọng và năng lực học tập của mình.</p>
                </div>
                <img className='right-side' alt='' src='https://collegecost.ed.gov/wwwroot/fonts/graphic-scorecard.svg' />
                
            </div>

            <div style={{width:'80%',margin:'auto',borderBottom:'1px dashed black'}}></div>
            <p style={{textAlign:'center',marginBottom:'-20px'}}>💎</p>
            <h1 style={{textAlign:'center'}}>Team members</h1>
            <div className='team-members'>
                <div className='members-infor'>
                    <img alt='' className='avatar' src={phuc}/>
                    <h2>Phan Hoàng Phúc</h2>
                </div>
                
                <div className='members-infor'>
                    <img alt='' className='avatar' src={huy}/>
                    <h2>Nguyễn Quang Huy</h2>

                </div>
                <div className='members-infor'>
                    <img alt='' className='avatar' src={phucanh}/>
                    <h2>Trần Phúc Anh</h2>
                </div>
                <div className='members-infor'>
                    <img alt='' className='avatar' src={nhan}/>
                    <h2>Trần Thiện Nhân</h2>
                </div>
                
            </div>
        </div>
    );
};

export default About;