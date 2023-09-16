<template>
    <p v-if="result.namedetails && result.namedetails.name">
        <b><h3 class="mb-1">{{result.namedetails.name}}</h3></b>
    </p>
</template>

<script>
export default {
    props: ['result']
}
</script>

<style>

</style>
