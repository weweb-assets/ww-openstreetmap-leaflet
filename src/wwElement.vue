<template>
  <div
    class="ww-leaflet leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom"
    :class="{ editing: isEditing }"
    ref="mapContainer"
  ></div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import "leaflet/dist/leaflet.css";
import useLeafletMap from "./use/useLeafletMap";

export default {
  name: "OpenStreetMap",
  props: {
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
    content: { type: Object, required: true },
  },
  setup(props) {
    let mapInstance = null;
    const mapContainer = ref(true);

    function initMap() {
      const { map } = useLeafletMap(mapContainer.value, props.content);
      mapInstance = map;
    }

    onMounted(() => initMap());

    const isEditing = computed(() => {
      /* wwEditor:start */
      return (
        props.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION
      );
      /* wwEditor:end */
      // eslint-disable-next-line no-unreachable
      return false;
    });

    watch(
      () => isEditing,
      async () => {
        initMap();
      }
    );

    return { isEditing, mapContainer, mapInstance };
  },
};
</script>

<style lang="scss" scoped>
.ww-leaflet {
  // TODO: to remove
  min-width: 600px;
  height: 500px;
  width: 100%;
  overflow: hidden;
  &.editing {
    pointer-events: none;
  }
}
</style>

<style lang="scss">
.leaflet-control-attribution {
  display: flex;
}

.leaflet-control-attribution > * {
  margin: 0px 4px;
}
</style>
