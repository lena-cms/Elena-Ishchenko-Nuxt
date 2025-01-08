<template>
  <div class="contact-container1">
    <header-container
      rootClassName="header-containerroot-class-name2"
    ></header-container>
    <div class="contact-container2">
      <span class="contact-text1">Contact me:</span>
      <span class="contact-text2">
        <a href="mailto:spot.helena@gmail.com?subject=" class="contact-link1">
          spot.helena@gmail.com
        </a>
        <span> </span>
        <br />
        <br />
        <span class="contact-text6">Follow me:</span>
        <br />
        <a
          href="https://instagram.com/beyond_n_between?igshid=OGQ5ZDc2ODk2ZA=="
          target="_blank"
          rel="noreferrer noopener"
          class="contact-link2"
        >
          Instagram
        </a>
        <br />
        <a
          href="https://t.me/empireswilldie"
          target="_blank"
          rel="noreferrer noopener"
          class="contact-link3"
        >
          Telegram
        </a>
        <br />
      </span>
    </div>
    <footer-container
      rootClassName="footer-containerroot-class-name2"
    ></footer-container>
  </div>
</template>

<script>
import HeaderContainer from '../components/header-container'
import FooterContainer from '../components/footer-container'

export default {
  name: 'Contact',
  props: {},
  components: {
    HeaderContainer,
    FooterContainer,
  },
  head: {
    title: 'Contact - Elena Ishchenko',
    meta: [
      {
        property: 'og:title',
        content: 'Contact - Elena Ishchenko',
      },
    ],
  },
}
</script>

<style scoped>
.contact-container1 {
  width: 100%;
  display: flex;
  overflow: auto;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
}
 
.contact-container2 {
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
 
.contact-text1 {
  font-weight: bold;
}
 
.contact-text2 {
  width: 100%;
  height: auto;
}
 
.contact-link1 {
  text-decoration: underline;
}
 
.contact-text6 {
  font-weight: 700;
}
 
.contact-link2 {
  text-decoration: underline;
}
 
.contact-link3 {
  text-decoration: underline;
}
</style>
