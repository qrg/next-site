import classNames from 'classnames';
import { useAmp } from 'next/amp';

export default function Header(props) {
  const { shadow, zIndex, background, dotBackground, children } = props;
  const isAmp = useAmp();

  const desktopShadow = typeof shadow === 'boolean' ? shadow : (shadow && shadow.desktop) || false;
  const tabletShadow = typeof shadow === 'boolean' ? shadow : (shadow && shadow.tablet) || false;
  const mobileShadow = typeof shadow === 'boolean' ? shadow : (shadow && shadow.mobile) || false;

  return (
    <header>
      <div
        className={classNames('fixed-container active', {
          'show-logo': dotBackground
        })}
      >
        {children}
      </div>
      <style jsx>
        {`
          header {
            top: 0;
            left: 0;
            width: 100%;
            ${isAmp ? '' : 'position: -webkit-sticky;'}
            position: sticky;
            z-index: ${zIndex || 1000};
          }
          .fixed-container {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            width: 100%;
            left: 0;
            z-index: ${zIndex || 1000};
            transition: box-shadow 0.5s ease, background 0.2s ease;
            ${dotBackground
              ? `
              background-image: radial-gradient(circle, #D7D7D7, #D7D7D7 1px, #FFF 1px, #FFF);
              background-size: 28px 28px;
            `
              : 'background: rgba(255, 255, 255, 0);'};
          }
          .active {
            background: ${background || 'rgba(255, 255, 255, 0.98)'};
            box-shadow: ${desktopShadow ? '0px 6px 20px rgba(0, 0, 0, 0.06)' : 'unset'};
            pointer-events: auto;
          }
          @media screen and (max-width: 960px) {
            .active {
              box-shadow: ${tabletShadow ? '0px 6px 20px rgba(0, 0, 0, 0.06)' : 'unset'};
            }
          }
          @media screen and (max-width: 640px) {
            .active {
              box-shadow: ${mobileShadow ? '0px 6px 20px rgba(0, 0, 0, 0.06)' : 'unset'};
            }
          }
        `}
      </style>
    </header>
  );
}
