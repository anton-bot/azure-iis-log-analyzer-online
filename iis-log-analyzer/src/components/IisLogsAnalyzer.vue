<template>
  <div id="iis-logs-analyzer">
    <h1>Azure IIS Logs Analyzer online</h1>
    <div class="row">
      <div class="col-lg-12">
        <div class="form-group">
          <label>Paste the entire IIS log, including headers:</label>
          <textarea id="iis-log" class="form-control" v-model="log"
                    v-on:change="processLog()"
                    v-on:input="processLog()"
                    v-on:keydown="processLog()"></textarea>
          <label class="red">{{ error }}</label>
        </div>
      </div>
    </div>
    <stats-table v-bind:stats="stats" />
  </div>
</template>

<script>
  import StatsTable from './StatsTable.vue';

  export default {
    components: { StatsTable },
    name: 'IisLogsAnalyzer',
    data() {
      return {
        log: '',
        error: '',
        stats: {
          hits: '',
          period: '',
          topFiles: '',
        },
      };
    },
    methods: {
      processLog() {
        this.error = '';
        let rows = this.log.split('\n').map(s => s.trim()).filter(s => s);

        // Find the row that contains fields
        let fieldsRow;
        for (let row of rows) {
          if (row.startsWith('#Fields: ')) {
            fieldsRow = row;
            break;
          } else {
            console.log(row);
          }
        }

        if (!fieldsRow) {
          this.error = 'Cannot find a row that starts with "#Fields:"';
          throw new Error(this.error);
        }

        fieldsRow = fieldsRow.replace('#Fields: ', '');
        let columnNames = fieldsRow.split(' ').map(s => s.trim()).filter(s => s);

        // Remove comment rows:
        rows = rows.filter(row => !row.startsWith('#'));

        // Convert into array of objects:
        this.d = rows.map(row => {
          row = row.split(' ');
          return row.reduce((res, field, index) => {
            res[columnNames[index]] = field;
            return res;
          }, {});
        });

        this.displayStats();
      },

      displayStats() {
        this.stats.hits = this.d.length;

        this.stats.period = `${this.d[0].date} ${this.d[0].time.substr(0, 5)} - ${this.d[this.d.length - 1].date} ${this.d[this.d.length - 1].time.substr(0, 5)}`;

        // Count number of unique files/URLs requested, sorted by frequency:
        this.stats.topFiles = this.countAndSort('cs-uri-stem');

        // Count error codes:
        this.stats.topStatusCodes = this.countAndSort('sc-status');

        // Count IP addresses:
        this.stats.topIpAddresses = this.countAndSort('c-ip');

        this.stats.medianTime = this.median(this.d.map(row => row['time-taken']));
      },

      /**
       * Returns an array of values and their counts, sorted in descending order.
       * @param {string} fieldName - Name of field in the data to count.
       */
      countAndSort(fieldName) {
        let counts = {};
        let files = this.d.map(row => {
          counts[row[fieldName]] = counts[row[fieldName]] || 0;
          counts[row[fieldName]]++;
          return row[fieldName];
        });
        return Object.entries(counts).sort((a, b) => b[1] - a[1]);
      },

      /**
       * Returns the median of numbers in array.
       * @param {number[]} values
       */
      median(values) {
        values.sort(function (a, b) { return a - b; });

        var half = Math.floor(values.length / 2);

        if (values.length % 2)
          return values[half];
        else
          return (values[half - 1] + values[half]) / 2.0;
      }
    },
  };
</script>

<style>
  body {
    font-family: 'Exo 2', sans-serif;
  }

  #iis-logs-analyzer {
    margin: 40px;
  }

  .results-column label {
    font-size: x-large;
    font-weight: bold;
  }
</style>
