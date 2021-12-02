<template>
  <div class="container">
    <div class="left">
      <div class="summary" v-loading="loadingSummary">
        <n-grid x-gap="8" :cols="4">
          <n-gi :span="6" v-for="item in summaryList" :key="item.field">
            <div
              class="wrapper"
              :style="{ backgroundImage: 'url(' + item.background + ')' }"
            >
              <div class="icon"></div>
              <dl>
                <dt>{{ item.title }}</dt>
                <dd>{{ summaryData[item.field] || 0 }}</dd>
              </dl>
            </div>
          </n-gi>
        </n-grid>
      </div>
    </div>
    <div class="right">
     
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Welcome",
  data() {
    return {
      loadingSummary: false,
      summaryData: {},
      summaryList: [
        {
          title: "新增会员",
          field: "newVipCount",
          background: require("../assets/welcome/workbench1.jpg"),
        },
        {
          title: "进货",
          field: "newPurchaseCount",
          background: require("../assets/welcome/workbench2.jpg"),
        },
        {
          title: "销售",
          field: "newSaleAmt",
          background: require("../assets/welcome/workbench3.jpg"),
        },
        {
          title: "库存",
          field: "newStockCount",
          background: require("../assets/welcome/workbench4.jpg"),
        },
      ],
      salesData: [],
      purchaseData: [],
      purchaseDays: "7",
      stockData: [],
    };
  },
  created() {
    // this.reload();
  },
  computed: {
    ...mapState({
      tabKeys: (state) => state.router.tabKeys,
    }),
  },
  methods: {
    reload() {
      this.fetchSummary();
      this.fetchSalesStatistics();
      this.fetchPurchaseStatistics();
      this.fetchInventory();
    },
    fetchSummary() {
      this.loadingSummary = true;
      this.$http({
        url: `/api/saas/report/summary`,
        method: "GET",
      }).then((res) => {
        if (res.code === 0) {
          this.summaryData = res.data;
          this.loadingSummary = false;
        }
      });
    },
    fetchSalesStatistics() {
      this.$http({
        url: `/api/saas/report/weekTrend`,
        method: "GET",
      }).then((res) => {
        if (res.code === 0) {
          const sortArray = [];
          const sortJson = {};
          res.data.forEach((item) => {
            const date = item.date.split("-").join("");
            sortJson[date] = item;
          });
          for (let i in sortJson) {
            sortArray.push(sortJson[i]);
          }
          this.salesData = sortArray;
          this.loadSalesChart();
        }
      });
    },
    loadSalesChart() {
      const myChart = this.$echarts.init(document.querySelector("#sales"));
      const dateArray = [];
      const dataArray = [];
      this.salesData.forEach((item) => {
        dateArray.push(this.$moment(item.date).format("MM-DD"));
        dataArray.push(item.saleAmt);
      });
      myChart.setOption({
        title: {
          text: "近七天销售统计",
          top: 10,
          left: 15,
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: dateArray,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "销售金额",
            type: "line",
            smooth: 0.4,
            data: dataArray,
          },
        ],
      });
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    fetchPurchaseStatistics() {
      this.$http({
        url: `/api/saas/report/purchaseSum?days=${this.purchaseDays}`,
        method: "GET",
      }).then((res) => {
        if (res.code === 0) {
          const sortArray = [];
          const sortJson = {};
          res.data.forEach((item) => {
            const date = item.operDate.split("-").join("");
            sortJson[date] = item;
          });
          for (let i in sortJson) {
            sortArray.push(sortJson[i]);
          }
          this.purchaseData = sortArray;
          this.loadPurchaseChart();
        }
      });
    },
    loadPurchaseChart() {
      const myChart = this.$echarts.init(document.querySelector("#purchase"));
      const dateArray = [];
      const dataArray = [];
      this.purchaseData.forEach((item) => {
        dateArray.push(this.$moment(item.operDate).format("MM-DD"));
        dataArray.push(item.countSum);
      });
      myChart.setOption({
        title: {
          text: `${new Date().getFullYear()}年度近${
            { 7: "七天", 15: "15天", 30: "一个月" }[this.purchaseDays]
          }进货统计`,
          top: 10,
          left: 15,
        },
        xAxis: {
          type: "category",
          data: dateArray,
        },
        tooltip: {
          trigger: "axis",
        },
        yAxis: {
          type: "value",
        },
        grid: {
          bottom: 30,
          right: 30,
          left: 60,
        },
        series: [
          {
            data: dataArray,
            type: "bar",
          },
        ],
      });
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    fetchInventory() {
      this.$http({
        url: `/api/saas/report/allStockStatus`,
        method: "GET",
      }).then((res) => {
        if (res.code === 0) {
          this.stockData = res.data;
          this.loadStockChart();
        }
      });
    },
    loadStockChart() {
      const myChart = this.$echarts.init(document.querySelector("#stock"));
      const finallyArray = this.stockData.filter((item) => item.itemClsName);
      const dataArray = [];
      finallyArray.forEach((item) => {
        dataArray.push({
          name: item.itemClsName,
          value: parseFloat(item.stockQty).toFixed(3),
        });
      });
      myChart.setOption({
        title: {
          text: "总体库存情况",
          left: "center",
          top: 12,
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            center: ["50%", "55%"],
            selectedMode: "single",
            data: dataArray,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
  },
  watch: {
    tabKeys(newValue, oldValue) {
      if (oldValue !== newValue && newValue === "/welcome") {
        this.reload();
      }
    },
  },
};
</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: row;
  height: 100%;
  overflow: hidden;

  .left {
    flex: 1;
    padding-right: 8px;
    overflow: hidden;

    .summary {
      .wrapper {
        display: flex;
        flex-direction: row;
        height: 68px;
        padding: 15px 12% 15px 0;
        border-radius: 6px;
        background-repeat: no-repeat;
        background-position: right -20px center;
        background-size: auto 100%;

        .icon {
          width: 68px;
          height: 68px;
        }

        dl {
          flex: 1;
          margin: 0;
          color: #f1f1f1;
          line-height: 34px;
          text-align: center;

          dt {
            font-size: 18px;
            letter-spacing: 2px;
          }

          dd {
            margin: 0;
            padding: 0;
            font-size: 16px;
          }
        }
      }
    }

    .chart {
      height: calc((100% - 114px) / 2);
      margin-top: 8px;

      .sheet {
        width: 100%;
        height: 100%;
        border-radius: 6px;
        background-color: #fff;
      }

      .layout {
        height: 100%;
      }
    }
  }

  .right {
    width: 220px;

   
  }
}
</style>