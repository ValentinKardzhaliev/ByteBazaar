import backgroundImage from '../../assets/images/asustufpromo-ecoms.webp'
import './HomePageImage.css'

function HomePageImage() {
    return (
        <div className="first-image-container">
            <img src={backgroundImage} alt="first-image" className='home-page-first-image'/>
        </div>

    )
}


export default HomePageImage;