import React, { useContext } from 'react';
import { HeaderContext } from "../components/Layout";

const Home = () => {
  const headerHeight = useContext(HeaderContext);

  return (
    <div style={{ marginTop: `${headerHeight}px` }}>
      <h1>SHIGAPOV</h1>
      <p>Добро пожаловать на главную страницу!</p>

      {/* Другие разделы главной страницы */}
      <section id="prices">
        <h2>Цены</h2>
        <p>Здесь указаны актуальные цены на наши услуги.</p>
      </section>
    </div>
  );
};

export default Home;
