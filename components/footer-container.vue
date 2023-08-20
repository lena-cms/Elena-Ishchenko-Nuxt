<template>
  <div class="footer-container-footer-container" v-bind:class="rootClassName">
    <div class="footer-container-section-separator"></div>
    <div class="footer-container-footer">
      <div class="footer-container-social-links">
        <a
          :href="link_text"
          target="_blank"
          rel="noreferrer noopener"
          class="footer-container-link"
        >
          {{ text }}
        </a>
        <a
          :href="link_text1"
          target="_blank"
          rel="noreferrer noopener"
          class="footer-container-link1"
        >
          {{ text1 }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterContainer',
  props: {
    link_text1: {
      type: String,
      default: 'https://t.me/empireswilldie',
    },
    text: {
      type: String,
      default: 'Instagram / ',
    },
    link_text: {
      type: String,
      default: 'https://instagram.com/beyond_n_between?igshid=OGQ5ZDc2ODk2ZA==',
    },
    rootClassName: String,
    link: {
      type: String,
      default: 'Lena, 2021',
    },
    text1: {
      type: String,
      default: 'Telegram ',
    },
  },
}
</script>

<style scoped>
.footer-container-footer-container {
  width: 100%;
  display: flex;
  position: relative;
  margin-top: var(--dl-space-space-tenunits);
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: var(--dl-color-gray-white);
}
.footer-container-section-separator {
  width: 100%;
  height: 1px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  background-color: var(--dl-color-gray-900);
}
.footer-container-footer {
  width: 100%;
  display: flex;
  max-width: var(--dl-size-size-maxcontent);
  align-items: center;
  padding-top: var(--dl-space-space-tripleunit);
  padding-left: var(--dl-space-space-tripleunit);
  padding-right: var(--dl-space-space-tripleunit);
  flex-direction: row;
  padding-bottom: var(--dl-space-space-tripleunit);
  justify-content: space-between;
}
.footer-container-social-links {
  display: flex;
  align-items: flex-start;
  flex-direction: row;
}
.footer-container-link {
  text-decoration: none;
}
.footer-container-link1 {
  text-decoration: none;
}



</style>
