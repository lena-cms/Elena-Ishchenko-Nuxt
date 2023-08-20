import React from 'react'
import Head from 'next/head'

import HeaderContainer from '../components/header-container'
import CvGrid from '../components/cv-grid'
import FooterContainer from '../components/footer-container'

const CV = (props) => {
  return (
    <>
      <div className="cv-container">
        <Head>
          <title>CV - lena-cms</title>
          <meta property="og:title" content="CV - lena-cms" />
        </Head>
        <HeaderContainer rootClassName="header-container-root-class-name"></HeaderContainer>
        <div className="cv-container1">
          <CvGrid cv_title="Ongoing" rootClassName="cv-grid-root-class-name7">
            <span className="cv-text">
              <span>
                Archive of repressions against cultural workers in Russia
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span className="cv-text002">Research with FFIA grant</span>
            </span>
          </CvGrid>
          <CvGrid
            text2="Empires Will Die Telegram Channel"
            rootClassName="cv-grid-root-class-name26"
          >
            <p className="cv-text003">
              <span>
                Empires Will Die
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span className="cv-text005">Telegram Channel</span>
            </p>
          </CvGrid>
          <CvGrid
            text2="KICA — Krasnodar Institute of Contemporary Art Lecturer &amp; Co-organiser"
            rootClassName="cv-grid-root-class-name2"
          >
            <p className="cv-text006">
              <span>KICA — Krasnodar Institute of Contemporary Art  </span>
              <span className="cv-text008">Lecturer &amp; Co-organiser</span>
            </p>
          </CvGrid>
          <CvGrid cv_title="Recent" rootClassName="cv-grid-root-class-name3">
            <span className="cv-text009">
              <a
                href="https://gak-bremen.de/en/events/23v_elena-ishchenko_en/"
                target="_blank"
                rel="noreferrer noopener"
                className="cv-link"
              >
                Counter/Monuments: (Russian) Colonial Violence
              </a>
              <span> </span>
              <span className="cv-text011">Lecture in GAK Bremen, Germany</span>
              <span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
            </span>
          </CvGrid>
          <CvGrid rootClassName="cv-grid-root-class-name5">
            <span className="cv-text013">
              <a
                href="https://archiv.ngbk.de/projekte/m-ome-baschkirisch-fur-kollektive-selbsthilfepraktiken/"
                target="_blank"
                rel="noreferrer noopener"
                className="cv-link01"
              >
                Ome exhibition and public program
              </a>
              <span> / Curator  </span>
              <span className="cv-text015">
                nGbK at Kunstraum Kreuzberg/Bethanien, Berlin, Germany
              </span>
            </span>
          </CvGrid>
          <CvGrid
            cv_title="Education"
            cv_years="2014"
            rootClassName="cv-grid-root-class-name6"
          >
            <span className="cv-text016">
              Moscow State University, MA Journalism
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
          </CvGrid>
          <CvGrid
            cv_title="Residencies"
            cv_years="2019"
            rootClassName="cv-grid-root-class-name8"
          >
            <span className="cv-text017">
              Residency Unlimited New York, USA
            </span>
          </CvGrid>
          <CvGrid
            cv_title="Positions"
            cv_years="2017–2022"
            rootClassName="cv-grid-root-class-name28"
          >
            <span className="cv-text018">
              <span>
                Program Curator at Typography Center for Contemporary Art
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span className="cv-text020">Krasnodar, Russia</span>
            </span>
          </CvGrid>
          <CvGrid
            cv_years="2019–2022"
            rootClassName="cv-grid-root-class-name25"
          >
            <span className="cv-text021">
              <span>
                Lecturer at Krasnodar State Institute of Culture
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span className="cv-text023">Krasnodar, Russia</span>
            </span>
          </CvGrid>
          <CvGrid cv_years="2015–2017" rootClassName="cv-grid-root-class-name9">
            <span className="cv-text024">
              <span>
                Research fellow at Garage Museum of Contemporary Art
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span className="cv-text026">Moscow, Russia</span>
              <br></br>
            </span>
          </CvGrid>
          <CvGrid
            cv_years="2012–2019"
            rootClassName="cv-grid-root-class-name10"
          >
            <span className="cv-text028">
              <span>
                Editor and Contributor at
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <a
                href="http://aroundart.org/"
                target="_blank"
                rel="noreferrer noopener"
                className="cv-link02"
              >
                aroundart.org
              </a>
            </span>
          </CvGrid>
          <CvGrid
            cv_title="Selected exhibitions and other projects"
            cv_years="2022"
            rootClassName="cv-grid-root-class-name11"
          >
            <span className="cv-text030">
              <span>Emergency Stipend Fund by Goethe Institut / Curator</span>
              <br></br>
              <span className="cv-text033">
                Discourse Lab at Urvakan Festival
              </span>
              <span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span>
                / Tutor
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span className="cv-text036">Yerevan, Armenia</span>
              <br></br>
            </span>
          </CvGrid>
          <CvGrid cv_years="2021" rootClassName="cv-grid-root-class-name12">
            <span className="cv-text038">
              <a
                href="http://typography-online.ru/2021/02/17/unaimed-session-with-league-of-tenders-eng/"
                target="_blank"
                rel="noreferrer noopener"
                className="cv-link03"
              >
                Unaimed Sessions by League of Tenders
              </a>
              <span> / Curator</span>
              <br></br>
              <a
                href="https://www.e-flux.com/announcements/431352/artslink-assembly-2021-future-fellows/"
                target="_blank"
                rel="noreferrer noopener"
                className="cv-link04"
              >
                ArtsLink Assembly
              </a>
              <span>
                {' '}
                / Fellow — Research project by CEC Artslink
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span className="cv-text042">New York, USA</span>
              <br></br>
              <a
                href="http://typography-online.ru/2021/03/31/fantasia-training-eng/"
                target="_blank"
                rel="noreferrer noopener"
                className="cv-link05"
              >
                Training Fantasia Festival &amp; Exhibition
              </a>
              <span>
                {' '}
                / Curator
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span className="cv-text045">
                Typography CCA, Krasnodar, Russia
              </span>
              <br></br>
            </span>
          </CvGrid>
          <CvGrid cv_years="2020" rootClassName="cv-grid-root-class-name13">
            <span className="cv-text047">
              <a
                href="http://typography-online.ru/2020/12/01/league_4_protocol_rus/"
                target="_blank"
                rel="noreferrer noopener"
                className="cv-link06"
              >
                League of Tenders — Annual Meeting &amp; Laboratory
              </a>
              <span> —</span>
              <span className="cv-text049">
                {' '}
                Anapa region, Krasnodar krai, Russia
              </span>
              <br></br>
              <a
                href="http://typography-online.ru/2020/06/20/elena-kolesnkova-voskhod-eng/"
                target="_blank"
                rel="noreferrer noopener"
                className="cv-link07"
              >
                Elena Kolesnikova. Voskhod Cooperative
              </a>
              <span>
                {' '}
                / Curator 
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span className="cv-text052">Typography CCA, </span>
              <span className="cv-text053">Krasnodar</span>
              <span className="cv-text054">, Russia</span>
              <br></br>
              <a
                href="http://typography-online.ru/2020/01/04/ilona_marti_beyond_vision"
                target="_blank"
                rel="noreferrer noopener"
                className="cv-link08"
              >
                Ilona Marti (Germany). Beyond Vision
              </a>
              <span>
                {' '}
                / Curator 
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span className="cv-text057">
                Typography CCA, Krasnodar, Russia
              </span>
              <br></br>
            </span>
          </CvGrid>
          <CvGrid cv_years="2019" rootClassName="cv-grid-root-class-name4">
            <span className="cv-text059">
              <a
                href="http://typography-online.ru/2019/08/14/curatorial-courses-eng/"
                target="_blank"
                rel="noreferrer noopener"
                className="cv-link09"
              >
                Curatorial Courses — School for Researchers and Organizers
              </a>
              <span> / Curator</span>
              <span className="cv-text061">
                {' '}
                Typography CCA, Krasnodar, Russia
              </span>
              <br></br>
              <a
                href="http://typography-online.ru/2019/06/20/league_of_tenders_protocol2/"
                target="_blank"
                rel="noreferrer noopener"
                className="cv-link10"
              >
                League of Tenders — Annual Meeting &amp; Laboratory
              </a>
              <span> </span>
              <span className="cv-text064">
                Various venues, Krasnodar, Russia
              </span>
              <br></br>
              <span>
                Elena Kolesnikova. Odnushka / Curator
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span className="cv-text067">Novo-Molokovo, Moscow</span>
              <br></br>
            </span>
          </CvGrid>
          <CvGrid cv_years="2018" rootClassName="cv-grid-root-class-name14">
            <span className="cv-text069">
              <a
                href="http://typography-online.ru/2018/10/29/zhmievsky_realism/"
                target="_blank"
                rel="noreferrer noopener"
                className="cv-link11"
              >
                Artur Zmijewski. Realism
              </a>
              <span> / Curator </span>
              <span className="cv-text071">
                Typography CCA, Krasnodar, Russia
              </span>
              <br></br>
              <a
                href="http://typography-online.ru/2018/09/03/supercover-festexhibition/"
                target="_blank"
                rel="noreferrer noopener"
                className="cv-link12"
              >
                SUPERCOVER
              </a>
              <span>
                {' '}
                / Curator
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span className="cv-text074">
                Typography CCA, Krasnodar, Russia
              </span>
              <br></br>
              <a
                href="http://workhardplay.pw/en/2018/#sarycheva-ischenko-blue321-secret-car"
                target="_blank"
                rel="noreferrer noopener"
                className="cv-link13"
              >
                Secret Car
              </a>
              <span>
                {' '}
                / Performance, together with Maria Sarycheva and Blue123 
              </span>
              <span className="cv-text077">
                {' '}
                Work Hard! Play Hard! — Minsk, Belarus
              </span>
              <br></br>
              <a
                href="http://typography-online.ru/2018/05/11/%d1%80%d0%b0%d0%b1%d0%be%d1%87%d0%b0%d1%8f-%d0%b3%d1%80%d1%83%d0%bf%d0%bf%d0%b0-%d0%be%d1%82%d0%b4%d0%b5%d0%bb-%d0%b8%d0%b4%d0%b5%d0%bd%d1%82%d0%b8%d1%87%d0%bd%d0%be%d1%81%d1%82%d0%b8/"
                target="_blank"
                rel="noreferrer noopener"
                className="cv-link14"
              >
                Working Group — Identity Department
              </a>
              <span>
                {' '}
                / Curator
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span className="cv-text080">
                Typography CCA, Krasnodar, Russia
              </span>
              <br></br>
              <a
                href="http://zipgroup.space/portfolio/crystal-tiger/"
                target="_blank"
                rel="noreferrer noopener"
                className="cv-link15"
              >
                ZIP Group. Crystal Tiger
              </a>
              <span>
                {' '}
                / Curator 
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span className="cv-text083">
                Zarya Center for Contemporary Art, Vladivostok, Russia
              </span>
              <br></br>
            </span>
          </CvGrid>
          <CvGrid cv_years="2017" rootClassName="cv-grid-root-class-name15">
            <span className="cv-text085">
              <a
                href="http://aroundart.org/2017/11/17/between_fatigue_photo/"
                target="_blank"
                rel="noreferrer noopener"
                className="cv-link16"
              >
                Between Fatigue: Towards the New Forms of Life
              </a>
              <span>
                {' '}
                / Curator
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span className="cv-text087">
                Parallel program of 4th Ural Industrial Biennial of Contemporary
                Art Ekaterinburg, Russia
              </span>
              <br></br>
            </span>
          </CvGrid>
          <CvGrid
            cv_title="Selected lectures, courses, workshops and expertise"
            cv_years="2023"
            rootClassName="cv-grid-root-class-name16"
          >
            <span className="cv-text089">
              <span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <a
                href="https://gak-bremen.de/en/events/23v_elena-ishchenko_en/"
                target="_blank"
                rel="noreferrer noopener"
                className="cv-link17"
              >
                Counter/Monuments: (Russian) Colonial Violence,
              </a>
              <span>
                 lecture 
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span className="cv-text092">GAK Bremen, Germany</span>
              <br></br>
            </span>
          </CvGrid>
          <CvGrid
            cv_years="2022, 2023"
            rootClassName="cv-grid-root-class-name24"
          >
            <span className="cv-text094">
              <span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <a
                href="https://bangbangeducation.ru/course/curating "
                target="_blank"
                rel="noreferrer noopener"
                className="cv-link18"
              >
                Decolonial approach in curating
              </a>
              <span> — course for Practice of Curating, BBE Education </span>
              <br></br>
            </span>
          </CvGrid>
          <CvGrid cv_years="2022" rootClassName="cv-grid-root-class-name21">
            <span className="cv-text098">
              <span>
                {' '}
                Decolonistion of Russian Federation for Russian speaking NGO
                workers and volunteers in Germany, organised by BVRE e.V.
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span className="cv-text100">Eitorf, Germany</span>
              <br></br>
            </span>
          </CvGrid>
          <CvGrid cv_years="2022" rootClassName="cv-grid-root-class-name">
            <span className="cv-text102">
              <span>
                Approaching sustainable curating — course for Basics of curating
                program, Moscow School of Contemporary Art 
              </span>
              <br></br>
            </span>
          </CvGrid>
          <CvGrid cv_years="2021" rootClassName="cv-grid-root-class-name1">
            <span className="cv-text105">
              <span>
                Institutional critic today — course for Sound Art department at
                Higher School of Economics
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span className="cv-text107">Moscow, Russia</span>
              <br></br>
            </span>
          </CvGrid>
          <CvGrid
            cv_years="2021, 2017"
            rootClassName="cv-grid-root-class-name17"
          >
            <span className="cv-text109">
              <span>
                Member of Advisory Board of
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <a
                href="http://ensembles.org/ensembles/vac"
                target="_blank"
                rel="noreferrer noopener"
                className="cv-link19"
              >
                Present Continuous
              </a>
              <span>
                {' '}
                program, V-A-C Foundation (Moscow) and M HKA — Museum of
                Contemporary Art in Antwerp (Belgium) 
              </span>
              <br></br>
            </span>
          </CvGrid>
          <CvGrid cv_years="2021" rootClassName="cv-grid-root-class-name18">
            <span className="cv-text113">
              <a
                href="https://www.cet-ka.net/"
                target="_blank"
                rel="noreferrer noopener"
                className="cv-link20"
              >
                CETKA
              </a>
              <span>
                {' '}
                Project Meeting 
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span className="cv-text115">Yerevan, Armenia</span>
              <span>
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <br></br>
            </span>
          </CvGrid>
          <CvGrid cv_years="2020" rootClassName="cv-grid-root-class-name19">
            <span className="cv-text118">
              <a
                href="https://cc19.org/proekty/persisting-presence-unsustainable-development/"
                target="_blank"
                rel="noreferrer noopener"
                className="cv-link21"
              >
                Sustainable presence. (Un)sustainable development.
              </a>
              <span>
                {' '}
                Сonference at 48-hours Novosibirsk festival
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span className="cv-text120">CK19, Novosibirsk, Russia</span>
              <br className="cv-text121"></br>
              <a
                href="https://www.artoknofest.ru/events/212/"
                target="_blank"
                rel="noreferrer noopener"
                className="cv-link22"
              >
                City/Context. Contemporary Art Projects and Interaction with a
                city
              </a>
              <span>
                , workshop —
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span className="cv-text123">Zheleznogorsk, Russia</span>
              <br></br>
            </span>
          </CvGrid>
          <CvGrid cv_years="2019" rootClassName="cv-grid-root-class-name20">
            <span className="cv-text125">
              <span className="cv-text126">
                Elena Ishchenko in conversation with Amanda Parmer
              </span>
              <span>
                : the talk on self-organised communities
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span className="cv-text128">Residency Unlimited, New Yor</span>
              <span>
                k,
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span className="cv-text130">USA</span>
              <br></br>
            </span>
          </CvGrid>
          <CvGrid cv_years="2018" rootClassName="cv-grid-root-class-name22">
            <span className="cv-text132">
              <a
                href="https://prohelvetia.ru/en/event/october-18-november-25-ekaterinburg-working-archive-show/"
                target="_blank"
                rel="noreferrer noopener"
                className="cv-link23"
              >
                How to Write about Contemporary Art?
              </a>
              <span>
                {' '}
                Educator
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <span className="cv-text134">
                Urals Branch of National Center for Contemporary Art,
                Ekaterinburg, Russia
              </span>
              <br></br>
            </span>
          </CvGrid>
          <CvGrid cv_years="2018" rootClassName="cv-grid-root-class-name23">
            <span className="cv-text136">
              <span>Self-organising Communities, lecture  </span>
              <span className="cv-text138">
                Zarya Center for Contemporary Art, Vladivostok, Russia
              </span>
              <br></br>
            </span>
          </CvGrid>
          <CvGrid cv_years="2018" rootClassName="cv-grid-root-class-name27">
            <span className="cv-text140">
              <a
                href="https://www.youtube.com/watch?v=SDSlXGTKFts"
                target="_blank"
                rel="noreferrer noopener"
              >
                Art critic in Russia
              </a>
              <span>, lecture  </span>
              <span className="cv-text142">
                Voronezh Center for Contemporary Art, Voronezh, Russia
              </span>
              <br></br>
            </span>
          </CvGrid>
        </div>
        <FooterContainer rootClassName="footer-container-root-class-name"></FooterContainer>
      </div>
      <style jsx>
        {`
          .cv-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
            justify-content: flex-start;
          }
          .cv-container1 {
            width: 100%;
            height: auto;
            display: flex;
            padding: var(--dl-space-space-tripleunit);
            max-width: var(--dl-size-size-maxcontent);
            align-self: center;
            align-items: flex-start;
            flex-direction: column;
            justify-content: flex-start;
          }
          .cv-text {
            width: 100%;
          }
          .cv-text003 {
            width: 100%;
            text-align: left;
          }
          .cv-text005 {
            font-style: italic;
          }
          .cv-text006 {
            width: 100%;
            text-align: left;
          }
          .cv-text008 {
            font-style: italic;
          }
          .cv-text009 {
            width: 100%;
          }
          .cv-link {
            text-decoration: underline;
          }
          .cv-text011 {
            font-style: italic;
          }
          .cv-text013 {
            width: 100%;
          }
          .cv-link01 {
            text-decoration: underline;
          }
          .cv-text015 {
            font-style: italic;
          }
          .cv-text016 {
            width: 100%;
          }
          .cv-text017 {
            width: 100%;
          }
          .cv-text018 {
            width: 100%;
          }
          .cv-text020 {
            font-style: italic;
          }
          .cv-text021 {
            width: 100%;
          }
          .cv-text023 {
            font-style: italic;
          }
          .cv-text024 {
            width: 100%;
          }
          .cv-text026 {
            font-style: italic;
          }
          .cv-text028 {
            width: 100%;
          }
          .cv-link02 {
            text-decoration: underline;
          }
          .cv-text030 {
            width: 100%;
            line-height: 2;
          }
          .cv-text033 {
            text-decoration: underline;
          }
          .cv-text036 {
            font-style: italic;
          }
          .cv-text038 {
            width: 100%;
            line-height: 2;
          }
          .cv-link03 {
            text-decoration: underline;
          }
          .cv-link04 {
            text-decoration: underline;
          }
          .cv-text042 {
            font-style: italic;
          }
          .cv-link05 {
            text-decoration: underline;
          }
          .cv-text045 {
            font-style: italic;
          }
          .cv-text047 {
            width: 100%;
            line-height: 1.8;
          }
          .cv-link06 {
            text-decoration: underline;
          }
          .cv-text049 {
            font-style: italic;
          }
          .cv-link07 {
            text-decoration: underline;
          }
          .cv-text052 {
            font-style: italic;
          }
          .cv-text053 {
            font-style: italic;
            line-height: 2;
          }
          .cv-text054 {
            font-style: italic;
          }
          .cv-link08 {
            text-decoration: underline;
          }
          .cv-text057 {
            font-style: italic;
          }
          .cv-text059 {
            width: 100%;
            line-height: 1.8;
          }
          .cv-link09 {
            text-decoration: underline;
          }
          .cv-text061 {
            font-style: italic;
          }
          .cv-link10 {
            text-decoration: underline;
          }
          .cv-text064 {
            font-style: italic;
          }
          .cv-text067 {
            font-style: italic;
          }
          .cv-text069 {
            width: 100%;
            line-height: 1.8;
          }
          .cv-link11 {
            text-decoration: underline;
          }
          .cv-text071 {
            font-style: italic;
          }
          .cv-link12 {
            text-decoration: underline;
          }
          .cv-text074 {
            font-style: italic;
          }
          .cv-link13 {
            text-decoration: underline;
          }
          .cv-text077 {
            font-style: italic;
          }
          .cv-link14 {
            text-decoration: underline;
          }
          .cv-text080 {
            font-style: italic;
          }
          .cv-link15 {
            text-decoration: underline;
          }
          .cv-text083 {
            font-style: italic;
          }
          .cv-text085 {
            width: 100%;
            line-height: 1.8;
          }
          .cv-link16 {
            text-decoration: underline;
          }
          .cv-text087 {
            font-style: italic;
          }
          .cv-text089 {
            width: 100%;
            line-height: 1.8;
          }
          .cv-link17 {
            text-decoration: underline;
          }
          .cv-text092 {
            font-style: italic;
          }
          .cv-text094 {
            width: 100%;
            line-height: 1.8;
          }
          .cv-link18 {
            text-decoration: underline;
          }
          .cv-text098 {
            width: 100%;
            line-height: 1.8;
          }
          .cv-text100 {
            font-style: italic;
          }
          .cv-text102 {
            width: 100%;
            line-height: 1.8;
          }
          .cv-text105 {
            width: 100%;
            line-height: 1.8;
          }
          .cv-text107 {
            font-style: italic;
          }
          .cv-text109 {
            width: 100%;
            line-height: 1.8;
          }
          .cv-link19 {
            text-decoration: underline;
          }
          .cv-text113 {
            width: 100%;
            line-height: 1.8;
          }
          .cv-link20 {
            text-decoration: underline;
          }
          .cv-text115 {
            font-style: italic;
          }
          .cv-text118 {
            width: 100%;
            line-height: 1.8;
          }
          .cv-link21 {
            text-decoration: underline;
          }
          .cv-text120 {
            font-style: italic;
          }
          .cv-text121 {
            font-style: italic;
          }
          .cv-link22 {
            text-decoration: underline;
          }
          .cv-text123 {
            font-style: italic;
          }
          .cv-text125 {
            width: 100%;
            line-height: 1.8;
          }
          .cv-text126 {
            text-decoration: underline;
          }
          .cv-text128 {
            font-style: italic;
          }
          .cv-text130 {
            font-style: italic;
          }
          .cv-text132 {
            width: 100%;
            line-height: 1.8;
          }
          .cv-link23 {
            text-decoration: underline;
          }
          .cv-text134 {
            font-style: italic;
          }
          .cv-text136 {
            width: 100%;
            line-height: 1.8;
          }
          .cv-text138 {
            font-style: italic;
          }
          .cv-text140 {
            width: 100%;
            line-height: 1.8;
          }
          .cv-text142 {
            font-style: italic;
          }
          @media (max-width: 1200px) {
            .cv-text002 {
              font-style: italic;
            }
          }
        `}
      </style>
    </>
  )
}

export default CV
