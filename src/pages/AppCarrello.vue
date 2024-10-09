<script>
import { store } from '../store.js'

export default {
  components: {
  },
  data() {
    return {
      store,
    //   nameError: false,
    //   qtyError: false,
    //   qtyNegError: false,
    //   qtyNaNError: false,
    //   newItem: {
    //     itemName: '',
    //     itemQty: 1,
    //     checked: false,
    //   }
    }
  },
  methods: {
    keep(){
      localStorage.items = JSON.stringify(this.store.items);
      
    },
    keepUp() {
      this.store.items = localStorage.items ? JSON.parse(localStorage.items) : [];
    },
    // errorNameSwitcher(){
    //   this.nameError = false;
    // },
    // errorQtySwitcher(){
    //   this.qtyError = false;
    //   this.qtyNegError = false;
    //   this.qtyNaNError = false;
    // },
    checkItem(item){
      if(item.checked === false){
        return item.checked = true;
      }
      else {
        return item.checked = false;
      }
    },
    // addItem(newItem){
    //   // VALIDATIONS
    //   if(this.newItem.itemName === ''){
    //       this.nameError = true;            
    //   }
    //   else if(this.newItem.itemQty === ''){
    //       this.qtyError = true;
    //   }
    //   else if(this.newItem.itemQty <= 0){
    //     this.qtyNegError = true;
    //   }
    //   else if(isNaN(this.newItem.itemQty)){
    //     this.qtyNaNError = true;
    //   }
    //   // ADD ITEM
    //   else{
    //     this.nameError = false;
    //     this.qtyError = false;
    //     this.qtyNegError = false;
    //     this.qtyNaNError = false;
    //     this.store.items.push({...newItem})
    //     this.keep();
    //     this.newItem.itemName = '';
    //     this.newItem.itemQty = 1;
    //     this.newItem.checked = false;
    //   }
    // },
    // removeItem(item){
    //   this.store.items.splice(this.store.items.indexOf(item), 1);
    //   this.keep();
    // },
  },
  mounted() {
    this.keepUp();

  }
}

</script>

<template>
  <main class="bg_lightpinky">
    <section class="h-100">
        <div class="container-fluid d-flex justify-content-center py-3">
          <ul class="shop_list">
            <li v-if="this.store.items.length === 0" class="my2">
                <h3>A quanto pare non c'è nulla nella tua lista</h3>
                <p>Creala qui: <RouterLink to="/">Home</RouterLink></p>
            </li>
            <li v-if="this.store.items.length > 0" class="table_head">
              <p>Nome</p>
              <p>Quantità</p>
            </li>

            <li class="d-flex gap-3"
            v-for="item in this.store.items"
            >

              <div v-if="item.checked === true" class="icon c_orange bg_gray"  @click="checkItem(item)">
                <font-awesome-icon :icon="['fas', 'cart-arrow-down']" />
              </div>
              <div v-if="item.checked === false" class="icon c_orange bg_red"  @click="checkItem(item)">
                <font-awesome-icon :icon="['fas', 'cart-arrow-down']" />
              </div>
              
              <div class="item_text">
                <div class="name_badge">
                  <p class="check item_font c_gray" v-if="item.checked === true">{{ item.itemName }}</p>
                  <p v-if="item.checked === false" class="item_font c_red">{{ item.itemName }}</p>
                  <div :class="item.badge" class="badge mx-3">{{ item.badge }}</div>
                </div>

                <p v-if="Number.isInteger(item.itemQty) " class="item_font spacing_right">{{ item.itemQty }} <span class="c_gray" v-if="item.kilos === true">Kg</span></p>
                <p v-else class="item_font">{{ item.itemQty.toFixed(2) }} <span class="c_gray" v-if="item.kilos === true">Kg</span></p>
              </div>
              
            </li>
          </ul>
        </div>
    </section>
  </main>
</template>

<style>
.table_head{

    background-color: var(--orange);
    color: var(--lightpinky);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 4px 0 4px;
    border-radius: 12px;
}
.shop_list{
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
}
</style>