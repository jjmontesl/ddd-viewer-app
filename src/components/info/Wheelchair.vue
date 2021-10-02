<template>
    <div v-if="result.extratags.wheelchair == 'yes'">
        <v-icon class="info--text p-3">mdi-wheelchair-accessibility</v-icon>
    </div>
</template>

<script>
export default {
    props: ['result']
}
</script>

<style>

</style>