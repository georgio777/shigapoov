import React, { useContext } from 'react';
import { HeaderContext } from "../components/Layout";
import Slider from '../components/Slider';

const Home = () => {
  const headerHeight = useContext(HeaderContext);

  return (
    <div className='outer__container'>
      <section className='section__one'
      style={{ paddingTop: `${headerHeight}px` }}>
        <Slider />
      </section>
    </div>
  );
};

export default Home;
