import React from 'react'
import Link from 'next/link'

import PropTypes from 'prop-types'

const HeaderContainer = (props) => {
  return (
    <>
      <div
        data-role="Header"
        className={`header-container-navbar-container ${props.rootClassName} `}
      >
        <div className="header-container-navbar">
          <div className="header-container-container">
            <Link href="/">
              <a className="header-container-link Card-Heading">
                {props.Heading}
              </a>
            </Link>
            <span className="header-container-text">
              <span>Curator, researcher, activist</span>
              <br></br>
            </span>
          </div>
          <div className="header-container-links-container">
            <Link href="/">
              <a className="header-container-link02 Navbar-Link">
                {props.link}
              </a>
            </Link>
            <Link href="/cv">
              <a className="header-container-link04 Navbar-Link">
                {props.link1}
              </a>
            </Link>
            <Link href="/contact">
              <a className="header-container-link06 Navbar-Link">
                {props.link3}
              </a>
            </Link>
          </div>
          <div data-role="BurgerMenu" className="header-container-burger-menu">
            <svg viewBox="0 0 1024 1024" className="header-container-icon">
              <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
            </svg>
          </div>
          <div data-role="MobileMenu" className="header-container-mobile-menu">
            <div className="header-container-container1">
              <span className="Card-Heading header-container-heading1">
                {props.Heading1}
              </span>
              <div
                data-role="CloseMobileMenu"
                className="header-container-close-menu"
              >
                <svg viewBox="0 0 1024 1024" className="header-container-icon2">
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <div className="header-container-links-container1">
              <span className="header-container-link07 Navbar-Link">
                {props.link4}
              </span>
              <span className="header-container-link08 Navbar-Link">
                {props.link5}
              </span>
              <span className="header-container-link09 Navbar-Link">
                {props.link6}
              </span>
              <span className="Navbar-Link">{props.link7}</span>
            </div>
            <div className="header-container-container2"></div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .header-container-navbar-container {
            top: 0;
            width: 100%;
            display: flex;
            z-index: 100;
            position: sticky;
            align-items: center;
            margin-bottom: var(--dl-space-space-unit);
            flex-direction: column;
            justify-content: center;
            background-color: var(--dl-color-gray-white);
          }
          .header-container-navbar {
            width: 100%;
            height: auto;
            display: flex;
            padding: var(--dl-space-space-doubleunit);
            max-width: var(--dl-size-size-maxcontent);
            align-self: center;
            align-items: flex-start;
            padding-top: var(--dl-space-space-tripleunit);
            border-color: var(--dl-color-gray-black);
            border-style: solid;
            border-width: 0px;
            padding-left: var(--dl-space-space-tripleunit);
            border-radius: var(--dl-radius-radius-radius2);
            padding-right: var(--dl-space-space-tripleunit);
            flex-direction: row;
            padding-bottom: var(--dl-space-space-tripleunit);
            justify-content: space-between;
          }
          .header-container-container {
            flex: 0 0 auto;
            width: auto;
            height: auto;
            display: flex;
            align-items: space-between;
            flex-direction: column;
          }
          .header-container-link {
            transition: 0.3s;
            text-decoration: none;
          }

          .header-container-links-container {
            display: flex;
            align-self: flex-start;
            align-items: flex-start;
            flex-direction: row;
          }
          .header-container-link02 {
            margin-right: var(--dl-space-space-tripleunit);
            text-decoration: none;
          }
          .header-container-link04 {
            margin-right: var(--dl-space-space-tripleunit);
            text-decoration: none;
          }
          .header-container-link06 {
            text-decoration: none;
          }
          .header-container-burger-menu {
            display: none;
            align-items: flex-start;
            flex-direction: column;
          }
          .header-container-icon {
            width: 36px;
            height: 36px;
          }
          .header-container-mobile-menu {
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100vh;
            display: none;
            padding: var(--dl-space-space-tripleunit);
            position: absolute;
            align-items: flex-start;
            flex-direction: column;
            background-color: #fff;
          }
          .header-container-container1 {
            flex: 0 0 auto;
            width: 100%;
            display: flex;
            align-items: center;
            margin-bottom: var(--dl-space-space-doubleunit);
            flex-direction: row;
            justify-content: space-between;
          }
          .header-container-close-menu {
            flex: 0 0 auto;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .header-container-icon2 {
            width: 24px;
            height: 24px;
          }
          .header-container-links-container1 {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
          }
          .header-container-link07 {
            margin-bottom: var(--dl-space-space-unit);
          }
          .header-container-link08 {
            margin-bottom: var(--dl-space-space-unit);
          }
          .header-container-link09 {
            margin-bottom: var(--dl-space-space-unit);
          }
          .header-container-container2 {
            flex: 0 0 auto;
            width: 100%;
            border: 2px dashed rgba(120, 120, 120, 0.4);
            height: 100px;
            display: flex;
            align-items: flex-start;
          }

          @media (max-width: 991px) {
            .header-container-link {
              align-self: flex-start;
              text-align: left;
            }
            .header-container-text {
              text-align: left;
            }
            .header-container-heading1 {
              text-align: center;
            }
          }
          @media (max-width: 767px) {
            .header-container-navbar {
              position: relative;
            }
            .header-container-links-container {
              display: none;
            }
            .header-container-burger-menu {
              display: flex;
              padding: var(--dl-space-space-halfunit);
              margin-left: var(--dl-space-space-tripleunit);
              border-radius: var(--dl-radius-radius-radius4);
              background-color: var(--dl-color-gray-black);
            }
            .header-container-icon {
              fill: var(--dl-color-gray-white);
            }
          }
          @media (max-width: 479px) {
            .header-container-burger-menu {
              margin-left: var(--dl-space-space-doubleunit);
            }
          }
        `}
      </style>
    </>
  )
}

HeaderContainer.defaultProps = {
  link: 'About',
  link5: 'Experience',
  link3: 'Contact',
  link2: 'Portofolio',
  Heading1: 'Logo',
  rootClassName: '',
  Heading: 'Elena Ishchenko',
  link6: 'Portofolio',
  link7: 'Contact',
  link1: 'CV',
  link4: 'About',
}

HeaderContainer.propTypes = {
  link: PropTypes.string,
  link5: PropTypes.string,
  link3: PropTypes.string,
  link2: PropTypes.string,
  Heading1: PropTypes.string,
  rootClassName: PropTypes.string,
  Heading: PropTypes.string,
  link6: PropTypes.string,
  link7: PropTypes.string,
  link1: PropTypes.string,
  link4: PropTypes.string,
}

export default HeaderContainer
