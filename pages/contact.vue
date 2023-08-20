<template>
  <div class="contact-container">
    <header-container
      rootClassName="header-container-root-class-name2"
    ></header-container>
    <div class="contact-container1">
      <span class="contact-text">
        <span class="contact-text01">Contact me:</span>
        <br />
        <a href="mailto:spot.helena@gmail.com?subject=" class="contact-link">
          spot.helena@gmail.com
        </a>
        <span> </span>
        <br />
        <br />
        <span class="contact-text06">Follow me:</span>
        <br />
        <a
          href="https://instagram.com/beyond_n_between?igshid=OGQ5ZDc2ODk2ZA=="
          target="_blank"
          rel="noreferrer noopener"
          class="contact-link1"
        >
          Instagram
        </a>
        <br />
        <a
          href="https://t.me/empireswilldie"
          target="_blank"
          rel="noreferrer noopener"
          class="contact-link2"
        >
          Telegram
        </a>
        <br />
      </span>
    </div>
    <footer-container
      rootClassName="footer-container-root-class-name2"
    ></footer-container>
  </div>
</template>

<script>
import HeaderContainer from '../components/header-container'
import FooterContainer from '../components/footer-container'

export default {
  name: 'Contact',
  components: {
    HeaderContainer,
    FooterContainer,
  },
  head: {
    title: 'Contact - lena-cms',
    meta: [
      {
        property: 'og:title',
        content: 'Contact - lena-cms',
      },
    ],
  },
}
</script>

<style scoped>
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
  width: 100%;
  height: auto;
}
.contact-text01 {
  font-weight: 700;
}
.contact-link {
  text-decoration: underline;
}
.contact-text06 {
  font-weight: 700;
}
.contact-link1 {
  text-decoration: underline;
}
.contact-link2 {
  text-decoration: underline;
}
</style>
