import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import HeaderButton from './HeaderButton';


function Slide1() {
  const [projectsCounter, setCounter] = useState(0);
  const [counterSpeed, setCounterSpeed] = useState(5);

  const isVisible = window.innerWidth > 1025
  
  useEffect(() => {
    if (isVisible && projectsCounter < 58) {
      setTimeout(() => {
        setCounter((value) => value + 1);
        setCounterSpeed((speed) => speed + 2);
      }, counterSpeed);
    }
  }, [projectsCounter, counterSpeed, isVisible]);
  return (
    <div className='slide__content inner__container'>
      <div className='slide__left'>
        <h1 className='slide__heading'>Разработка сайтов под ключ</h1>
        <p className='slide__left--text'>
          Недорогие полнофункциональные решения<br/> для малого бизнеса и ИП
        </p>
        <HeaderButton />
      </div>
      {isVisible && (
        <div className='slide__right'>
          <div className='slide__right--inner'>
            <p className='slide__right--text'>Проектов реализовано</p>
            <span className='slide__counter'>{projectsCounter}</span>
          </div>
        </div>
      )}
    </div>
)};

function Slide2() {
  return (
    <div className='slide__content inner__container'>
      <div className='slide__left'>
        <h1 className='slide__heading'>Разработка сайтов под ключ</h1>
        <p className='slide__left--text'>
          Недорогие полнофункциональные решения<br/> для малого бизнеса и ИП
        </p>
        <button className='slider__button'></button>
      </div>
      <div className='slide__right'>
        <div className='slide__right--inner'>
          <p className='slide__right--text'>Проектов реализовано</p>
          <span className='slide__counter'>58</span>
        </div>
      </div>
    </div>
)};

function Slide3() {
  return (
    <div className='slide__content inner__container'>
      <div className='slide__left'>
        <h1 className='slide__heading'>Разработка сайтов под ключ</h1>
        <p className='slide__left--text'>
          Недорогие полнофункциональные решения<br/> для малого бизнеса и ИП
        </p>
        <button className='slider__button'></button>
      </div>
      <div className='slide__right'>
        <div className='slide__right--inner'>
          <p className='slide__right--text'>Проектов реализовано</p>
          <span className='slide__counter'>58</span>
        </div>
      </div>
    </div>
)};

function Slide4() {
  return (
    <div className='slide__content inner__container'>
      <div className='slide__left'>
        <h1 className='slide__heading'>Разработка сайтов под ключ</h1>
        <p className='slide__left--text'>
          Недорогие полнофункциональные решения<br/> для малого бизнеса и ИП
        </p>
        <button className='slider__button'></button>
      </div>
      <div className='slide__right'>
        <div className='slide__right--inner'>
          <p className='slide__right--text'>Проектов реализовано</p>
          <span className='slide__counter'>58</span>
        </div>
      </div>
    </div>
)};

const slides = [<Slide1 />, <Slide2 />, <Slide3 />, <Slide4 />];

const text1 = (
  <>
    <h2 className='slide__pagination--heading'>Сайты</h2>
    <p className='slide__pagination--description'>
      Разработка корпоративных сайтов и лендингов, с уникальным дизайном
    </p>
  </>
);

const text2 = (
  <>
    <h2 className='slide__pagination--heading'>E-Commerce</h2>
    <p className='slide__pagination--description'>
      Разработка интернет-магазинов с возможностью онлайн оплаты и доставкой
    </p>
  </>
);

const text3 = (
  <>
    <h2 className='slide__pagination--heading'>Маркетинг</h2>
    <p className='slide__pagination--description'>
      От SEO продвижения до контекстной рекламы и SMM. Приводим целевой трафик
    </p>
  </>
);

const text4 = (
  <>
    <h2 className='slide__pagination--heading'>Bitrix24</h2>
    <p className='slide__pagination--description'>
      Систематизируем Ваш бизнес. Профессиональное внедрение Битрикс24
    </p>
  </>
);

const slideTexts = [text1, text2, text3, text4];

