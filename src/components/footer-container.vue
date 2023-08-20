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
      <div class="footer-container-copyright-container">
        <svg viewBox="0 0 1024 1024" class="footer-container-icon">
          <path
            d="M512 854q140 0 241-101t101-241-101-241-241-101-241 101-101 241 101 241 241 101zM512 86q176 0 301 125t125 301-125 301-301 125-301-125-125-301 125-301 301-125zM506 390q-80 0-80 116v12q0 116 80 116 30 0 50-17t20-43h76q0 50-44 88-42 36-102 36-80 0-122-48t-42-132v-12q0-82 40-128 48-54 124-54 66 0 104 38 42 42 42 98h-76q0-14-6-26-10-20-14-24-20-20-50-20z"
          ></path>
        </svg>
        <span class="Anchor">{{ link }}</span>
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
.footer-container-copyright-container {
  display: flex;
  align-items: center;
  flex-direction: row;
}
.footer-container-icon {
  width: 24px;
  height: 24px;
  margin-right: var(--dl-space-space-doubleunit);
}



</style>
