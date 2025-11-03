import React from 'react';
import Spline from '@splinetool/react-spline';

const Hero = () => {
  return (
    <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden bg-blue-600">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/zhZFnwyOYLgqlLWk/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-3xl text-white/90">
            <h1 className="text-4xl md:text-6xl font-semibold leading-tight">Property management made simple</h1>
            <p className="mt-4 text-white/80 text-lg md:text-xl">Track properties, manage tenants, and send reminders — all in one clean, modern dashboard.</p>
            <div className="mt-8 flex items-center gap-4">
              <a href="#manager" className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 px-5 py-3 rounded-lg font-medium transition-colors">
                Get started
              </a>
              <a href="#features" className="inline-flex items-center gap-2 text-white/90 hover:text-white underline-offset-4 hover:underline">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-950/40 via-blue-900/20 to-blue-900/60" />
    </section>
  );
};

export default Hero;
