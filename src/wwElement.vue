<template>
  <div
    class="ww-leaflet"
    :class="{ editing: isEditing }"
    ref="mapContainer"
  ></div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
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
    let mapInstance = ref(null);
    const mapContainer = ref();

    onMounted(() => {
      const { map } = useLeafletMap(mapContainer.value, props.content);
      mapInstance.value = map;
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

    return { isEditing, mapContainer, mapInstance };
  },
};
</script>

<style lang="scss" scoped>
.ww-leaflet {
  // TODO: to remove
  height: 500px;
  width: 100%;
  overflow: hidden;
  &.editing {
    pointer-events: none;
  }
}
</style>
