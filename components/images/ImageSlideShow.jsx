'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import furnitureIlustrasi1 from '@/assets/furniture-ilustrasi1.png';
import iklan1 from '@/assets/iklan1.png';
import iklan2 from '@/assets//iklan2.png';

const images = [
  { image: iklan1, alt: 'Ilustrasi furniture' },
  { image: iklan2, alt: 'iklan next furniture' },
  { image: furnitureIlustrasi1, alt: 'iklan next furniture' },
];

export default function ImageSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  let slideShowImgClass = 'w-full h-full object-cover absolute top-0 left-0 opacity-0 transform scale-110 translate-x-[-1rem] rotate-[5deg] transition-all duration-75 ease-in-out';

  let slideShowActive = `z-1 opacity-100 scale-100 translate-x-0 rotate-1`;

  return (
    <div className="relative w-full h-full rounded-md overflow-hidden shadow-md">
      {images.map((image, index) => (
        <Image key={index} src={image.image} className={`${slideShowImgClass} ${index === currentImageIndex ? slideShowActive : ''}`} alt={image.alt} />
      ))}
    </div>
  );
}
