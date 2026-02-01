<template>
  <div class="cv-grid-container1" v-bind:class="rootClassName">
    <div class="cv-grid-container2">
      <p class="cv-grid-text1">{{ cvTitle }}</p>
      <div class="cv-grid-container3">
        <p class="cv-grid-text2">{{ cvYears }}</p>
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
.cv-grid-container1 {
  width: 100%;
  height: auto;
  display: flex;
  padding: var(--dl-layout-space-halfunit);
  position: relative;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
}
 
.cv-grid-container2 {
  gap: var(--dl-layout-space-tripleunit);
  flex: 0 0 auto;
  width: 1185px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
 
.cv-grid-text1 {
  width: 220px;
  align-self: flex-start;
  font-style: normal;
  flex-shrink: 0;
  font-weight: 700;
}
 
.cv-grid-container3 {
  gap: var(--dl-layout-space-tripleunit);
  display: flex;
  align-self: flex-start;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
}
 
.cv-grid-text2 {
  width: 150px;
  align-self: flex-start;
  min-height: 1rem;
  text-align: right;
  flex-shrink: 0;
}
 

 

 

 

 

 

 
.cv-gridroot-class-name6 {
  margin-top: var(--dl-layout-space-fourunits);
}
 

 

 

 
.cv-gridroot-class-name11 {
  margin-top: var(--dl-layout-space-fourunits);
}
 
.cv-gridroot-class-name12 {
  margin-top: var(--dl-layout-space-fourunits);
}
 

 

 

 
.cv-gridroot-class-name16 {
  margin-top: var(--dl-layout-space-fourunits);
}
 

 

 

 

 

 

 

 

 
.cv-gridroot-class-name28 {
  margin-top: var(--dl-layout-space-fourunits);
}
 
.cv-gridroot-class-name29 {
  margin-top: var(--dl-layout-space-fourunits);
}
 
.cv-gridroot-class-name30 {
  margin-top: var(--dl-layout-space-fourunits);
}
 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 

 
@media(max-width: 1200px) {
  .cv-grid-text1 {
    width: 220px;
    align-self: flex-start;
    font-style: normal;
    flex-shrink: 0;
    font-weight: 700;
  }
  .cv-grid-text2 {
    width: 150px;
    align-self: flex-start;
    min-height: 1rem;
    text-align: right;
    flex-shrink: 0;
  }
}
 
@media(max-width: 991px) {
  .cv-grid-container2 {
    flex-direction: column;
  }
}
</style>
