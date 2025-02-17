import React, { useContext } from 'react';
import { HeaderContext } from "../components/Layout";
import Slider from '../components/Slider';

const Home = () => {
  const headerHeight = useContext(HeaderContext);

  return (
    <div className='outer__container' style={{
      paddingTop: '20px'
    }}>
      <section className='section__one'
      style={{ paddingTop: `${headerHeight}px` }}>
        <Slider 
          // slides={[<div>Content 1</div>, <div>Content 2</div>, <div>Content 3</div>]}
          // slideTexts={['Custom Text 1', 'Customыываы Text 2', 'Custom Text 3']}
        />
      </section>
    </div>
  );
};

export default Home;
