<template>
  <div id="app">
    <rf-map :regions="regions" />
    <blockly :regions="regions" />
  </div>
</template>

<script>
import RfMap from './components/Map';
import Blockly from "./components/Blockly";
import RegionIndex from "./indexes/regions";

export default {
  name: 'app',
  components: {Blockly, RfMap},
  data () {
    const regions = {};
    Object.keys(RegionIndex).forEach(key => {
      regions[key] = {title: RegionIndex[key], info: [], color: null};
    });
    return {
      regions: regions
    }
  }
}
</script>

<style>
    @font-face {
        font-family: 'AGFatumC';
        src: url("~assets/fonts/16154.otf");
    }
    body {
        font-family: 'AGFatumC';
    }
</style>
