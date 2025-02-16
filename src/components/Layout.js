import React, { useState, createContext } from "react";
import { Outlet } from "react-router";
import Header from "./Header";

const HeaderContext = createContext();

const Layout = () => {
  const [headerHeight, setHeight] = useState(0);

  return (
    <div>
      <Header headerHeight={headerHeight} setHeight={setHeight} />
      <main>
        <HeaderContext.Provider value={headerHeight}>
          <Outlet />
        </HeaderContext.Provider>
      </main>
    </div>
  );
};

export { HeaderContext, Layout };
