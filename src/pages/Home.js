import React, { useContext } from 'react';
import { HeaderContext } from "../components/Layout";
import Slider from '../components/Slider';
import AnimatedHeading from '../components/AnimatedHeading';
import PostsList from '../components/PostList';
import casesImg from '../assets/figure.svg';

const Home = () => {
  // Задаем отступ у слайдера исходя из высоты хэдэра
  const headerHeight = useContext(HeaderContext);

  return (
    <>
      <div className='outer__container'>
        <section className='section__one'
        style={{ paddingTop: `${headerHeight}px` }}>
          <Slider />
        </section>
      </div>
      <div className='lcontainer'>
        <section className='cases__section'>
          <AnimatedHeading heading={'Кейсы'} img={casesImg}/>
          <PostsList />
        </section>
      </div>
    </>
  );
};

export default Home;
