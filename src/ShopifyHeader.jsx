import React from 'react';
import headerLap from './assets/header_lap.png';
import headerLap1 from './assets/header_lap1.png';
import h1Lap from './assets/h1_lap.png';
import headerPhone from './assets/header_phone.png';
import headerPhone1 from './assets/header_phone1.png';
import h1Phone from './assets/h1_phone.png';
import HeaderReels from './HeaderReels';

const ShopifyHeader = () => {
  return (
    <header className="w-full">
      <img
        src={headerLap}
        alt="Header"
        className="hidden md:block w-full h-auto"
      />
      <img
        src={headerLap1}
        alt="Header"
        className="hidden md:block w-full h-auto"
      />
      <img
        src={h1Lap}
        alt="Header"
        className="hidden md:block w-full h-auto"
      />
      <img
        src={headerPhone}
        alt="Header"
        className="block md:hidden w-full h-auto"
      />
      <img
        src={headerPhone1}
        alt="Header"
        className="block md:hidden w-full h-auto"
      />
      <img
        src={h1Phone}
        alt="Header"
        className="block md:hidden w-full h-auto"
      />
      <HeaderReels />
    </header>
  );
};

export default ShopifyHeader;
