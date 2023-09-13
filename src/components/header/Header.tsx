/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import BMIcon from '../../assets/components/BMIcon';
import HamburgerIcon from '../../assets/components/HamburgerIcon';
import useElementOffScreen from '../../hooks/useElementOffScreen';
import './Header.scss';

function Header(props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const isHeaderOffScreen = useElementOffScreen(headerRef);
  // props.sectionName - if portfolio, change header theme

  useEffect(() => {
    if (!isHeaderOffScreen) {
      hamburgerRef.current?.classList.remove('hamburger-menu__sticky');
      return;
    }
    hamburgerRef.current?.classList.add('hamburger-menu__sticky');
  }, [isHeaderOffScreen]);

  return (
    <div className={'centered_nav header'}>
      <header className='column' aria-label='header with navigation' ref={headerRef}>
        <BMIcon />
        <nav className={isMenuOpen ? 'nav__open' : 'nav__closed'}>
          <ul
            className={`${
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              props.sectionName === 'portfolio' ? 'nav-invert' : ''
            }`}
          >
            <li>
              <a href='#hero' onClick={() => setIsMenuOpen(false)}>
                home
              </a>
            </li>
            <li>
              <a href='#about' onClick={() => setIsMenuOpen(false)}>
                about
              </a>
            </li>
            <li>
              <a href='#portfolio' onClick={() => setIsMenuOpen(false)}>
                portfolio
              </a>
            </li>
            <li>
              <a href='#contact' onClick={() => setIsMenuOpen(false)}>
                contact
              </a>
            </li>
          </ul>
        </nav>
        <button
          className='hamburger-menu'
          onClick={() => setIsMenuOpen((prev) => !prev)}
          ref={hamburgerRef}
        >
          <HamburgerIcon />
        </button>
      </header>
    </div>
  );
}

export default Header;
