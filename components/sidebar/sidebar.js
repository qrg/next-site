import cn from 'classnames';

export default function Sidebar({ active, children, fixed }) {
  return (
    <aside className={cn('sidebar', { active, fixed })}>
      {children}
      <style jsx>{`
        .sidebar {
          background: #fff;
          padding-bottom: 40px;
          padding-right: 1.5rem;
          width: 300px;
          -webkit-overflow-scrolling: touch;
          flex-shrink: 0;
        }
        .sidebar.fixed {
          position: fixed;
          bottom: 0;
          height: calc(100vh - 64px - 2rem);
          overflow-y: auto;
          z-index: 1;
        }
        @media screen and (max-width: 950px) {
          .sidebar {
            display: none;
          }
          .sidebar.active {
            display: block;
          }
        }
      `}</style>
    </aside>
  );
}
