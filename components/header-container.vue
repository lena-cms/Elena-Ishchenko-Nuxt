<template>
  <div
    data-role="Header"
    class="header-container-navbar-container"
    v-bind:class="rootClassName"
  >
    <div class="header-container-navbar">
      <div class="header-container-container">
        <nuxt-link to="/" class="header-container-heading Card-Heading">
          {{ Heading }}
        </nuxt-link>
        <span class="header-container-text">
          <span>Curator, researcher, activist</span>
          <br />
        </span>
      </div>
      <div class="header-container-links-container">
        <nuxt-link to="/" class="header-container-link Navbar-Link">
          {{ link }}
        </nuxt-link>
        <nuxt-link to="/cv" class="header-container-link1 Navbar-Link">
          {{ link1 }}
        </nuxt-link>
        <nuxt-link to="/contact" class="header-container-link2 Navbar-Link">
          {{ link3 }}
        </nuxt-link>
      </div>
      <div data-role="BurgerMenu" class="header-container-burger-menu">
        <svg viewBox="0 0 1024 1024" class="header-container-icon">
          <path
            d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"
          ></path>
        </svg>
      </div>
      <div data-role="MobileMenu" class="header-container-mobile-menu">
        <div class="header-container-container1">
          <span class="Card-Heading header-container-heading1">
            {{ Heading1 }}
          </span>
          <div data-role="CloseMobileMenu" class="header-container-close-menu">
            <svg viewBox="0 0 1024 1024" class="header-container-icon2">
              <path
                d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"
              ></path>
            </svg>
          </div>
        </div>
        <div class="header-container-links-container1">
          <span class="header-container-link3 Navbar-Link">{{ link4 }}</span>
          <span class="header-container-link4 Navbar-Link">{{ link5 }}</span>
          <span class="header-container-link5 Navbar-Link">{{ link6 }}</span>
          <span class="Navbar-Link">{{ link7 }}</span>
        </div>
        <div class="header-container-container2"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderContainer',
  props: {
    link: {
      type: String,
      default: 'About',
    },
    link5: {
      type: String,
      default: 'Experience',
    },
    link3: {
      type: String,
      default: 'Contact',
    },
    link2: {
      type: String,
      default: 'Portofolio',
    },
    Heading1: {
      type: String,
      default: 'Logo',
    },
    rootClassName: String,
    Heading: {
      type: String,
      default: 'Elena Ishchenko',
    },
    link6: {
      type: String,
      default: 'Portofolio',
    },
    link7: {
      type: String,
      default: 'Contact',
    },
    link1: {
      type: String,
      default: 'CV',
    },
    link4: {
      type: String,
      default: 'About',
    },
  },
}
</script>

<style scoped>
.header-container-navbar-container {
  top: 0;
  width: 100%;
  display: flex;
  z-index: 100;
  position: sticky;
  align-items: center;
  margin-bottom: var(--dl-space-space-unit);
  flex-direction: column;
  justify-content: center;
  background-color: var(--dl-color-gray-white);
}
.header-container-navbar {
  width: 100%;
  height: auto;
  display: flex;
  padding: var(--dl-space-space-doubleunit);
  max-width: var(--dl-size-size-maxcontent);
  align-self: center;
  align-items: flex-start;
  padding-top: var(--dl-space-space-tripleunit);
  border-color: var(--dl-color-gray-black);
  border-style: solid;
  border-width: 0px;
  padding-left: var(--dl-space-space-tripleunit);
  border-radius: var(--dl-radius-radius-radius2);
  padding-right: var(--dl-space-space-tripleunit);
  flex-direction: row;
  padding-bottom: var(--dl-space-space-tripleunit);
  justify-content: space-between;
}
.header-container-container {
  flex: 0 0 auto;
  width: auto;
  height: auto;
  display: flex;
  align-items: space-between;
  flex-direction: column;
}
.header-container-heading {
  transition: 0.3s;
  text-decoration: none;
}

.header-container-links-container {
  display: flex;
  align-self: flex-start;
  align-items: flex-start;
  flex-direction: row;
}
.header-container-link {
  margin-right: var(--dl-space-space-tripleunit);
  text-decoration: none;
}
.header-container-link1 {
  margin-right: var(--dl-space-space-tripleunit);
  text-decoration: none;
}
.header-container-link2 {
  text-decoration: none;
}
.header-container-burger-menu {
  display: none;
  align-items: flex-start;
  flex-direction: column;
}
.header-container-icon {
  width: 36px;
  height: 36px;
}
.header-container-mobile-menu {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  display: none;
  padding: var(--dl-space-space-tripleunit);
  position: absolute;
  align-items: flex-start;
  flex-direction: column;
  background-color: #fff;
}
.header-container-container1 {
  flex: 0 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: var(--dl-space-space-doubleunit);
  flex-direction: row;
  justify-content: space-between;
}
.header-container-close-menu {
  flex: 0 0 auto;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.header-container-icon2 {
  width: 24px;
  height: 24px;
}
.header-container-links-container1 {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.header-container-link3 {
  margin-bottom: var(--dl-space-space-unit);
}
.header-container-link4 {
  margin-bottom: var(--dl-space-space-unit);
}
.header-container-link5 {
  margin-bottom: var(--dl-space-space-unit);
}
.header-container-container2 {
  flex: 0 0 auto;
  width: 100%;
  border: 2px dashed rgba(120, 120, 120, 0.4);
  height: 100px;
  display: flex;
  align-items: flex-start;
}



@media(max-width: 991px) {
  .header-container-heading {
    align-self: flex-start;
    text-align: left;
  }
  .header-container-text {
    text-align: left;
  }
  .header-container-heading1 {
    text-align: center;
  }
}
@media(max-width: 767px) {
  .header-container-navbar {
    position: relative;
  }
  .header-container-links-container {
    display: none;
  }
  .header-container-burger-menu {
    display: flex;
    padding: var(--dl-space-space-halfunit);
    margin-left: var(--dl-space-space-tripleunit);
    border-radius: var(--dl-radius-radius-radius4);
    background-color: var(--dl-color-gray-black);
  }
  .header-container-icon {
    fill: var(--dl-color-gray-white);
  }
}
@media(max-width: 479px) {
  .header-container-burger-menu {
    margin-left: var(--dl-space-space-doubleunit);
  }
}
</style>
