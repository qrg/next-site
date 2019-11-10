import cn from 'classnames';

export default function Sidebar({ active, children, fixed }) {
  return (
    <aside className={cn('sidebar', { active, fixed })}>
      {children}
      <style jsx>{`
        .sidebar {
          background: #fff;
          padding-bottom: 40px;
          padding-right: 24px;
          width: 300px;
          -webkit-overflow-scrolling: touch;
          flex-shrink: 0;
        }
        .sidebar.fixed {
          bottom: 0;
          padding-top: 40px;
          position: fixed;
          top: 80px;
          z-index: 1;
          overflow-y: scroll;
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
