export default function SidebarMobile() {
  return (
    <label htmlFor="dropdown-input" className="dropdown-toggle">
      <input id="dropdown-input" type="checkbox" />
      <div className="docs-select" />
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
          transition: bottom 0.5s ease;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        #dropdown-input:checked ~ .docs-dropdown {
          bottom: -50vh;
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
