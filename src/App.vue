<template>
  <!-- <router-view /> -->
  <router-view v-slot="{ Component }">
    <transition name="slide" mode="out-in">
      <main class="container">
        <component :is="Component" :key="$route.path" />
      </main>
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
});
</script>
<style lang="css" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 1s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>
