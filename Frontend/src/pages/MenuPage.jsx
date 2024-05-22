import React from "react";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";

// menu Page
function MenuPage() {
  return (
    <div
      style={{
        backgroundImage: `url(src/assets/menu-bg.jpg)`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <Navbar />
      <Menu />
    </div>
  );
}

export default MenuPage;
