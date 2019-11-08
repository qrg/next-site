import { memo } from 'react';

export default memo(function DocsPage({ html }) {
  return (
    <>
      {/* eslint-disable-next-line */}
      <div className="docs" dangerouslySetInnerHTML={{ __html: html }} />
      <style jsx global>{`
         {
          /* Headings */
        }
        .docs h1 {
          line-height: 1.5;
          font-size: 3rem;
          font-weight: 700;
        }

         {
          /* Inline code */
        }
        .docs code.inline {
          color: rgb(212, 0, 255);
          font-size: 0.9em;
          white-space: pre-wrap;
          transition: color 0.2s ease;
        }

         {
          /* Code */
        }
        .docs pre {
          padding: 1.25rem;
          margin: 1rem 0;
          border: 1px solid #d8d8d8;
          white-space: pre;
          overflow: auto;
          -webkit-overflow-scrolling: touch;
        }
        .docs pre > code {
          font-size: 14px;
          line-height: 20px;
        }

         {
          /* Links */
        }
        .docs a:hover > code.inline {
          color: #68b5fb;
        }
        .docs a[href^='#'] {
          color: inherit;
          font-size: inherit;
          border-bottom: 1px dotted;
        }
        .docs a[href^='#']:hover {
          color: gray;
          text-decoration: none;
        }
        .docs a[href^='#']:hover > code.inline {
          color: gray;
        }
      `}</style>
    </>
  );
});
