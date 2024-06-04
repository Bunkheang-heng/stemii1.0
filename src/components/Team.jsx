import React from 'react'
import "../assets/css/Team.css"
import team01 from '../assets/image/Yuth.jpg'
import team02 from '../assets/image/Rithy.jpg'
import team03 from '../assets/image/Kheang.jpg'
import team04 from '../assets/image/Rithy.jpg'


const teamMembers = [
    {
        imgUrl: team01,
        name: 'Srun VireakYuth',
        position: 'Production Designer'
    },

    {
        imgUrl: team02,
        name: 'Chan Sokrithy',
        position: 'Product Seller'
    },

    {
        imgUrl: team03,
        name: 'HENG Bunkheang',
        position: 'Developer'
    },

    {
        imgUrl: team04,
        name: 'Hieng Dara',
        position: 'Business'
    },
]

const Team = () => {
    return (
        <section className='our__team'>
            <div className='container'>
                <div className='team__content'>
                    <h6 className='subtitle'>Our Team</h6>
                </div>
                <div className='team__wrapper'>
                    {
                        teamMembers.map((item, index) => (
                            <div className='team__item' key={index}>
                                <div className='team__img'>
                                    <img src={item.imgUrl} alt='' />
                                </div>
                                <div className='team__details'>
                                    <h4>{item.name}</h4>
                                    <p className='description'>{item.position}</p>

                                    <div className='team__member-social'>
                                        <span><i class='ri-linkedin-line'></i></span>
                                        <span><i class='ri-twitter-line'></i></span>
                                        <span><i class='ri-facebook-line'></i></span>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Team; 