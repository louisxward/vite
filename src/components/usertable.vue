<template>
    <table-lite
      :is-loading="table.isLoading"
      :columns="table.columns"
      :rows="table.rows"
      :total="table.totalRecordCount"
      :sortable="table.sortable"
      :messages="table.messages"
      @do-search="doSearch"
      @is-finished="table.isLoading = false"
    ></table-lite>
  </template>
  
  <script>
  import { defineComponent, reactive } from "vue";
  import TableLite from "../../node_modules/vue3-table-lite/src/components/TableLite.vue";
  
  // Fake Data for 'asc' sortable
  const sampleData1 = (offst, limit) => {
    offst = offst + 1;
    let data = [];
    for (let i = offst; i <= limit; i++) {
      data.push({
        id: i,
        name: "TEST" + i,
        email: "test" + i + "@example.com",
      });
    }
    return data;
  };
  
  // Fake Data for 'desc' sortable
  const sampleData2 = (offst, limit) => {
    let data = [];
    for (let i = limit; i > offst; i--) {
      data.push({
        id: i,
        name: "TEST" + i,
        email: "test" + i + "@example.com",
      });
    }
    return data;
  };
  
  export default defineComponent({
    name: "App",
    components: { TableLite },
    setup() {
      // Table config
      const table = reactive({
        isLoading: false,
        columns: [
          {
            label: "ID",
            field: "id",
            width: "3%",
            sortable: true,
            isKey: true,
          },
          {
            label: "Name",
            field: "name",
            width: "10%",
            sortable: true,
          },
          {
            label: "Email",
            field: "email",
            width: "15%",
            sortable: true,
          },
          {
            label: "Actions",
            field: "Update",
            width: "10%",
            display: function (row) {
              return (
                '<button type="button" data-id="' +
                row.id +
                '" class="is-rows-el quick-btn">Button</button>'
              );
            },
          },
          
        ],
        rows: [],
        totalRecordCount: 0,
        sortable: {
          order: "id",
          sort: "asc",
        },
      });
  
      /**
       * Search Event
       */
      const doSearch = (offset, limit, order, sort) => {
        table.isLoading = true;
        setTimeout(() => {
          table.isReSearch = offset == undefined ? true : false;
          if (offset >= 10 || limit >= 20) {
            limit = 20;
          }
          if (sort == "asc") {
            table.rows = sampleData1(offset, limit);
          } else {
            table.rows = sampleData2(offset, limit);
          }
          table.totalRecordCount = 20;
          table.sortable.order = order;
          table.sortable.sort = sort;
        }, 600);
      };
  
      // First get data
      doSearch(0, 10, 'id', 'asc');
  
      return {
        table,
        doSearch,
      };
    },
  });
  </script>

<style scoped>
::v-deep(.vtl-table .vtl-thead .vtl-thead-th) {
  color: black !important;
  background-color: var(--primary);
  border: none;
}
::v-deep(.vtl-table td),
::v-deep(.vtl-table tr) {
  border: none;
  background-color: var(--black);
  color: white;
}
::v-deep(.vtl-paging-info) {
  color: rgb(172, 0, 0);
}
::v-deep(.vtl-paging-count-label),
::v-deep(.vtl-paging-page-label) {
  color: rgb(172, 0, 0);
}
::v-deep(.vtl-paging-pagination-page-link) {
  border: none;
}
::v-deep(.vtl-paging) {
  padding: 0 0.75rem;
  background-color: var(--primary);
}
::v-deep(.vtl-card-body) {
  background-color: var(--primary);
}
::v-deep(.vtl-paging-info, .vtl-paging-change-div) {
  color: var(--black);
}
</style>