<template>
  <div class="cv-grid-container" v-bind:class="rootClassName">
    <div class="cv-grid-container1">
      <p class="cv-grid-text">{{ cv_title }}</p>
      <p class="cv-grid-text1">{{ cv_years }}</p>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CvGrid',
  props: {
    cv_title: String,
    rootClassName: String,
    cv_years: String,
  },
}
</script>

<style scoped>
.cv-grid-container {
  width: 100%;
  height: auto;
  display: flex;
  padding: var(--dl-space-space-halfunit);
  position: relative;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
}
.cv-grid-container1 {
  gap: var(--dl-space-space-tripleunit);
  flex: 0 0 auto;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.cv-grid-text {
  width: 220px;
  align-self: flex-start;
  font-style: normal;
  min-height: 1rem;
  flex-shrink: 0;
  font-weight: 700;
}
.cv-grid-text1 {
  width: 150px;
  align-self: flex-start;
  min-height: 1rem;
  text-align: right;
  flex-shrink: 0;
}






.cv-grid-root-class-name6 {
  margin-top: var(--dl-space-space-fourunits);
}






















</style>
