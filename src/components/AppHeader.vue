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
      <div class="container py-3">
        <div class="header">
          <div class="d-flex logo">
            <h1>Sho<span class="c_pinky">Ops</span></h1>
            <div>
              <font-awesome-icon :icon="['fab', 'opencart']" />
            </div>
          </div>
          <nav>
            <ul class="link-list">
              <li class="link">
                <RouterLink class="link" to="/carrello">Lista</RouterLink>
              </li>
              <li class="link">
                <RouterLink class="link" to="/">Home</RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  </header>

</template>

<style>
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1{
  font-weight: 700;
}
.link{
  text-decoration: none;
  color: var(--orange);
  font-size: 20px;
  font-weight: 600;

  &:hover{
    color: var(--pinky);
    transform: scale(1.2);
  }
}

.link-list{
  display: flex;
  flex-direction: row-reverse;
  gap: 32px
}
</style>