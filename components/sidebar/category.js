import { useState } from 'react';
import cn from 'classnames';
import ArrowRightSidebar from '../icons/arrow-right-sidebar';

export default function Category({ level = 1, title, selected, children }) {
  const levelClass = `level-${level}`;
  const [toggle, setToggle] = useState(selected);
  const toggleCategory = () => setToggle(!toggle);

  return (
    <div className={cn('category', levelClass, { open: toggle, selected })}>
      <a className="label" onClick={toggleCategory}>
        <ArrowRightSidebar fill="#999" />
        {title}
      </a>
      <div className="posts">{children}</div>
      <style jsx>{`
        .label {
          font-size: 1rem;
          line-height: 1.5rem;
          font-weight: 400;
          cursor: pointer;
          display: flex;
          align-items: center;
          color: #444444;
        }
        .label :global(svg) {
          margin-right: 14px;
          transition: all 0.15s ease;
        }
        .selected > .label {
          font-weight: 600;
          color: #000;
        }
        .open > .label {
          color: #000;
        }
        .open > .label :global(svg) {
          margin-left: 1px;
          margin-right: 13px;
          transform: rotate(90deg);
        }
        .level-2 .label {
          font-size: 1rem;
          line-height: 1.5rem;
          text-transform: none;
          letter-spacing: 0;
        }
        .label:hover {
          color: #000;
        }
        .category {
          margin: 18px 0;
        }
        .category:first-child {
          margin-top: 0;
        }
        .category:last-child {
          margin-bottom: 0;
        }
        .separated {
          margin-bottom: 32px;
        }
        .posts {
          border-left: 1px solid #eaeaea;
          margin-top: 0;
          height: 0;
          overflow: hidden;
          padding-left: 19px;
          margin-left: 4px;
        }
        .open > .posts {
          margin-top: 18px;
          height: auto;
        }
        @media screen and (max-width: 950px) {
          .category {
            margin: 24px 0;
          }
        }
      `}</style>
    </div>
  );
}
