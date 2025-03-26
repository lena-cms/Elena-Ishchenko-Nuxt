<template>
  <div class="experiment-page-container1">
    <div class="experiment-page-sidebar">
      <nav class="experiment-page-nav">
        <svg viewBox="0 0 1024 1024" class="experiment-page-icon1">
          <path
            d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"
          ></path>
        </svg>
        <span class="experiment-page-text1">Dashboard</span>
        <span class="experiment-page-text2">Calendar</span>
        <span class="experiment-page-text3">Team</span>
        <span class="experiment-page-text4">Documents</span>
        <span>Reports</span>
      </nav>
      <div class="experiment-page-profile">
        <img
          alt="image"
          src="https://images.unsplash.com/photo-1562159278-1253a58da141?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDIyfHxtYW4lMjBwb3J0dHJhaXR8ZW58MHx8fHwxNjI3MjkzNTM1&amp;ixlib=rb-1.2.1&amp;h=1000"
          class="experiment-page-image"
        />
        <div class="experiment-page-container2">
          <span class="experiment-page-text6">John Doe</span>
          <span class="experiment-page-text7">View Profile</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExperimentPage',
  props: {},
  head: {
    title: 'experiment-page - Elena Ishchenko',
    meta: [
      {
        property: 'og:title',
        content: 'experiment-page - Elena Ishchenko',
      },
    ],
  },
}
</script>

<style scoped>
.experiment-page-container1 {
  width: 100%;
  display: flex;
  overflow: auto;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
}
 
.experiment-page-sidebar {
  width: 300px;
  height: 80vh;
  display: flex;
  padding: 32px;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
}
 
.experiment-page-nav {
  flex: 0 0 auto;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
 
.experiment-page-icon1 {
  width: 16px;
  height: 16px;
  margin-bottom: 32px;
}
 
.experiment-page-text1 {
  margin-bottom: 32px;
}
 
.experiment-page-text2 {
  margin-bottom: 32px;
}
 
.experiment-page-text3 {
  margin-bottom: 32px;
}
 
.experiment-page-text4 {
  margin-bottom: 32px;
}
 
.experiment-page-profile {
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: var(--dl-layout-space-unit);
  border-color: var(--dl-color-gray-900);
  border-width: 1px;
  flex-direction: row;
  justify-content: flex-start;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 0px;
}
 
.experiment-page-image {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: var(--dl-layout-radius-round);
}
 
.experiment-page-container2 {
  display: flex;
  align-items: flex-start;
  margin-left: var(--dl-layout-space-halfunit);
  flex-direction: column;
  justify-content: space-between;
}
 
.experiment-page-text6 {
  font-size: 1.15rem;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 0.25rem;
}
 
.experiment-page-text7 {
  color: var(--dl-color-gray-500);
  font-size: 0.75rem;
}
 
@media(max-width: 991px) {
  .experiment-page-profile {
    padding-left: var(--dl-layout-space-halfunit);
    padding-right: var(--dl-layout-space-halfunit);
  }
  .experiment-page-image {
    margin-left: 0px;
  }
}
 
@media(max-width: 767px) {
  .experiment-page-icon1 {
    display: flex;
  }
}
</style>
