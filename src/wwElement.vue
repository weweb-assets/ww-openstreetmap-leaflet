<template>
  <div
    class="ww-leaflet leaflet-container leaflet-touch leaflet-retina leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom"
    :class="{ editing: isEditing }"
    ref="mapContainer"
    :key="componentKey"
  ></div>
</template>

<script>
import { ref, computed, onMounted, watch, nextTick } from "vue";
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
    const isRectanglesBound = computed(() => {
      return !!props.wwEditorState.boundProps.rectangles;
    });
    const isPolylinesBound = computed(() => {
      return !!props.wwEditorState.boundProps.polylines;
    });
    const isGeoJSONsBound = computed(() => {
      return !!props.wwEditorState.boundProps.geoJSONs;
    });

    const boundStates = {
      markers: isMarkersBound,
      circles: isCirclesBound,
      polygons: isPolygonsBound,
      rectangles: isRectanglesBound,
      polylines: isPolylinesBound,
      geoJSONs: isGeoJSONsBound,
    };
    /* wwEditor:end */

    let mapInstance = null;
    const mapContainer = ref(true);

    async function initMap() {
      componentKey.value += 1;
      await nextTick();

      const { map } = useLeafletMap(
        mapContainer.value,
        props.content,
        props.wwEditorState
          ? boundStates
          : {
              markers: false,
              circles: false,
              polygons: false,
              rectangles: false,
              polylines: false,
              geoJSONs: false,
            }
      );

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
