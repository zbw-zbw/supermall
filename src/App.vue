<template>
  <div id="app">
    <main-tab-bar></main-tab-bar>
    <keep-alive exclude="Detail"><router-view></router-view></keep-alive>
  </div>
</template>

<script>
import MainTabBar from "./components/content/MainTarBar/MainTarBar";
export default {
  name: "app",
  components: {
    MainTabBar
  }
};
</script>

<style>
@import "./assets/css/base.css";
</style>
