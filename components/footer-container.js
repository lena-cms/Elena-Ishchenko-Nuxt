import React from 'react'

import PropTypes from 'prop-types'

const FooterContainer = (props) => {
  return (
    <>
      <div
        className={`footer-container-footer-container ${props.rootClassName} `}
      >
        <div className="footer-container-section-separator"></div>
        <div className="footer-container-footer">
          <div className="footer-container-social-links">
            <a
              href={props.link_text}
              target="_blank"
              rel="noreferrer noopener"
              className="footer-container-link"
            >
              {props.text}
            </a>
            <a
              href={props.link_text1}
              target="_blank"
              rel="noreferrer noopener"
              className="footer-container-link1"
            >
              {props.text1}
            </a>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .footer-container-footer-container {
            width: 100%;
            display: flex;
            position: relative;
            margin-top: var(--dl-space-space-tenunits);
            align-items: center;
            flex-direction: column;
            justify-content: center;
            background-color: var(--dl-color-gray-white);
          }
          .footer-container-section-separator {
            width: 100%;
            height: 1px;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            background-color: var(--dl-color-gray-900);
          }
          .footer-container-footer {
            width: 100%;
            display: flex;
            max-width: var(--dl-size-size-maxcontent);
            align-items: center;
            padding-top: var(--dl-space-space-tripleunit);
            padding-left: var(--dl-space-space-tripleunit);
            padding-right: var(--dl-space-space-tripleunit);
            flex-direction: row;
            padding-bottom: var(--dl-space-space-tripleunit);
            justify-content: space-between;
          }
          .footer-container-social-links {
            display: flex;
            align-items: flex-start;
            flex-direction: row;
          }
          .footer-container-link {
            text-decoration: none;
          }
          .footer-container-link1 {
            text-decoration: none;
          }
        `}
      </style>
    </>
  )
}

FooterContainer.defaultProps = {
  link_text1: 'https://t.me/empireswilldie',
  text: 'Instagram / ',
  link_text: 'https://instagram.com/beyond_n_between?igshid=OGQ5ZDc2ODk2ZA==',
  rootClassName: '',
  link: 'Lena, 2021',
  text1: 'Telegram ',
}

FooterContainer.propTypes = {
  link_text1: PropTypes.string,
  text: PropTypes.string,
  link_text: PropTypes.string,
  rootClassName: PropTypes.string,
  link: PropTypes.string,
  text1: PropTypes.string,
}

export default FooterContainer
