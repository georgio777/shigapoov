import { BrowserRouter, Routes, Route} from 'react-router-dom';
import React, { useRef, useEffect } from 'react';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import PostPage from './pages/PostPage';
import './App.css';
import Scrollbar from 'smooth-scrollbar';
import { useMotionValue } from 'motion/react';

// экспорт контекста чтобы отлавливать его в animatedheading так как, smooth scrollbar перехватывает логику скроллинга и ломает анимированный заголовок
export const ScrollContext = React.createContext();


function App() {
  const scrollbarRef = useRef(null);
  const scrollY = useMotionValue(0); // Теперь это MotionValue, а не useState
  useEffect(() => {
    const scrollbar = Scrollbar.init(scrollbarRef.current, { damping: 0.05 });
    const updateScroll = () => {
      scrollY.set(scrollbar.offset.y); // Обновляем MotionValue
    };

    scrollbar.addListener(updateScroll);

    return () => {
      scrollbar.removeListener(updateScroll);
      scrollbar.destroy();
    };
  }, [scrollY]); // Добавляем scrollY в зависимости

  return (
    <ScrollContext.Provider value={{ scrollY }}>
      <div ref={scrollbarRef} 
      style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* Главная страница */}
                <Route index element={<Home />} />
                {/* Страница контактов */}
                <Route path="contacts" element={<Contacts />} />
                <Route path="post/:id" element={<PostPage />} /> {/* Добавлен маршрут для постов */}
              </Route>
            </Routes>
          </BrowserRouter>
      </div>
    </ScrollContext.Provider>
  );
}

export default App;
