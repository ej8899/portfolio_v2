import { useEffect, useRef, useState } from 'react';
import LogoIcon from '../../assets/components/LogoIcon';
import HamburgerIcon from '../../assets/components/HamburgerIcon';
import useElementOffScreen from '../../hooks/useElementOffScreen';
import './Header.scss';

interface HeaderProps {
  sectionName: string;
}

function Header(props: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const isHeaderOffScreen = useElementOffScreen(headerRef);

  useEffect(() => {
    if (!isHeaderOffScreen) {
      hamburgerRef.current?.classList.remove('hamburger-menu__sticky');
    } else {
      hamburgerRef.current?.classList.add('hamburger-menu__sticky');
    }
  }, [isHeaderOffScreen]);

  const scrollToTargetElement = (targetId: string) => {
    const targetElement = document.getElementById(targetId);
    console.log('target', targetElement);
    if (targetElement) {
      const initialRect = targetElement?.getBoundingClientRect();
      console.log('Target element initial position:', initialRect);

      targetElement.scrollIntoView({ behavior: 'smooth' });

      setTimeout(() => {
        const updatedRect = targetElement?.getBoundingClientRect();
        console.log('Target element position after click:', updatedRect);
      }, 0);

      setIsMenuOpen(false);
    } else {
      console.error(`Element with id ${targetId} not found.`);
    }
  };

  const handleNavLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // event.preventDefault();
    // const targetId = event.currentTarget.getAttribute('href')!;
    // console.log('event', targetId);
    // scrollToTargetElement(targetId);
    setIsMenuOpen(false);
  };

  return (
    <div className={'centered_nav header '}>
      <header className={'column'} aria-label='header with navigation' ref={headerRef}>
        <LogoIcon />
        <nav className={isMenuOpen ? 'nav__open' : 'nav__closed'}>
          <ul
            className={`${
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
                // onClick={handleNavLinkClick}
                onClick={() => setIsMenuOpen(false)}
              >
                home
              </a>
            </li>
            <li>
              <a
                className={`${props.sectionName === 'about' ? 'lactive' : ''}`}
                href='#about'
                onClick={handleNavLinkClick}
              >
                about
              </a>
            </li>
            <li>
              <a
                className={`${props.sectionName === 'portfolio' ? 'lactive' : ''}`}
                href='#portfolio'
                onClick={handleNavLinkClick}
              >
                portfolio
              </a>
            </li>
            <li>
              <a
                className={`${props.sectionName === 'resume' ? 'lactive' : ''}`}
                href='#resume'
                onClick={handleNavLinkClick}
              >
                resume
              </a>
            </li>
            <li>
              <a
                className={`${props.sectionName === 'contact' ? 'lactive' : ''}`}
                href='#contact'
                onClick={handleNavLinkClick}
                // onClick={() => setIsMenuOpen(false)}
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
