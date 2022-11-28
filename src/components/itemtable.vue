<template>
  <div>
    <div class="tableContainer">
        <table-lite
          :is-loading="table.isLoading"
          :columns="table.columns"
          :rows="table.rows"
          :total="table.totalRecordCount"
          :sortable="table.sortable"
          :messages="table.messages"
          @do-search="getItemList"
          @is-finished="tableLoadingFinish"
        ></table-lite>
    </div>
    <div class="buttonContainer">
      <button class="actionBtn" @click="getItemList(0, 10, 'created', 'desc');">Refresh</button>
    </div>
  </div>
</template>
  
<script setup>
  import TableLite from "vue3-table-lite/src/components/TableLite.vue";
  import { pocketBaseSymbol } from '../symbols/injectionSymbols';
  import { inject, onMounted, ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { useUserStore } from '../stores/user';

  const userStore = useUserStore()

  const $pb = inject(pocketBaseSymbol);


  const table = reactive({
    isLoading: true,
    columns: [
    {
        label: "Code",
        field: "code",
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
        label: "Price",
        field: "price",
        width: "15%",
        sortable: true,
      },
      {
        label: "Actions",
        field: "Update",
        width: "10%",
        display: function (row) {
          const hide = row.userId != '' ? 'style="display: none"' : ''
          return (
          '<button type="button" data-id="' 
          + row.id 
          + '"class="is-rows-el view-btn actionBtn">View</button>'
          + '<button type="button" data-id="' 
          + row.id 
          +'"class="is-rows-el buy-btn actionBtn "'
          + hide
          +'>Buy</button>'
          );
        },
      },
    ],
    rows: [],
    totalRecordCount: 0,
    sortable: {
      order: "created",
      sort: "desc",
    },
  });

  const getItemList = async (offset, limit, order, sort) => {
    table.isLoading = true;
    const sort2 = sortFlipper(sort) + order
    console.log("itemList:" + offset + " " + limit + " " +  sort2)
    try {
        const result = await $pb.collection('items').getList(offset, limit, {sort: sort2, expand: '',});
        if (result) {
            table.isReSearch = offset == undefined ? true : false;
            table.rows = result.items
            table.totalRecordCount = result.totalItems;
            table.sortable.order = order;
            table.sortable.sort = sort;
        }

    } catch (error) {
        console.log("error");
    }
  }


  const tableLoadingFinish = (elements) => {
    table.isLoading = false;
    Array.prototype.forEach.call(elements, function (element) {
      if (element.classList.contains("buy-btn")) {
        element.addEventListener("click", function (event) {
          event.stopPropagation(); // prevents further propagation of the current event in the capturing and bubbling phases.
          const id = this.dataset.id
          const currentUserId = this.dataset.userid
          buyItem(id)
        });
      }
    });
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


  const buyItem = async (itemId) => {
    console.log("buyItem()")
    try {
        const result = await $pb.collection('items').update(itemId, {userId: userStore.userId});
        getItemList(0, 10, 'created', 'desc')
    } catch (error){
      console.log(error)
    }
  }


  onMounted(() => {
    getItemList(0, 10, 'created', 'desc');
  })

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