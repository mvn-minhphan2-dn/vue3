<template>
  <section class="container">
    <!-- <div class="flex items-center justify-center h-screen">
      <video-player class="video-player vjs-big-play-centered" src="https://vjs.zencdn.net/v/oceans.mp4"
        poster="https://vjs.zencdn.net/v/oceans.png" crossorigin="anonymous" playsinline controls :volume="0.6"
        :height="320" :playback-rates="[0.5, 1.0, 1.5, 2.0]" @mounted="handleMounted" @ready="handleEvent($event)"
        @play="handleEvent($event)" @pause="handleEvent($event)" @ended="handleEvent($event)"
        @loadeddata="handleEvent($event)" @waiting="handleEvent($event)" @playing="handleEvent($event)"
        @canplay="handleEvent($event)" @canplaythrough="handleEvent($event)"
        @timeupdate="handleEvent(player?.currentTime())" />
    </div> -->
    <div class="py-10">
      <input
        class="mb-5 text-black border-2 border-red-500"
        v-model="firstName"
        placeholder="edit me"
      />
      <input
        class="mb-5 text-black border-2 border-red-500"
        v-model="lastName"
        placeholder="edit me"
      />
      <div class="h-10 text-white bg-amber-400">{{ fullName }}</div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, shallowRef, ref, computed } from "vue";
// import { VideoPlayer } from "@videojs-player/vue";
import "video.js/dist/video-js.css";

export default defineComponent({
  name: "About",
  components: {
    // VideoPlayer,
  },
  setup() {
    const firstName = ref("John");
    const lastName = ref("Doe");

    const fullName = computed({
      get() {
        return firstName.value + " " + lastName.value;
      },
      set(newValue) {
        [firstName.value, lastName.value] = newValue.split(" ");
      },
    });

    const player = shallowRef<any>();

    const handleMounted = (payload: any) => {
      player.value = payload.player;
      console.log("Basic player mounted", payload);
    };

    const handleEvent = (log: any) => {
      console.log("Basic player event", log);
    };

    return {
      player,
      handleMounted,
      handleEvent,
      firstName,
      lastName,
      fullName,
    };
  },
});
</script>
