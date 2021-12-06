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

  // 按钮
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

  // 表格
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

  // 分页
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

  // input框
  .ant-input-affix-wrapper:hover {
    border-color: @EightyColor;
    border-right-width: 1px !important;
  }
  .ant-input-affix-wrapper:focus {
    border-color: @EightyColor;
    border-right-width: 1px !important;
    outline: 0;
    box-shadow: 0 0 0 2px @TwentyColor;
  }
  .ant-input:hover {
    border-color: @EightyColor;
    border-right-width: 1px !important;
  }
  .ant-input:focus {
    border-color: @EightyColor;
    border-right-width: 1px !important;
    outline: 0;
    box-shadow: 0 0 0 2px @TwentyColor;
  }

  // select
  .ant-input-group-addon .ant-select-open .ant-select-selector,
  .ant-input-group-addon .ant-select-focused .ant-select-selector {
    color: @color;
  }
  .ant-select:not(.ant-select-disabled):hover .ant-select-selector {
    border-color: @EightyColor;
  }
  .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    border-color: @EightyColor;
    box-shadow: 0 0 0 2px @TwentyColor;
  }
  .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
    background-color: @TwentyColor;
    .ant-select-item-option-state {
      color: @color;
    }
  }

  // checkbox
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: @color;
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
