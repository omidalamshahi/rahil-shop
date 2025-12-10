import { useState } from 'react';
import PhotoSlider3 from '../components/PhotoSlider/PhotoSlider3';

const Test1 = () => {
  const [showPhotoSlider, setShowPhotoSlider] = useState(false);
  return (
    <div>
      {showPhotoSlider && (
        <PhotoSlider3
          setShow={setShowPhotoSlider}
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
      )}
      <button
        onClick={() => {
          setShowPhotoSlider(true);
        }}
      >
        show
      </button>
    </div>
  );
};
export default Test1;
