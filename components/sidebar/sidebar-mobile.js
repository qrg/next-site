import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import Container from '../container';
import ArrowRightSidebar from '../icons/arrow-right-sidebar';

export default function SidebarMobile({ children }) {
  const router = useRouter();
  const [opened, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!opened);

  useEffect(() => {
    if (opened) setOpen(false);
  }, [router.asPath]);

  return (
    <>
      <label htmlFor="dropdown-input" className={cn('dropdown-toggle', { opened })}>
        <input id="dropdown-input" type="checkbox" checked={opened} onChange={toggleOpen} />
        <div className="docs-select">
          <Container>
            <ArrowRightSidebar fill="#999" />
            Menu
          </Container>
        </div>
      </label>
      <div className="docs-dropdown">
        <Container>
          <nav>{children}</nav>
        </Container>
      </div>

      <style jsx>{`
        #dropdown-input {
          display: none;
        }
        .dropdown-toggle {
          width: 100%;
          display: block;
        }
        .docs-select {
          height: 3rem;
          width: 100%;
          border-top: 1px solid #f5f5f5;
          line-height: 3rem;
          text-align: left;
          cursor: pointer;
        }
        .docs-dropdown {
          position: absolute;
          left: 0;
          right: 0;
          top: 100%;
          bottom: 100%;
          background: white;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          transition: bottom 0.3s ease;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .docs-dropdown nav {
          border-left: 1px solid #eaeaea;
          padding: 10px 19px;
        }
        .opened ~ .docs-dropdown {
          bottom: -60vh;
          border-top: 1px solid #eaeaea;
        }
        .docs-select :global(svg) {
          margin-right: 14px;
          transition: transform 0.15s ease;
        }
        .opened > .docs-select :global(svg) {
          transform: rotate(90deg);
        }
        @media screen and (min-width: 950px) {
          .dropdown-toggle {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
