import {useRef} from "react";
import navCSS from "./../Nav/Nav.module.css";

function Nav () {

    const menu = useRef()
    const menuHandler = () => {
        menu.current.classList.toggle(navCSS.showNav);
    }

    return (
        <div className={navCSS.nav_wrapper}>
            <div className={navCSS.logo}>
                <a href="#"><span>Moonlight Valley Hotel</span><span id={navCSS.stars}>****</span></a>
            </div>
            <ul ref={menu}>
                <li><a href="#">Kezdőlap</a></li>
                <li><a href="#">Rólunk</a></li>
                <li><a href="#">Szobáink</a></li>
                <li><a href="#">Ajánlataink</a></li>
                <li><a href="#">Galéria</a></li>
                <li><a href="#">Kapcsolat</a></li>
            </ul>
            <div className={navCSS.Nav_btns}>
                <button>Foglalás</button>
                <i className="ri-menu-4-line" id={navCSS.bars} onClick={menuHandler}></i>
            </div>
        </div>
    )

}

export default Nav;
