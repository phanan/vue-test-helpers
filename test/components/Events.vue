<template>
  <div>
    <a class="click" @click.prevent="click">Click</a>
    <a class="dblclick" @dblclick.prevent="dblclick">Double Click</a>
    <form @submit="submit('foo')"></form>
  </div>
</template>

<script>
  export default {
    methods: {
      click () {
        this.$emit('clicked', 10)
      },
      dblclick () {
        this.$emit('dblclicked', [41, 42])
      },
      submit (arg) {}
    }
  }
</script>
