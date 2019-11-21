import { useRef, useEffect } from 'react';
import cn from 'classnames';
import NavLink from './nav-link';

export default function Post({ isMobile, route, level = 1, onClick, ...props }) {
  const selectedRef = useRef();
  const ref = route.selected ? selectedRef : null;

  useEffect(() => {
    if (ref && ref.current && !isMobile) {
      ref.current.scrollIntoView({ block: 'center' });
    }
  }, [ref]);

  return (
    <div ref={ref} className={cn('link', `level-${level}`)}>
      <NavLink
        route={route}
        scrollSelectedIntoView={props.scrollSelectedIntoView}
        categorySelected={props.categorySelected}
        level={level}
        onClick={onClick}
      />
      <style jsx>{`
        .link {
          margin: 18px 0;
          display: flex;
          align-items: center;
        }
        .link::before {
          content: '';
          flex-basis: 4px;
          flex-shrink: 0;
          display: block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #666666;
          margin-right: 16px;
        }
        .link:first-child {
          margin-top: 0;
        }
        .link:last-child {
          margin-bottom: 0;
        }
        @media screen and (max-width: 950px) {
          .link {
            margin: 24px 0;
          }
        }
      `}</style>
    </div>
  );
}
