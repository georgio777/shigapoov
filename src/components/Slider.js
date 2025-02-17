import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

// Контент слайдов
const slide1 = (
  <div className='slide__content inner__container'>
    <div className='slide__left'>
      <h1 className='slide__heading'>Разработка сайтов под ключ</h1>
      <p className='slide__left--text'>
        Недорогие полнофункциональные решения<br/> для малого бизнеса и ИП
      </p>
      <button className='slider__button'>kek</button>
    </div>
    <div className='slide__right'>
      <p className='slide__right--text'>Проектов реализовано</p>
      <span className='slide__counter'>58</span>
    </div>
  </div>
);

const slide2 = (
  <div className='slide__content inner__container'>
    <div className='slide__left'>
      <h1 className='slide__heading'>Разработка сайтов под ключ</h1>
      <p className='slide__left--text'>Недорогие полнофункциональные решения для малого бизнеса и ИП</p>
      <button className='slider__button'>kek</button>
    </div>
    <div className='slide__right'>
      <p className='slide__right--text'>Проектов реализовано</p>
      <span className='slide__counter'>58</span>
    </div>
  </div>
);

const slide3 = (
  <div className='slide__content inner__container'>
    <div className='slide__left'>
      <h1 className='slide__heading'>Разработка сайтов под ключ</h1>
      <p className='slide__left--text'>Недорогие полнофункциональные решения для малого бизнеса и ИП</p>
      <button className='slider__button'>kek</button>
    </div>
    <div className='slide__right'>
      <p className='slide__right--text'>Проектов реализовано</p>
      <span className='slide__counter'>58</span>
    </div>
  </div>
);

const slide4 = (
  <div className='slide__content inner__container'>
    <div className='slide__left'>
      <h1 className='slide__heading'>Разработка сайтов под ключ</h1>
      <p className='slide__left--text'>Недорогие полнофункциональные решения для малого бизнеса и ИП</p>
      <button className='slider__button'>kek</button>
    </div>
    <div className='slide__right'>
      <p className='slide__right--text'>Проектов реализовано</p>
      <span className='slide__counter'>58</span>
    </div>
  </div>
);

const slides = [slide1, slide2, slide3, slide4];

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

const Slider = ({ autoPlayInterval = 6000 }) => {
  // Массив с клонами: [last, ...slides, first]
  const slidesWithClones = [slides[slides.length - 1], ...slides, slides[0]];
  const [currentIndex, setCurrentIndex] = useState(1);
  const [disableTransition, setDisableTransition] = useState(false);
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

  // Обработчик завершения анимации
  const handleAnimationComplete = () => {
    if (currentIndex === slidesWithClones.length - 1) {
      // Если мы на клоне первого слайда
      setDisableTransition(true);
      setCurrentIndex(1);
      setTimeout(() => setDisableTransition(false), 50);
    } else if (currentIndex === 0) {
      // Если мы на клоне последнего слайда
      setDisableTransition(true);
      setCurrentIndex(slidesWithClones.length - 2);
      setTimeout(() => setDisableTransition(false), 50);
    }
  };

  // Обработчики свайпов (с react-swipeable)
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

  // Вычисляем настройки перехода: если disableTransition=true, duration = 0
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
          height: '500px',
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
          style={{ zIndex: 10 }}
        />
        <button
          className="next-button slider__navigation--button sprite"
          onClick={() => { nextSlide(); resetAutoPlay(); }}
          style={{ zIndex: 10 }}
        />
      </div>

      {/* Пагинация + Текстовые блоки */}
      <div
        className="pagination-container inner__container"
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '10px',
          gap: '5%'
        }}
      >
        {slides.map((_, i) => {
          const isActive = (currentIndex - 1 + slides.length) % slides.length === i;
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                cursor: 'pointer',
              }}
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