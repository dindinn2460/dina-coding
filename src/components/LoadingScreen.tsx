import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="w-64 h-64">
        <DotLottieReact
          src="https://lottie.host/3fc728b6-2617-4660-895d-fe6bfa87e673/jSP3gb1QFz.lottie"
          loop
          autoplay
        />
      </div>
      {/* Opsional: Kamu bisa menambahkan teks loading di bawahnya */}
      <p className="mt-4 text-sm font-medium text-muted-foreground animate-pulse">
        Memuat halaman...
      </p>
    </div>
  );
};

export default LoadingScreen;