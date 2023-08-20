<template>
  <div class="contact-container">
    <header-container
      rootClassName="header-container-root-class-name2"
    ></header-container>
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
  metaInfo: {
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
</style>
