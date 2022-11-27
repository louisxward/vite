<template>
      <div>
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
        <button style="color:red;" @click="doDefaultSearch">Refresh</button>
  </div>
</template>
  
  <script>
  import { defineComponent, reactive } from "vue";
  import TableLite from "../../node_modules/vue3-table-lite/src/components/TableLite.vue";

  import PocketBase from 'pocketbase';

  const pb = new PocketBase('http://127.0.0.1:8090');

  export default defineComponent({
    name: "App",
    components: { TableLite },
    setup() {
      // Table config
      const table = reactive({
        isLoading: false,
        columns: [
          {
            label: "Created",
            field: "created",
            width: "3%",
            sortable: true,
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
        console.log(offset + " " + limit + " " + order + " " + sort)
        const sort2 = sortFlipper(sort) + order
        table.isLoading = true;
        setTimeout(async () => {
          table.isReSearch = offset == undefined ? true : false;
          if (offset >= 10 || limit >= 20) {
            limit = 20;
          }
          const resultList = await pb.collection('users').getList(1, limit, {sort: sort2});
          table.rows = resultList.items
          table.totalRecordCount = resultList.totalItems;
          table.sortable.order = order;
          table.sortable.sort = sort;
        }, 600);
      };

      function sortFlipper(sort){
        if (sort == "asc"){
          return "+"
        }
        else if (sort == "desc"){
          return "-"
        }
        return ""
      }


      // First get data

      function doDefaultSearch (){
        console.log("doDefaultSearch()")
        doSearch(0, 10, 'name', 'asc');
      }

      doDefaultSearch();

      return {
        table,
        doSearch,
        doDefaultSearch,
      };
    },
  });
  </script>

<style scoped>
::v-deep(.vtl-table .vtl-thead .vtl-thead-th) {
  color: black;
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
::v-deep(.vtl-paging-info) {
  color: var(--black);
}
::v-deep(.vtl-paging-count-label) {
  color: var(--black);
}
::v-deep(.vtl-paging-page-label) {
  color: var(--black);
  margin-left: 1rem;
}
::v-deep(.quick-btn) {
  background-color: var(--primary);
  color: black;
  padding: 0.25rem;
  font-weight: bold;
}
::v-deep(.page-link) {
 background-color: var(--primary);
 color: black;
 padding-top: 0px;
 padding-bottom: 1.20rem;
}
::v-deep(.page-item.disabled .page-link){
  background-color: var(--primary);
  color: black;
  padding-top: 0px;
  padding-bottom: 1.20rem;
}
::v-deep(.vtl-empty-msg ){
  color: black;
  padding-bottom: 1.20rem;
}
</style>