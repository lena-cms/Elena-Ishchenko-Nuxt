<template>
  <div class="about-container">
    <header-container></header-container>
    <div class="about-banner">
      <div class="about-container1">
        <span class="about-text">
          <span>
            My research and curatorial practice focus on russian colonial and
            imperial politics. Through my projects, such as exhibitions,
            educational initiatives, workshops, and Telegram channels, I am
            developing a decolonial approach and perspective.
          </span>
          <br />
          <br />
          <span>
            I am also interested in various forms of independent, collective, and
            collaborative work that encourage social imagination, including
            self-organised initiatives, participatory art projects, and
            co-curating.
          </span>
          <br />
          <br />
          <span>
            Recently, I have been working on an archive of repressions against
            cultural workers and artists in russia. I am gathering evidence and
            the experiences of people who faced threats and prosecutions after or
            before the large-scale invasion of Ukraine by russia, aiming to show
            how these repressions aim to eliminate public discussions and force
            people to leave the country. This archive is non-public due to
            possible threats.
          </span>
          <br />
          <br />
          <span>
            In 2022–2023, I was involved in curating an
            <span v-html="rawbqcc"></span>
          </span>
          <a
            href="https://archiv.ngbk.de/en/projekte/m-ome-baschkirisch-fur-kollektive-selbsthilfepraktiken/"
            target="_blank"
            rel="noreferrer noopener"
            class="about-link"
          >
            exhibition and a series of events titled “Өмә,”
          </a>
          <span>
            organized with nGbK and displayed at Kunstraum Kreuzberg/Bethanien in
            Berlin. By telling the stories of approximately thirty artists from
            indigenous communities and individuals with migrant identities,
            developing methods of autoethnography, and working with memory through
            archives, Өmә aimed to represent the complexity of Russia as a
            colonial realm.
          </span>
          <br />
          <br />
          <span>
            I was also a co-curator and co-editor of
            <span v-html="raww32r"></span>
          </span>
          <a
            href="https://typography-worldwide.org/en/"
            target="_blank"
            rel="noreferrer noopener"
            class="about-link1"
          >
            Translocal Dialogues on Home, Migration, and Solidarity
          </a>
          <span>
            — a project that initiated a number of discussions about wars,
            decolonial possibilities, forced migration, and state violence.
          </span>
          <br />
          <br />
          <span>
            The project was initiated by the Typography Collective — a group of
            people who had previously organised the Typography Center for
            Contemporary Art in Krasnodar, russia. From 2017 to 2022, I worked as
            a program curator at
            <span v-html="rawurwu"></span>
          </span>
          <a
            href="http://typography-online.ru/"
            target="_blank"
            rel="noreferrer noopener"
            class="about-link2"
          >
            Typography CCA
          </a>
          <span>
            . After the beginning of the large-scale invasion of Ukraine by
            Russia, we stopped our public activities and completely closed our
            space after being declared a “foreign agent” by the russian
            government.
          </span>
          <br />
          <br />
          <span>
            Now, we continue our work remotely and in other places. Typography
            hosts an art-in-residence program in Yerevan, Armenia, and is
            developing an education program, previously known as the
            <span v-html="rawbpdz"></span>
          </span>
          <a
            href="http://typography-online.ru/kisi/"
            target="_blank"
            rel="noreferrer noopener"
            class="about-link3"
          >
            Krasnodar Institute of Contemporary Art
          </a>
          <span>. I am involved as an organiser and lecturer.</span>
          <br />
          <br />
          <span>
            I am also part of the imaginary organisation and curatorial duo League
            of Tenders, which was founded in 2018 with curator Maria Sarycheva to
            produce collectivities and foster and diffuse the affective dynamics
            within them.
          </span>
          <br />
          <br />
          <span><span v-html="rawdqfa"></span></span>
          <span><span v-html="rawovh2"></span></span>
        </span>
      </div>
      <span class="about-text31">
        <span class="about-text32">Cologne, Germany</span>
        <br />
        <a href="mailto:spot.helena@gmail.com?subject=">spot.helena@gmail.com</a>
        <br />
      </span>
    </div>
    <footer-container></footer-container>
  </div>
</template>

<script>
import HeaderContainer from '../components/header-container'
import FooterContainer from '../components/footer-container'

export default {
  name: 'About',
  components: {
    HeaderContainer,
    FooterContainer,
  },
  data() {
    return {
      rawbqcc: ' ',
      raww32r: ' ',
      rawurwu: ' ',
      rawbpdz: ' ',
      rawdqfa: ' ',
      rawovh2: ' ',
    }
  },
  metaInfo: {
    title: 'lena-cms',
    meta: [
      {
        property: 'og:title',
        content: 'lena-cms',
      },
    ],
  },
}
</script>

<style scoped>
.about-container {
  width: 100%;
  height: auto;
  display: flex;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
}
.about-banner {
  width: 100%;
  height: auto;
  display: flex;
  padding: var(--dl-space-space-tripleunit);
  position: relative;
  max-width: 1400px;
  transition: 0.3s;
  justify-content: space-between;
}

.about-container1 {
  width: 751px;
  display: flex;
  align-items: flex-start;
  margin-right: 96px;
  flex-direction: column;
  justify-content: space-between;
}
.about-text {
  margin-right: 48px;
}
@media(max-width: 1200px) {
  .about-banner {
    align-items: flex-start;
    padding-right: 24px;
  }
  .about-link {
    text-decoration: underline;
  }
  .about-link1 {
    text-decoration: underline;
  }
  .about-link2 {
    text-decoration: underline;
  }
  .about-link3 {
    text-decoration: underline;
  }
  .about-text31 {
    align-self: flex-start;
  }
  .about-text32 {
    align-self: flex-start;
  }
}
@media(max-width: 991px) {
  .about-banner {
    flex-direction: column;
  }
  .about-container1 {
    align-items: center;
    margin-right: 0px;
    margin-bottom: 48px;
  }
  .about-text {
    text-align: center;
    margin-left: 48px;
  }
}
@media(max-width: 767px) {
  .about-banner {
    padding-left: 32px;
    padding-right: 32px;
  }
  .about-text {
    margin-left: var(--dl-space-space-unit);
    margin-right: var(--dl-space-space-unit);
  }
}
@media(max-width: 479px) {
  .about-banner {
    padding-top: 32px;
    padding-left: var(--dl-space-space-unit);
    padding-right: var(--dl-space-space-unit);
    padding-bottom: 32px;
  }
}
</style>
