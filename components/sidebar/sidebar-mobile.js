import Container from '../container';
import ArrowRightSidebar from '../icons/arrow-right-sidebar';

export default function SidebarMobile() {
  return (
    <label htmlFor="dropdown-input" className="dropdown-toggle">
      <input id="dropdown-input" type="checkbox" />
      <div className="docs-select">
        <Container>
          <ArrowRightSidebar fill="#999" />
          Menu
        </Container>
      </div>
      <div className="documentation__sidebar docs-dropdown" />

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
        #dropdown-input:checked ~ .docs-dropdown {
          bottom: -50vh;
        }
        .docs-select :global(svg) {
          margin-right: 14px;
          transition: transform 0.15s ease;
        }
        #dropdown-input:checked ~ .docs-select :global(svg) {
          transform: rotate(90deg);
        }
        .documentation__sidebar nav {
          padding-left: 28px;
        }
        @media screen and (min-width: 950px) {
          .dropdown-toggle {
            display: none;
          }
        }
      `}</style>
    </label>
  );
}
