<template>
  <div class="board-column">
    <div class="board-column-header">
      {{ list[0].patientid }}
    </div>
    <div
          :list="list"
      :options="options"
      class="board-column-content">
      <div v-for="element in list" :key="element.time" class="board-item">
        {{ element.patientid }} {{element.activity}} {{element.location}} {{ '' + Math.floor(Math.abs(element.time - Date.now()) / 1000) + 's ago'  }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PatientList',
  props: {
    headerText: {
      type: String,
      default: 'Header'
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    list: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
<style lang="scss">
.board-column {
  min-width: 300px;
  min-height: 100px;
  height: auto;
  overflow: hidden;
  background: #f0f0f0;
  border-radius: 3px;
  .board-column-header {
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    padding: 0 20px;
    text-align: center;
    background: #333;
    color: #fff;
    border-radius: 3px 3px 0 0;
  }
  .board-column-content {
    height: auto;
    overflow: hidden;
    border: 10px solid transparent;
    min-height: 60px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    .board-item {
      cursor: pointer;
      width: 100%;
      height: 64px;
      margin: 5px 0;
      background-color: #fff;
      text-align: left;
      line-height: 54px;
      padding: 5px 10px;
      box-sizing: border-box;
      box-shadow: 0px 1px 3px 0 rgba(0,0,0,0.2);
    }
  }
}
</style>
