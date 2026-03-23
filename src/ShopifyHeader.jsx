import React from 'react';
import headerLap from './assets/header_lap.png';
import headerPhone from './assets/header_phone.png';

const ShopifyHeader = () => {
  return (
    <header className="w-full">
      <img
        src={headerLap}
        alt="Header"
        className="hidden md:block w-full h-auto"
      />
      <img
        src={headerPhone}
        alt="Header"
        className="block md:hidden w-full h-auto"
      />
    </header>
  );
};

export default ShopifyHeader;
