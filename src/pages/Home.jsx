import PhotoSlider3 from '../components/PhotoSlider/PhotoSlider3';
import art1 from '../assets/art1.1.jpg';
import rahil1 from '../assets/Rahil1.1.jpg';
import art2 from '../assets/art2.jpg';
import art3 from '../assets/art3.jpg';
import art4 from '../assets/art4.jpg';
import art5 from '../assets/art5.jpg';
import art6 from '../assets/art6.jpg';

const Home = () => {
  return (
    <div
      className="bg-[#e6e6e6]"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
      }}
    >
      {/* <img src="/src/assets/art1.1.jpg" alt="" /> */}
      <div
        className="flex items-center justify-center bg-[#dbdbdb]"
        style={{ padding: '1rem', width: '100%' }}
      >
        <img
          src={rahil1}
          alt=""
          style={{
            borderRadius: '2px',
            maxHeight: '70vh',
            
          }}
        />
      </div>
      <div>
        <PhotoSlider3
          list={[
            art1,
            art2,
            art3,
            art4,
            art5,
            art6,
          ]}
        />
      </div>
    </div>
  );
};
export default Home;
