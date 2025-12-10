import PhotoSlider3 from '../components/PhotoSlider/PhotoSlider3';

const Home = () => {
  return (
    <div>
      {/* <img src="/src/assets/art1.1.jpg" alt="" /> */}
      {/* <img src="/src/assets/art1.1.jpg" alt="" /> */}
      <PhotoSlider3
        list={[
          '/src/assets/rahil1.jpg',
          '/src/assets/art1.1.jpg',
          '/src/assets/art2.jpg',
          '/src/assets/art3.jpg',
          '/src/assets/art4.jpg',
          '/src/assets/art5.jpg',
          '/src/assets/art6.jpg',
          // '/src/assets/art1.1.jpg',
          // '/src/assets/rahil1.jpg',
          // '/src/assets/art1.1.jpg',
          // '/src/assets/rahil1.jpg',
          // '/src/assets/art1.1.jpg',
        ]}
      />
    </div>
  );
};
export default Home;
