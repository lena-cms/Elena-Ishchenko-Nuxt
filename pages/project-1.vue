<template>
  <div class="project1-container1">
    <header-container
      rootClassName="header-containerroot-class-name1"
    ></header-container>
    <div class="project1-hero1">
      <h1 class="project1-text10">Ome</h1>
      <span class="project1-text11">
        <span>Exhibition and Public Program</span>
        <br />
      </span>
      <span class="project1-text14">
        <span>Kunstraum Kreuzberg / Bethanien, Berlin, Germany</span>
        <br />
      </span>
      <span class="project1-text17">
        <span>2023</span>
        <br />
      </span>
      <img
        alt="image"
        src="https://images.unsplash.com/photo-1471086569966-db3eebc25a59?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDIwfHxtaW5pbWFsaXNtJTIwcGxhbnR8ZW58MHx8fHwxNjI2MTgyODMw&amp;ixlib=rb-1.2.1&amp;w=1200"
        class="project1-image1"
      />
      <span class="project1-text20">
        <span>
          People from more than 185 ethnic groups live in russia.** Despite this
          fact, the country is still largely perceived as white, especially in the
          West. Even though ethnic minorities were and are oppressed and have been
          the targets of ethnic cleansing and even genocide, colonialism is often
          perceived as a Western import, not just by the regime, but also by large
          parts of the russian opposition. Rather than dealing with the country’s
          colonial history, a narrative of russia as an anti-colonial and
          anti-imperialist power is being upheld and has even gained momentum
          since russia’s invasion of Ukraine.
        </span>
        <br />
        <br />
        <span>
          The exhibition Өмә ([ome]; Bashqort for “collective self-help
          practices”) demonstrates that the current war and the annexation of
          Crimea in 2014 are just the latest events in a historical continuity of
          russian imperialism. While Ukrainian positions have often – and
          rightfully – been foregrounded in the past year, Өмә seeks to make room
          for anticolonial resistance within russia.
        </span>
        <br />
        <br />
        <span>
          To this end, the exhibition shows approximately thirty artistic
          positions from members of indigenous communities and persons with
          migrant identities and experience of living in russia. They reveal
          russia as a colonial power that could only constitute itself within its
          current borders by deportation, forced assimilation, Christianization,
          russification and extractivism.
        </span>
        <br />
        <br />
        <span>
          Since the image of a white russia is being upheld not only by the regime
          but by the predominantly white opposition as well, the decolonial
          movements that emerged after the dissolution of the USSR never gained
          traction. By telling theirstories and developing methods of
          autoethnography and working with memory through archives, Өмә therefore
          seeks to represent the complexity of russia as a colonial realm. In
          doing so, the exhibition situates itself within the historical and
          political context of an ongoing russian colonial expansion and violence
          in different territories.
        </span>
      </span>
      <div class="project1-hero2">
        <div class="project1-container2">
          <h1 class="project1-text31">Ome</h1>
          <span class="project1-text32">Exhibition and Public Program</span>
          <span class="project1-text33">
            Kunstraum Kreuzberg/Bethanien, Berlin, Germany
          </span>
          <span class="project1-text34">2023</span>
          <span class="project1-text35">
            <span>
              People from more than 185 ethnic groups live in russia.** Despite
              this fact, the country is still largely perceived as white,
              especially in the West. Even though ethnic minorities were and are
              oppressed and have been the targets of ethnic cleansing and even
              genocide, colonialism is often perceived as a Western import, not
              just by the regime, but also by large parts of the russian
              opposition. Rather than dealing with the country’s colonial history,
              a narrative of russia as an anti-colonial and anti-imperialist power
              is being upheld and has even gained momentum since russia’s invasion
              of Ukraine.
            </span>
            <br />
            <br />
            <span>
              The exhibition Өмә ([ome]; Bashqort for “collective self-help
              practices”) demonstrates that the current war and the annexation of
              Crimea in 2014 are just the latest events in a historical continuity
              of russian imperialism. While Ukrainian positions have often – and
              rightfully – been foregrounded in the past year, Өмә seeks to make
              room for anticolonial resistance within russia.
            </span>
            <br />
            <br />
            <span>
              To this end, the exhibition shows approximately thirty artistic
              positions from members of indigenous communities and persons with
              migrant identities and experience of living in russia. They reveal
              russia as a colonial power that could only constitute itself within
              its current borders by deportation, forced assimilation,
              Christianization, russification and extractivism.
            </span>
            <br />
            <br />
            <span>
              Since the image of a white russia is being upheld not only by the
              regime but by the predominantly white opposition as well, the
              decolonial movements that emerged after the dissolution of the USSR
              never gained traction. By telling theirstories and developing
              methods of autoethnography and working with memory through archives,
              Өмә therefore seeks to represent the complexity of russia as a
              colonial realm. In doing so, the exhibition situates itself within
              the historical and political context of an ongoing russian colonial
              expansion and violence in different territories.
            </span>
          </span>
        </div>
        <img
          alt="image"
          src="https://images.unsplash.com/photo-1525498128493-380d1990a112?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDI0fHxtaW5pbWFsaXNtJTIwZ3JlZW58ZW58MHx8fHwxNjI1ODQxMDcw&amp;ixlib=rb-1.2.1&amp;h=1200"
          class="project1-image2"
        />
      </div>
    </div>
    <footer-container
      rootClassName="footer-containerroot-class-name1"
    ></footer-container>
  </div>
</template>

<script>
import HeaderContainer from '../components/header-container'
import FooterContainer from '../components/footer-container'

