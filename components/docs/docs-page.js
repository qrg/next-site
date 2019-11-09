import { memo } from 'react';

export default memo(function DocsPage({ html }) {
  return (
    <>
      {/* eslint-disable-next-line */}
      <div className="docs" dangerouslySetInnerHTML={{ __html: html }} />
      <style jsx>{`
        .docs {
          max-width: calc(100% - 300px); /* Exclude size of the navbar */
        }
      `}</style>
      <style jsx global>{`
         {
          /* Headings */
        }
        .docs h1 {
          font-size: 3rem;
          font-weight: 700;
        }
        .docs h2 {
          font-size: 2rem;
        }
        .docs h3 {
          font-size: 1.5rem;
        }
        .docs h4 {
          font-size: 1.2rem;
        }
        .docs .heading {
          margin-top: 2.5rem;
          font-weight: 600;
        }
        .docs .heading > span[id] {
          display: block;
          position: absolute;
          visibility: hidden;
          margin-top: -128px;
          padding-top: 128px;
        }
        .docs .heading > a {
          color: inherit;
        }
        .docs .heading > a:hover {
          color: inherit;
          border-bottom: 1px dotted;
        }
        .docs .heading > a:hover ~ .permalink {
          visibility: visible;
        }
        .docs .heading > .permalink {
          visibility: hidden;
          display: none;
        }

        @media (min-width: 992px) {
          .docs .heading > a {
            margin-right: 0.5rem;
          }
          .docs .heading > .permalink {
            display: inline-block;
          }
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
        .docs a:not(.relative) > code.inline {
          color: #0074de;
        }
        .docs a:hover > code.inline {
          color: #68b5fb;
        }
        .docs a.relative {
          color: inherit;
          font-size: inherit;
          border-bottom: 1px dotted;
        }
        .docs a.relative:hover {
          color: gray;
          text-decoration: none;
        }
        .docs a.relative:hover > code.inline {
          color: gray;
        }

         {
          /* details */
        }
        .docs details {
          margin: 1rem 0;
          padding: 0 0.5rem;
          background: #f9f9f9;
        }
        .docs details[open] {
          overflow: hidden;
        }
        .docs details > summary {
          cursor: pointer;
          font-weight: 500;
        }

         {
          /* Quotes */
        }
        .docs blockquote {
          margin: 1rem 0;
          padding: 1rem 1.25rem;
          background: #f7f7f7;
        }
        .docs blockquote p {
          margin: 0;
        }
        .docs blockquote pre {
          background: white;
        }

         {
          /* Misc */
        }
        .docs hr {
          border: 0;
          border-top: 1px solid #f3f3f3;
        }
      `}</style>
    </>
  );
});
