'use client';

import React from 'react';

import ImageSlideshow from '../images/ImageSlideShow';

export default function Hero() {
  return (
    <section className="flex flex-col-reverse md:flex-row gap-[3rem] pt-24 mx-auto w-full max-w-[75rem] items-center px-10">
      <div>
        <h1 className="text-3xl font-bold transform uppercase bg-gradient-to-r from-indigo-500 to-blue-700 bg-clip-text text-transparent">Furniture berkualitas untuk orang berkualitas.</h1>
        <p className="text-2xl">Solusi kenyamanan anda</p>
        <div className="text-sm mt-8">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu mi pellentesque, interdum quam in, porttitor est.</p>
          <p>Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam erat volutpat. Morbi ultrices ut lectus</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu mi pellentesque, interdum quam in, porttitor est.</p>
        </div>
      </div>

      <div className="w-full max-w-[40rem] md:max-w-full h-[25rem]">
        <ImageSlideshow />
      </div>
    </section>
  );
}
