import React from 'react'

import PropTypes from 'prop-types'

const CvGrid = (props) => {
  return (
    <>
      <div className={`cv-grid-container ${props.rootClassName} `}>
        <div className="cv-grid-container1">
          <p className="cv-grid-text">{props.cv_title}</p>
          <p className="cv-grid-text1">{props.cv_years}</p>
          {props.children}
        </div>
      </div>
      <style jsx>
        {`
          .cv-grid-container {
            width: 100%;
            height: auto;
            display: flex;
            padding: var(--dl-space-space-halfunit);
            position: relative;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
          }
          .cv-grid-container1 {
            gap: var(--dl-space-space-tripleunit);
            flex: 0 0 auto;
            width: 100%;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }
          .cv-grid-text {
            width: 220px;
            align-self: flex-start;
            font-style: normal;
            min-height: 1rem;
            flex-shrink: 0;
            font-weight: 700;
          }
          .cv-grid-text1 {
            width: 150px;
            align-self: flex-start;
            min-height: 1rem;
            text-align: right;
            flex-shrink: 0;
          }

          .cv-grid-root-class-name6 {
            margin-top: var(--dl-space-space-fourunits);
          }

          .cv-grid-root-class-name11 {
            margin-top: var(--dl-space-space-fourunits);
          }

          .cv-grid-root-class-name16 {
            margin-top: var(--dl-space-space-fourunits);
          }

          .cv-grid-root-class-name28 {
            margin-top: var(--dl-space-space-fourunits);
          }
        `}
      </style>
    </>
  )
}

CvGrid.defaultProps = {
  cv_title: '',
  rootClassName: '',
  cv_years: '',
}

CvGrid.propTypes = {
  cv_title: PropTypes.string,
  rootClassName: PropTypes.string,
  cv_years: PropTypes.string,
}

export default CvGrid
