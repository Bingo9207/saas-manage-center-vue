<template>
  <div class="theme2">
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.themeMixins(@color) {
  @EightyColor: fade(@color, 80%);
  @ThirtyColor: fade(@color, 30%);
  @TwentyHalfColor: fade(@color, 25%);
  @TwentyColor: fade(@color, 20%);
  @TenHalfColor: fade(@color, 15%);
  @TenColor: fade(@color, 10%);
  --primaryColor: @color;

  a {
    color: @color;

    &:hover {
      color: @color;
    }
  }

  .ant-btn-primary {
    border-color: @color;
    background: @color;

    &:hover,
    &:focus {
      color: #fff;
      background: @EightyColor;
      border-color: @EightyColor;
    }
  }

  .ant-table-thead > tr > th {
    background: @TwentyHalfColor;
  }
  .ant-table-thead
    > tr.ant-table-row-hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)
    > td,
  .ant-table-tbody
    > tr.ant-table-row-hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)
    > td,
  .ant-table-thead
    > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)
    > td,
  .ant-table-tbody
    > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)
    > td {
    background: @TenColor;
  }
  .ant-table-thead > tr.ant-table-row-selected > td.ant-table-column-sort,
  .ant-table-tbody > tr.ant-table-row-selected > td.ant-table-column-sort {
    background: @TenColor;
  }
  .ant-table-thead > tr:hover.ant-table-row-selected > td,
  .ant-table-tbody > tr:hover.ant-table-row-selected > td {
    background: @TenColor;
  }
  .ant-table-thead > tr:hover.ant-table-row-selected > td.ant-table-column-sort,
  .ant-table-tbody
    > tr:hover.ant-table-row-selected
    > td.ant-table-column-sort {
    background: @TenColor;
  }

  .ant-pagination-item:focus,
  .ant-pagination-item:hover {
    border-color: @color;
  }
  .ant-pagination-item:focus a,
  .ant-pagination-item:hover a {
    color: @color;
  }
  .ant-pagination-item-active {
    border-color: @color;
  }
  .ant-pagination-item-active a {
    color: @color;
  }
  .ant-pagination-item-active:focus,
  .ant-pagination-item-active:hover {
    border-color: @EightyColor;
  }
  .ant-pagination-item-active:focus a,
  .ant-pagination-item-active:hover a {
    color: @EightyColor;
  }
  .ant-pagination-jump-prev
    .ant-pagination-item-container
    .ant-pagination-item-link-icon,
  .ant-pagination-jump-next
    .ant-pagination-item-container
    .ant-pagination-item-link-icon {
    color: @color;
  }
  .ant-pagination-prev:focus .ant-pagination-item-link,
  .ant-pagination-next:focus .ant-pagination-item-link,
  .ant-pagination-prev:hover .ant-pagination-item-link,
  .ant-pagination-next:hover .ant-pagination-item-link {
    color: @color;
    border-color: @color;
  }
}

.theme1 {
  @primaryColor: #1890ff;

  .themeMixins(@primaryColor);
}

.theme2 {
  @primaryColor: #33b976;

  .themeMixins(@primaryColor);
}
</style>
