/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import LogoIcon from '../../assets/components/LogoIcon';
import HamburgerIcon from '../../assets/components/HamburgerIcon';
import useElementOffScreen from '../../hooks/useElementOffScreen';
import './Header.scss';

function Header(props: { sectionName: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const isHeaderOffScreen = useElementOffScreen(headerRef);

  useEffect(() => {
    if (!isHeaderOffScreen) {
      hamburgerRef.current?.classList.remove('hamburger-menu__sticky');
      return;
    }
    hamburgerRef.current?.classList.add('hamburger-menu__sticky');
  }, [isHeaderOffScreen]);

  return (
    <div className={'centered_nav header '}>
      <header className={'column'} aria-label='header with navigation' ref={headerRef}>
        <LogoIcon />
        <nav className={isMenuOpen ? 'nav__open' : 'nav__closed'}>
          {/* change header color based on where we are in the portfolio*/}
          <ul
            className={`${
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              props.sectionName === 'portfolio' ||
              props.sectionName === 'footer' ||
              props.sectionName === 'contact' ||
              props.sectionName === 'hero'
                ? 'nav-invert'
                : ''
            }`}
          >
            <li>
              <a
                className={`${props.sectionName === 'hero' ? 'lactive' : ''}`}
                href='#hero'
                onClick={() => setIsMenuOpen(false)}
              >
                home
              </a>
            </li>
            <li>
              <a
                className={`${props.sectionName === 'about' ? 'lactive' : ''}`}
                href='#about'
                onClick={() => setIsMenuOpen(false)}
              >
                about
              </a>
            </li>
            <li>
              <a
                className={`${props.sectionName === 'portfolio' ? 'lactive' : ''}`}
                href='#portfolio'
                onClick={() => setIsMenuOpen(false)}
              >
                portfolio
              </a>
            </li>
            <li>
              <a
                className={`${props.sectionName === 'resume' ? 'lactive' : ''}`}
                href='#resume'
                onClick={() => setIsMenuOpen(false)}
              >
                resume
              </a>
            </li>
            <li>
              <a
                className={`${props.sectionName === 'contact' ? 'lactive' : ''}`}
                href='#contact'
                onClick={() => setIsMenuOpen(false)}
              >
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
