import React, { useState } from 'react';

const images = [
  'https://picsum.photos/id/1018/600/300',
  'https://picsum.photos/id/1015/600/300',
  'https://picsum.photos/id/1016/600/300'
];

export default function SimpleSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const prevSlide = () => {
    setLoading(true);
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setLoading(true);
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div style={styles.sliderContainer}>
      {loading && <div style={styles.loading}>Loading image...</div>}

      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        style={{ ...styles.image, display: loading ? 'none' : 'block' }}
        onLoad={() => setLoading(false)}
      />

      <div style={styles.controls}>
        <button onClick={prevSlide}>⟵ Prev</button>
        <button onClick={nextSlide}>Next ⟶</button>
      </div>
    </div>
  );
}

const styles = {
  sliderContainer: {
    textAlign: 'center',
    maxWidth: '600px',
    margin: 'auto',
    position: 'relative'
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    transition: 'opacity 0.3s ease-in-out'
  },
  loading: {
    padding: '1em',
    fontStyle: 'italic',
    color: '#888'
  },
  controls: {
    marginTop: '10px'
  }
};
