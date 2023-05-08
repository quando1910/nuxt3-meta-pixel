<template>
    <div>
      Nuxt module playground!
      <nuxt-link :to="'/about'">About</nuxt-link>
    </div>
  </template>
  
  <script setup>
  import { useNuxtApp } from '#app';
  const nuxtApp = useNuxtApp()
  // console.log(nuxtApp.$fb)
  </script>
  