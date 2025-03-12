<template>
  <div
    class="ww-leaflet leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom"
    :class="{ editing: isEditing }"
    ref="mapContainer"
    :key="componentKey"
  ></div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
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
  emits: ["trigger-event"],
  setup(props, { emit }) {
    const componentKey = ref(0);
    /* wwEditor:start */
    const isMarkersBound = computed(() => {
      return !!props.wwEditorState.boundProps.markers;
    });
    const isCirclesBound = computed(() => {
      return !!props.wwEditorState.boundProps.circles;
    });
    const isPolygonsBound = computed(() => {
      return !!props.wwEditorState.boundProps.polygons;
    });
    /* wwEditor:end */

    let boundStates = {
      markers: false,
      circles: false,
      polygons: false,
    };

    /* wwEditor:start */
    boundStates = {
      markers: isMarkersBound,
      circles: isCirclesBound,
      polygons: isPolygonsBound,
    };
    /* wwEditor:end */

    let mapInstance = null;
    const mapContainer = ref(true);

    function debounce(func, wait) {
      let timeout;
      return function (...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }

    async function initMap() {
      componentKey.value += 1;
      await nextTick();

      const { map } = useLeafletMap(
        mapContainer.value,
        props.content,
        boundStates,
        emit
      );

      mapInstance = map;
    }

    const debouncedInitMap = debounce(initMap, 1000);

    onMounted(() => {
      initMap();

      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.contentRect) {
            debouncedInitMap();
          }
        }
      });

      if (mapContainer.value) {
        resizeObserver.observe(mapContainer.value);
      }

      onUnmounted(() => {
        if (mapContainer.value) {
          resizeObserver.unobserve(mapContainer.value);
        }
      });
    });

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
      () => {
        initMap();
      }
    );

    watch(
      () => boundStates,
      () => {
        initMap();
      },
      { deep: true }
    );

    return { isEditing, mapContainer, mapInstance, componentKey };
  },
};
</script>

<style lang="scss" scoped>
.ww-leaflet {
  border: 5px solid red;
  width: 100%;
  overflow: hidden;
  /* wwEditor:start */
  &.editing {
    pointer-events: none;
  }
  /* wwEditor:end */
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
