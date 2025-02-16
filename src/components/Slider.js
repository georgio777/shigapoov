import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

const Slider = ({ slides, slideTexts = [], autoPlayInterval = 5000 }) => {
  // Подготавливаем массив с клонами: [last, ...slides, first]
  const slidesWithClones = [slides[slides.length - 1], ...slides, slides[0]];
  const [currentIndex, setCurrentIndex] = useState(1);
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

  // После анимации корректируем индекс для бесконечной прокрутки
  useEffect(() => {
    if (currentIndex === slidesWithClones.length - 1) {
      // Если достигли клона первого слайда, переключаемся на реальный первый слайд
      setTimeout(() => setCurrentIndex(1), 300);
    } else if (currentIndex === 0) {
      // Если достигли клона последнего слайда, переключаемся на реальный последний слайд
      setTimeout(() => setCurrentIndex(slidesWithClones.length - 2), 300);
    }
  }, [currentIndex, slidesWithClones.length]);

  // Обработчики свайпов (используя react-swipeable)
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
        transition={{ type: 'tween', duration: 0.3 }}
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
      <button
        className="prev-button"
        onClick={() => { prevSlide(); resetAutoPlay(); }}
        style={{ position: 'absolute', bottom: '20px', left: '10px', zIndex: 10 }}
      >
        Prev
      </button>
      <button
        className="next-button"
        onClick={() => { nextSlide(); resetAutoPlay(); }}
        style={{ position: 'absolute', bottom: '20px', left: '70px', zIndex: 10 }}
      >
        Next
      </button>

      {/* Пагинация + Текстовые блоки */}
      <div
        className="pagination-container"
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: '10px',
          gap: '5%'
        }}
      >
        {slides.map((_, i) => {
          // Определяем активный слайд: currentIndex - 1 (учитывая клоны)
          const isActive = (currentIndex - 1 + slides.length) % slides.length === i;
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
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
              <p
                style={{
                  color: isActive ? 'grey' : 'black',
                  marginTop: '5px',
                  width: '100%',
                  textAlign: 'center'
                }}
              >
                {slideTexts[i] ? slideTexts[i] : `Slide ${i + 1}`}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
