<template>
  <div class="about-container">
    <header-container></header-container>
    <div class="about-banner">
      <div class="about-container1">
        <p class="about-text">
          <span>
            Currently, I’m a curator of Nomadic Program at Vleeshal Center for
            Contemporary Art (Middelburg, the Netherlands) together with Maria
            Sarycheva as part of
            <span v-html="raw7ood"></span>
          </span>
          <a
            href="http://typography-online.ru/league_of_tenders/"
            target="_blank"
            rel="noreferrer noopener"
            class="about-link"
          >
            League of Tenders
          </a>
          <span>
            curatorial duo.
            <span v-html="raw1mw4"></span>
          </span>
          <br />
          <br />
          <span>
            In my practice, I am cultivating a decolonial approach to curating and
            knowledge production, while addressing power relations inherited from
            colonial policies, particularly within the russian* context.
            <span v-html="rawpyb3"></span>
          </span>
          <br />
          <br />
          <span>
            Developing various formats such as exhibitions, public programs,
            lectures, educational practices, workshops, and even personal blogs, I
            prefer collective and collaborative work that encourage social
            imagination and change.
            <span v-html="rawhfl8"></span>
          </span>
          <br />
          <br />
          <span>
            I worked as program curator at the Typography Center for Contemporary
            Art (Krasnodar, Russia), a researcher at the Garage Museum (Moscow,
            Russia), an editor of aroundart.org, an online journal and developed a
            number of projects independently in russia, Germany, Armenia,
            Switzerland, and other countries as well.
          </span>
          <br />
          <br />
          <span>
            Among the projects, I’ve been working on recently is an archive of
            repressions against cultural workers and artists in russia. I
            initiated this archive to collect evidence of the persecution and the
            experiences of people who faced them after or before the large-scale
            invasion of Ukraine by russia. The goals of the archive are to
            preserve what is designed to be deleted and to study methods
            consciously or uncousiously used by the russian state to eliminate any
            public discussions and force people to leave the country. This archive
            is non-public.
            <span v-html="raw5rte"></span>
          </span>
          <br />
          <br />
          <span>
            I’m also a part of the Typography Collective — a group of artists and
            curators who previously organized the Typography Center for
            Contemporary Art in Krasnodar, russia. From 2017 to 2022, I worked as
            a program and exhibition curator there. After the beginning of the
            large-scale invasion of Ukraine by russia, we stopped our public
            activities and completely closed our space after being declared a
            “foreign agent” by the russian government. Now, we continue our work
            remotely in various places around the globe. Among our recent projects
            are Translocal Dialogues on Home, Migration, and Solidarity, which I
            curated and edited. The project initiated a number of discussions
            about wars, decolonial possibilities, forced migration, and state
            violence. Typography Collective also hosts an art-in-residence program
            in Yerevan, Armenia, and develops an education program, previously
            known as the Krasnodar Institute of Contemporary Art, in which I am
            involved as an organizer and lecturer.
          </span>
          <br />
          <br />
          <span>
            In 2022–2023, I was involved in curating an exhibition and a series of
            events titled “Өмә,” organized with nGbK and displayed at Kunstraum
            Kreuzberg/Bethanien in Berlin. By telling the stories of approximately
            thirty artists from indigenous communities and individuals with
            migrant identities, developing methods of autoethnography, and working
            with memory through archives, Өmә aimed to represent the complexity of
            Russia as a colonial realm.
          </span>
          <br />
          <br />
          <span class="about-text23">
            *I use “russia” and “russian federation” in lowercase to condemn the
            war in Ukraine and its policy in general, and to express solidarity
            with Ukrainians and participants of decolonial movements.
          </span>
          <br />
          <br />
          <span><span v-html="rawy5g5"></span></span>
          <span><span v-html="raw9jdi"></span></span>
        </p>
        <div class="about-container2"></div>
      </div>
      <span class="about-text28">
        <span class="about-text29">Cologne, Germany</span>
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
  props: {},
  components: {
    HeaderContainer,
    FooterContainer,
  },
  data() {
    return {
      raw7ood: ' ',
      raw1mw4: ' ',
      rawpyb3: ' ',
      rawhfl8: ' ',
      raw5rte: ' ',
      rawy5g5: ' ',
      raw9jdi: ' ',
    }
  },
  head: {
    title: 'Elena Ishchenko',
    meta: [
      {
        property: 'og:title',
        content: 'Elena Ishchenko',
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
  display: flex;
  padding: var(--dl-space-space-tripleunit);
  position: relative;
  max-width: var(--dl-size-size-maxcontent);
  justify-content: space-between;
}

.about-container1 {
  flex: 0 0 auto;
  width: 751px;
  height: auto;
  display: flex;
  align-items: space-between;
  flex-direction: column;
}
.about-text {
  text-align: left;
}
.about-container2 {
  width: 751px;
  border: 2px dashed rgba(120, 120, 120, 0.4);
  display: flex;
  align-items: center;
  margin-right: var(--dl-space-space-fiveunits);
  flex-direction: column;
  justify-content: center;
}
.about-text28 {
  padding-bottom: var(--dl-space-space-fiveunits);
}
@media(max-width: 1200px) {
  .about-link {
    text-decoration: underline;
  }
  .about-text23 {
    font-style: italic;
  }
  .about-text28 {
    align-self: flex-start;
  }
  .about-text29 {
    align-self: flex-start;
  }
}
@media(max-width: 991px) {
  .about-banner {
    flex-direction: column-reverse;
  }
  .about-container2 {
    width: 100%;
    margin-right: 0px;
  }
}
</style>
