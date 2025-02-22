import React, { useContext } from 'react';
import { HeaderContext } from "../components/Layout";
import Slider from '../components/Slider';
import AnimatedHeading from '../components/AnimatedHeading';
import PostsList from '../components/PostList';
import Solutions from '../components/Solutions';
import casesImg from '../assets/figure.svg';
import solutionsImg from '../assets/figure2.svg'

const Home = () => {
  // Задаем отступ у слайдера исходя из высоты хэдэра
  const headerHeight = useContext(HeaderContext);


  return (
    <>
      <div className='outer__container'>
        <section
        className='section__one'
        style={{ paddingTop: `${headerHeight}px` }}>
          <Slider />
        </section>
      </div>
      <div className='lcontainer'>
        <section
        className='cases__section'>
          <AnimatedHeading heading={'Кейсы'} img={casesImg} headingClass={'cases'}/>
          <PostsList />
        </section>
      </div>
      <div className='outer__container'>
        <section className='solutions__section'>
          <div className='inner__container slutions__heading--bg'>
            <AnimatedHeading heading={'Решения'} img={solutionsImg} headingClass={'solutions'}/>
          </div>
          <Solutions />
        </section>
      </div>
    </>
  );
};

export default Home;
