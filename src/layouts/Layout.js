import { NavLink, Outlet } from "react-router-dom";

import "./Layout.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen, faGear, faPersonBiking } from "@fortawesome/free-solid-svg-icons";

const Layout = () => {
  return (
    <section className="layout">
      <nav className="layout__nav">
        <NavLink className="layout__nav--link" to="/vehicles">
          <FontAwesomeIcon icon={faPersonBiking} size="xl" />
        </NavLink>
        <NavLink className="layout__nav--link" to="/deliveries">
          <FontAwesomeIcon icon={faBoxOpen} size="xl" />
        </NavLink>
        <div className="layout__nav--separator"></div>
        <NavLink className="layout__nav--link" to="/deliveries">
          <FontAwesomeIcon icon={faGear} size="xl" />
        </NavLink>
      </nav>
      <section className="layout__main">
        <Outlet />
      </section>      
    </section>
  )
};

export default Layout;