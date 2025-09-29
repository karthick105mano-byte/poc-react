import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import placeholderImg from './../assets/placeholder.jpg'; // 👈 Your local image

const images = [
  'https://picsum.photos/id/1018/600/300',
  'https://picsum.photos/id/1015/600/300',
  'https://picsum.photos/id/1016/600/300',
  'https://picsum.photos/id/1019/600/300',
];

export default function SlickSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div style={{ width: '600px', margin: '40px auto' }}>
      <Slider {...settings}>
        {images.map((src, index) => (
          <ImageWithPlaceholder key={index} src={src} alt={`Slide ${index + 1}`} />
        ))}
      </Slider>
    </div>
  );
}

function ImageWithPlaceholder({ src, alt }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {!loaded && (
        <img
          src={placeholderImg}
          alt="placeholder"
          style={{
            width: '100%',
            height: 'auto',
            position: 'unset',
            top: 0,
            left: 0,
            zIndex: 1,
            borderRadius: '10px',
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        style={{
          width: '100%',
          height: 'auto',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
          borderRadius: '10px',
        }}
      />
    </div>
  );
}
