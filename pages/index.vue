<template>
  <div class="about-container1">
    <header-container></header-container>
    <div class="about-banner">
      <div class="about-container2">
        <p class="about-text10">
          <span>
            Currently, I am working as a curator for the
            <span v-html="rawhecm"></span>
          </span>
          <a
            href="https://vleeshal.nl/archive/series/repetition-is-a-form-of-changing-series"
            target="_blank"
            rel="noreferrer noopener"
            class="about-link1"
          >
            Nomadic Program 2024–2025
          </a>
          <span>
            at Vleeshal Center for Contemporary Art (Middelburg, the Netherlands),
            alongside Maria Sarycheva as part of the curatorial duo League of
            Tenders.
          </span>
          <br />
          <br />
          <span>
            Recently, I developed and curated several educational programs in
            hybrid online and offline formats. These projects are strictly
            non-public due to the safety concerns of the participants and
            organizers, some of whom are based in russia* and Belarus.
          </span>
          <span><span v-html="rawojif"></span></span>
          <br />
          <br />
          <span>
            In my practice, I am cultivating a decolonial approach to curating and
            knowledge production, while addressing power relations inherited from
            colonial policies, particularly within the russian context.
            <span v-html="rawww8m"></span>
          </span>
          <br />
          <br />
          <span>
            Developing various formats such as exhibitions, public programs,
            lectures, educational practices, workshops, and even personal blogs, I
            prefer collective and collaborative work that encourage social
            imagination and change.
            <span v-html="rawiixz"></span>
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
            <span v-html="rawe7p4"></span>
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
            are
            <span v-html="rawy7z6"></span>
          </span>
          <a
            href="https://typography-worldwide.org/en/category/translocal-dialogues-en/"
            target="_blank"
            rel="noreferrer noopener"
            class="about-link2"
          >
            Translocal Dialogues on Home, Migration, and Solidarity
          </a>
          <span>
            , which I curated and edited. The project initiated a number of
            discussions about wars, decolonial possibilities, forced migration,
            and state violence. Typography Collective also hosts an
            art-in-residence program in Yerevan, Armenia, and develops an
            education program, previously known as the Krasnodar Institute of
            Contemporary Art, in which I am involved as an organizer and lecturer.
          </span>
          <br />
          <br />
          <span>
            In 2022–2023, I was involved in curating an exhibition and a series of
            events titled
            <span v-html="rawo4il"></span>
          </span>
          <a
            href="https://archiv.ngbk.de/en/projekte/m-ome-baschkirisch-fur-kollektive-selbsthilfepraktiken/"
            target="_blank"
            rel="noreferrer noopener"
            class="about-link3"
          >
            “Өмә,”
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
          <span class="about-text39">
            *I use “russia” and “russian federation” in lowercase to condemn the
            war in Ukraine and its colonial policy in general, and to express
            solidarity with Ukrainians and decolonial movements. I use Russian in
            uppercase when it refers to the language, to underline that it equally
            belongs to everybody who speaks it.
          </span>
          <br class="about-text40" />
          <br />
          <br />
          <span><span v-html="rawoix7"></span></span>
          <span><span v-html="rawjtw5"></span></span>
        </p>
      </div>
      <span class="about-text45">
        <span class="about-text46">Cologne, Germany</span>
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
      rawhecm: ' ',
      rawojif: ' ',
      rawww8m: ' ',
      rawiixz: ' ',
      rawe7p4: ' ',
      rawy7z6: ' ',
      rawo4il: ' ',
      rawoix7: ' ',
      rawjtw5: ' ',
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
.about-container1 {
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
 

 
.about-container2 {
  flex: 0 0 auto;
  width: 751px;
  height: auto;
  display: flex;
  align-items: space-between;
  flex-direction: column;
}
 
.about-text10 {
  text-align: left;
}
 
.about-text45 {
  padding-bottom: var(--dl-space-space-fiveunits);
}
 
@media(max-width: 1200px) {
  .about-link1 {
    text-decoration: underline;
  }
  .about-link2 {
    text-decoration: underline;
  }
  .about-link3 {
    text-decoration: underline;
  }
  .about-text39 {
    font-style: italic;
  }
  .about-text40 {
    font-style: italic;
  }
  .about-text45 {
    align-self: flex-start;
  }
  .about-text46 {
    align-self: flex-start;
  }
}
 
@media(max-width: 991px) {
  .about-banner {
    flex-direction: column-reverse;
  }
}
</style>
