import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import cn from 'classnames';
import Container from '../container';
import ArrowRightSidebar from '../icons/arrow-right-sidebar';
import Search from '../search';

export default function SidebarMobile({ children }) {
  const router = useRouter();
  const [opened, setOpen] = useState(false);
  const menuRef = useRef();
  const searchRef = useRef();
  const openMenu = () => {
    disableBodyScroll(menuRef.current);
    setOpen(true);
  };
  const closeMenu = () => {
    enableBodyScroll(menuRef.current);
    setOpen(false);
  };
  const onSearchStart = () => {
    disableBodyScroll(searchRef.current);
    closeMenu();
  };
  const onSearchClear = () => {
    enableBodyScroll(searchRef.current);
  };
  const toggleOpen = () => {
    if (opened) closeMenu();
    else openMenu();
  };

  // Close the menu after a page navigation
  useEffect(() => {
    if (opened) {
      disableBodyScroll(menuRef.current);
      setOpen(false);
    }
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [router.asPath]);

  return (
    <Container>
      <div className="sidebar-search" ref={searchRef}>
        <Search mobile onSearchStart={onSearchStart} onSearchClear={onSearchClear} />
      </div>
      <label htmlFor="dropdown-input" className={cn('dropdown-toggle', { opened })}>
        <input id="dropdown-input" type="checkbox" checked={opened} onChange={toggleOpen} />
        <div className="docs-select">
          <ArrowRightSidebar fill="#999" />
          Menu
        </div>
      </label>
      <div className="docs-dropdown" ref={menuRef}>
        <Container>
          <nav>{children}</nav>
        </Container>
      </div>
      <style jsx>{`
        .sidebar-search {
          display: none;
          border-top: 1px solid #f5f5f5;
          padding: 0.5rem 0;
        }
        .sidebar-search :global(.react-autosuggest__suggestions-container) {
          max-height: none;
        }
        .sidebar-search :global(.react-autosuggest__suggestions-container--open) {
          top: 113px;
          bottom: calc(153px - 100vh);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          z-index: 1;
        }
        .sidebar-search :global(.react-autosuggest__suggestions-list) {
          height: auto;
        }
        .sidebar-search :global(.react-autosuggest__suggestion) {
          padding-left: 0.75rem;
        }
        .sidebar-search :global(.no-results) {
          top: 113px;
          left: 0;
          right: 0;
          bottom: calc(153px - 100vh);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        #dropdown-input {
          display: none;
        }
        .dropdown-toggle {
          width: 100%;
          display: none;
        }
        .docs-select {
          display: flex;
          height: 2.5rem;
          width: 100%;
          line-height: 3rem;
          align-items: center;
          text-align: left;
          cursor: pointer;
          border-top: 1px solid #f5f5f5;
        }
        .docs-dropdown {
          display: none;
          position: absolute;
          left: 0;
          right: 0;
          top: 100%;
          bottom: 100%;
          background: white;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          transition: bottom 0.2s ease-out;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .docs-dropdown nav {
          border-left: 1px solid #eaeaea;
          padding: 10px 19px;
        }
        .opened ~ .docs-dropdown {
          bottom: calc(153px - 100vh);
          border-top: 1px solid #eaeaea;
        }
        .docs-select :global(svg) {
          margin-right: 14px;
          transition: transform 0.15s ease;
        }
        .opened > .docs-select :global(svg) {
          transform: rotate(90deg);
        }
        @media screen and (max-width: 950px) {
          .sidebar-search,
          .dropdown-toggle,
          .docs-dropdown {
            display: block;
          }
        }
      `}</style>
    </Container>
  );
}
