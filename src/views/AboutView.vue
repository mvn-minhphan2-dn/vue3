<template>
  <section class="container">
    <div class="h-screen flex items-center justify-center">
      <video-player
        class="video-player vjs-big-play-centered"
        src="https://vjs.zencdn.net/v/oceans.mp4"
        poster="https://vjs.zencdn.net/v/oceans.png"
        crossorigin="anonymous"
        playsinline
        controls
        :volume="0.6"
        :height="320"
        :playback-rates="[0.5, 1.0, 1.5, 2.0]"
        @mounted="handleMounted"
        @ready="handleEvent($event)"
        @play="handleEvent($event)"
        @pause="handleEvent($event)"
        @ended="handleEvent($event)"
        @loadeddata="handleEvent($event)"
        @waiting="handleEvent($event)"
        @playing="handleEvent($event)"
        @canplay="handleEvent($event)"
        @canplaythrough="handleEvent($event)"
        @timeupdate="handleEvent(player?.currentTime())"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from "vue";
import { VideoPlayer } from "@videojs-player/vue";
import "video.js/dist/video-js.css";

export default defineComponent({
  name: "About",
  components: {
    VideoPlayer,
  },
  setup() {
    const player = shallowRef<any>();

    const handleMounted = (payload: any) => {
      player.value = payload.player;
      console.log("Basic player mounted", payload);
    };

    const handleEvent = (log: any) => {
      console.log("Basic player event", log);
    };
    return { player, handleMounted, handleEvent };
  },
});
</script>
