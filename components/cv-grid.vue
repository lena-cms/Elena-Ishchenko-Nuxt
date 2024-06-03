<template>
  <div class="cv-grid-container" v-bind:class="rootClassName">
    <div class="cv-grid-container1">
      <p class="cv-grid-text">{{ cvTitle }}</p>
      <div class="cv-grid-container2">
        <p class="cv-grid-text1">{{ cvYears }}</p>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CvGrid',
  props: {
    cvTitle: String,
    rootClassName: String,
    cvYears: String,
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
  flex-shrink: 0;
  font-weight: 700;
}
.cv-grid-container2 {
  gap: var(--dl-space-space-tripleunit);
  display: flex;
  align-self: flex-start;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
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




.cv-grid-root-class-name11 {
  margin-top: var(--dl-space-space-fourunits);
}




.cv-grid-root-class-name16 {
  margin-top: var(--dl-space-space-fourunits);
}











.cv-grid-root-class-name28 {
  margin-top: var(--dl-space-space-fourunits);
}
.cv-grid-root-class-name29 {
  margin-top: var(--dl-space-space-fourunits);
}
.cv-grid-root-class-name30 {
  margin-top: var(--dl-space-space-fourunits);
}


















.cv-grid-root-class-name49 {
  margin-top: var(--dl-space-space-fourunits);
}
.cv-grid-root-class-name50 {
  margin-top: var(--dl-space-space-fourunits);
}













@media(max-width: 991px) {
  .cv-grid-container1 {
    flex-direction: column;
  }
}
</style>
