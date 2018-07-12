<template>
  <table class="table table-striped" v-if="stats.hits !== ''">
    <tr>
      <td>Period</td>
      <td>{{ stats.period }}</td>
    </tr>
    <tr>
      <td>Total hits</td>
      <td>{{ stats.hits }}</td>
    </tr>
    <tr>
      <td>Top URLs</td>
      <td>
        <div v-for="file in stats.topFiles">({{ file[1] }}) {{ file[0] }}</div>
      </td>
    </tr>
    <tr>
      <td>Top status codes</td>
      <td>
        <div v-for="code in stats.topStatusCodes">({{ code[1] }}) {{ code[0] }}</div>
      </td>
    </tr>
    <tr>
      <td>Top IP addresses</td>
      <td>
        <div v-for="ip in stats.topIpAddresses">({{ ip[1] }}) {{ ip[0] }}</div>
      </td>
    </tr>
    <tr>
      <td>Median response time</td>
      <td>{{ stats.medianTime }} ms</td>
    </tr>
  </table>
</template>
<script>
  export default {
    name: 'StatsTable',
    props: [
      'stats',
    ],
    data() {
      return {
        
      };
    },
  };
</script>
<style scoped>
  td {
    vertical-align: top;
  }

  td:nth-child(even) {
    font-size: x-large;
    font-weight: bold;
  }
</style>
