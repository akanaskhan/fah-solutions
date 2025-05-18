import React from 'react';

export default function NotFound(){
  return (
    <div className='flex flex-col h-svh lg:h-screen justify-center items-center'>
      <h1 className='text-3xl font-extrabold'>404 - Page Not Found</h1>
      
      <iframe src="https://lottie.host/embed/f5e8fb6d-f6dc-46b1-be53-2f89c6de0a7e/aE9M0XCctH.json" className='w-3/4 h-1/3 lg:w-9/12 lg:h-2/4'></iframe>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
};

// export default NotFound;
