import React from 'react'
import Head from 'next/head'

import HeaderContainer from '../components/header-container'
import FooterContainer from '../components/footer-container'

const Contact = (props) => {
  return (
    <>
      <div className="contact-container">
        <Head>
          <title>Contact - lena-cms</title>
          <meta property="og:title" content="Contact - lena-cms" />
        </Head>
        <HeaderContainer rootClassName="header-container-root-class-name2"></HeaderContainer>
        <div className="contact-container1">
          <span className="contact-text">Contact me:</span>
          <span className="contact-text1">
            <a
              href="mailto:spot.helena@gmail.com?subject="
              className="contact-link"
            >
              spot.helena@gmail.com
            </a>
            <span> </span>
            <br></br>
            <br></br>
            <span className="contact-text5">Follow me:</span>
            <br></br>
            <a
              href="https://instagram.com/beyond_n_between?igshid=OGQ5ZDc2ODk2ZA=="
              target="_blank"
              rel="noreferrer noopener"
              className="contact-link1"
            >
              Instagram
            </a>
            <br></br>
            <a
              href="https://t.me/empireswilldie"
              target="_blank"
              rel="noreferrer noopener"
              className="contact-link2"
            >
              Telegram
            </a>
            <br></br>
          </span>
        </div>
        <FooterContainer rootClassName="footer-container-root-class-name2"></FooterContainer>
      </div>
      <style jsx>
        {`
          .contact-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .contact-container1 {
            flex: 0 0 auto;
            width: 100%;
            height: auto;
            display: flex;
            padding: var(--dl-space-space-tripleunit);
            max-width: var(--dl-size-size-maxcontent);
            min-height: 70vh;
            align-items: flex-start;
            flex-direction: column;
            justify-content: flex-start;
          }
          .contact-text {
            font-weight: bold;
          }
          .contact-text1 {
            width: 100%;
            height: auto;
          }
          .contact-link {
            text-decoration: underline;
          }
          .contact-text5 {
            font-weight: 700;
          }
          .contact-link1 {
            text-decoration: underline;
          }
          .contact-link2 {
            text-decoration: underline;
          }
        `}
      </style>
    </>
  )
}

export default Contact
