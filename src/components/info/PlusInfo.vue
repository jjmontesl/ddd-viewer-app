<template>
    <div>
        <p v-if="result.address.suburb">Suburb: {{this.result.address.suburb}}</p>
        <p v-if="result.class">Class: {{result.class}}</p>
        <p v-if="result.type">Type: {{result.type}}</p>
        <p v-if="result.extratags.start_dates">Start Date: {{result.extratags.start_date}}</p>
        <br>
        <a v-if="result.extratags.website" :href="result.extratags.website">{{result.extratags.website}}</a>
    </div>
</template>

<script>

export default {
    props: ["result"]
}
</script>

<style>

</style>
