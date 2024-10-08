<script>

export default {
  components: {
  },
  data() {
    return {
    }
  }
}

</script>

<template>

  <header>
    <section class="bg_gray c_orange">
      <div class="container py-3 header">
        <h1>ShoOps</h1>
        <div class="big_icon">
          <font-awesome-icon :icon="['fab', 'opencart']" />
        </div>
        <RouterLink to="/">Go to Home</RouterLink>
        <RouterLink to="/carrello">Cart</RouterLink>
      </div>
    </section>
  </header>

</template>

<style></style>