export default {
  name: 'Project1',
  props: {},
  components: {
    HeaderContainer,
    FooterContainer,
  },
  head: {
    title: 'Project-1 - Elena Ishchenko',
    meta: [
      {
        property: 'og:title',
        content: 'Project-1 - Elena Ishchenko',
      },
    ],
  },
}
</script>

<style scoped>
.project1-container1 {
  width: 100%;
  display: flex;
  overflow: auto;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
}
 
.project1-hero1 {
  width: 100%;
  display: flex;
  padding: 48px;
  align-self: flex-start;
  min-height: 80vh;
  align-items: center;
  padding-top: 48px;
  padding-right: 53px;
  flex-direction: column;
  justify-content: center;
}
 
.project1-text10 {
  align-self: flex-start;
}
 
.project1-text11 {
  align-self: flex-start;
}
 
.project1-text14 {
  align-self: flex-start;
  font-style: italic;
}
 
.project1-text17 {
  align-self: flex-start;
  font-weight: bold;
}
 
.project1-image1 {
  width: 45rem;
  align-self: flex-start;
  margin-top: 32px;
  margin-bottom: var(--dl-space-space-fourunits);
}
 
.project1-text20 {
  align-self: flex-start;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  padding-right: 150px;
}
 
.project1-hero2 {
  width: 100%;
  display: flex;
  padding: 48px;
  max-width: 1400px;
  min-height: 80vh;
  align-items: center;
  border-color: var(--dl-color-gray-black);
  border-width: 0px;
  flex-direction: row;
  justify-content: space-between;
}
 
.project1-container2 {
  width: 50%;
  display: flex;
  align-self: flex-start;
  border-color: var(--dl-color-gray-black);
  border-width: 0px;
  margin-right: 0px;
  padding-right: var(--dl-space-space-halfunit);
  flex-direction: column;
}
 
.project1-text31 {
  font-size: 3rem;
  max-width: 450px;
}
 
.project1-text32 {
  font-style: italic;
  margin-top: 0px;
  margin-bottom: 0px;
}
 
.project1-text33 {
  margin-top: 0px;
  margin-bottom: 0px;
}
 
.project1-text34 {
  margin-top: var(--dl-space-space-unit);
  font-weight: bold;
  margin-bottom: var(--dl-space-space-unit);
}
 
.project1-text35 {
  align-self: flex-start;
  margin-top: 0px;
  margin-bottom: 0px;
}
 
.project1-image2 {
  width: 400px;
  align-self: flex-start;
  object-fit: cover;
}
 
@media(max-width: 991px) {
  .project1-hero1 {
    flex-direction: column;
  }
  .project1-image1 {
    width: 80%;
  }
  .project1-text20 {
    text-align: left;
    padding-left: 0px;
    padding-right: 0px;
  }
  .project1-hero2 {
    flex-direction: column;
  }
  .project1-container2 {
    align-items: center;
    margin-right: 0px;
    margin-bottom: 32px;
    padding-right: 0px;
  }
  .project1-text31 {
    text-align: center;
  }
  .project1-text32 {
    text-align: center;
    padding-left: 48px;
    padding-right: 48px;
  }
  .project1-text33 {
    text-align: center;
    padding-left: 48px;
    padding-right: 48px;
  }
  .project1-text34 {
    text-align: center;
    padding-left: 48px;
    padding-right: 48px;
  }
  .project1-text35 {
    text-align: center;
    padding-left: 48px;
    padding-right: 48px;
  }
}
 
@media(max-width: 767px) {
  .project1-hero1 {
    padding-left: 32px;
    padding-right: 32px;
  }
  .project1-text20 {
    text-align: left;
    border-color: var(--dl-color-gray-black);
    border-width: 0px;
    padding-left: var(--dl-space-space-unit);
    border-radius: var(--dl-radius-radius-radius4);
    padding-right: var(--dl-space-space-unit);
  }
  .project1-hero2 {
    padding-left: 32px;
    padding-right: 32px;
  }
  .project1-text32 {
    padding-left: var(--dl-space-space-unit);
    padding-right: var(--dl-space-space-unit);
  }
  .project1-text33 {
    padding-left: var(--dl-space-space-unit);
    padding-right: var(--dl-space-space-unit);
  }
  .project1-text34 {
    padding-left: var(--dl-space-space-unit);
    padding-right: var(--dl-space-space-unit);
  }
  .project1-text35 {
    padding-left: var(--dl-space-space-unit);
    padding-right: var(--dl-space-space-unit);
  }
  .project1-image2 {
    width: 80%;
  }
}
 
@media(max-width: 479px) {
  .project1-hero1 {
    padding-top: 32px;
    padding-left: var(--dl-space-space-unit);
    padding-right: var(--dl-space-space-unit);
    padding-bottom: 32px;
  }
  .project1-text20 {
    align-self: flex-start;
    text-align: left;
    border-color: var(--dl-color-gray-black);
    border-width: 0px;
    padding-left: 0px;
    border-radius: var(--dl-radius-radius-radius2);
    padding-right: 0px;
  }
  .project1-hero2 {
    padding-top: 32px;
    padding-left: var(--dl-space-space-unit);
    padding-right: var(--dl-space-space-unit);
    padding-bottom: 32px;
  }
  .project1-container2 {
    margin-bottom: var(--dl-space-space-unit);
  }
  .project1-text35 {
    border-color: var(--dl-color-gray-black);
    border-width: 0px;
    padding-left: 0px;
    border-radius: var(--dl-radius-radius-radius2);
    padding-right: 0px;
  }
}
</style>