const Slider = ({ autoPlayInterval = 60000 }) => {
  // Массив с клонами: [last, ...slides, first]
  const slidesWithClones = [slides[slides.length - 1], ...slides, slides[0]];
  const [currentIndex, setCurrentIndex] = useState(1);
  // Изначально disableTransition true, чтобы отключить анимацию на монтировании
  const [disableTransition, setDisableTransition] = useState(true);
  const sliderRef = useRef(null);
  const autoPlayTimer = useRef(null);
  const isHovered = useRef(false);

  // Функция перехода к следующему слайду
  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => prev + 1);
  }, []);

  // Функция перехода к предыдущему слайду
  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => prev - 1);
  }, []);

  // Сброс автопроигрывания
  const resetAutoPlay = useCallback(() => {
    if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    if (!isHovered.current) {
      autoPlayTimer.current = setInterval(() => {
        nextSlide();
      }, autoPlayInterval);
    }
  }, [autoPlayInterval, nextSlide]);

  // Запускаем автоперелистывание
  useEffect(() => {
    resetAutoPlay();
    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [resetAutoPlay]);

  // Отключаем анимацию при монтировании
  useEffect(() => {
    setTimeout(() => setDisableTransition(false), 50);
  }, []);

  // Обработчик завершения анимации
  const handleAnimationComplete = () => {
    if (currentIndex === slidesWithClones.length - 1) {
      setDisableTransition(true);
      setCurrentIndex(1);
      setTimeout(() => setDisableTransition(false), 50);
    } else if (currentIndex === 0) {
      setDisableTransition(true);
      setCurrentIndex(slidesWithClones.length - 2);
      setTimeout(() => setDisableTransition(false), 50);
    }
  };

  // Обработчики свайпов
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      nextSlide();
      resetAutoPlay();
    },
    onSwipedRight: () => {
      prevSlide();
      resetAutoPlay();
    },
    trackMouse: true,
  });

  // Остановка автопроигрывания при наведении
  const handleMouseEnter = () => {
    isHovered.current = true;
    if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    resetAutoPlay();
  };

  // Обработчик клика по пагинации
  const handlePaginationClick = (index) => {
    setCurrentIndex(index);
    resetAutoPlay();
  };

  // Вычисляем настройки перехода
  const transitionSetting = disableTransition 
    ? { duration: 0 } 
    : { type: 'tween', duration: 0.3 };

  return (
    <div
      className="slider-container"
      ref={sliderRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...swipeHandlers}
      style={{ position: 'relative', overflow: 'hidden', width: '100%' }}
    >
      {/* Слайдер */}
      <motion.div
        className="slider-track"
        style={{
          display: 'flex',
          width: `${slidesWithClones.length * 100}%`,
        }}
        animate={{
          x: -currentIndex * (100 / slidesWithClones.length) + '%'
        }}
        transition={transitionSetting}
        onAnimationComplete={handleAnimationComplete}
      >
        {slidesWithClones.map((slide, index) => (
          <div
            className="slide"
            key={index}
            style={{
              width: `${100 / slidesWithClones.length}%`,
              flexShrink: 0,
            }}
          >
            {slide}
          </div>
        ))}
      </motion.div>

      {/* Кнопки навигации */}
      <div className="buttons__container inner__container">
        <button
          className="prev-button slider__navigation--button sprite"
          onClick={() => { prevSlide(); resetAutoPlay(); }}
        />
        <button
          className="next-button slider__navigation--button sprite"
          onClick={() => { nextSlide(); resetAutoPlay(); }}
        />
      </div>

      {/* Пагинация + Текстовые блоки */}
      <div
        className="pagination__container inner__container"
      >
        {slides.map((_, i) => {
          const isActive = (currentIndex - 1 + slides.length) % slides.length === i;
          return (
            <div
              className={`pagination__wrapper ${isActive? '' : 'disabled__pagination--wrapper'}`}
              key={i}
              onClick={() => handlePaginationClick(i + 1)}
            >
              <div
                className="pagination-item"
                style={{
                  width: '100%',
                  height: '2px',
                  background: '#D6DEE7',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {isActive && (
                  <motion.div
                    className="progress-bar"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: autoPlayInterval / 1000, ease: 'linear' }}
                    style={{
                      height: '100%',
                      background: '#000',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }}
                  />
                )}
              </div>
              <div
                className={`pagination__text ${isActive ? 'active__pagination' : 'disabled__pagination'}`}
                style={{
                  marginTop: '5px',
                  width: '100%',
                }}
              >
                {slideTexts[i] ? slideTexts[i] : `Slide ${i + 1}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;