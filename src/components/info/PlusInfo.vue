<template>
    <div>
        <p v-if="result.address.suburb">Suburb: {{this.result.address.suburb}}</p>
        <p v-if="result.class">{{result.class}}</p>
        <p v-if="result.extratags.start_dates">Start Date: {{result.extratags.start_date}}</p>
        <a :href="`https://es.wikipedia.org/wiki/${this.result.extratags.wikipedia}`"></a>
        <p v-if="result.type">{{result.type}}</p>
        <a :href="result.extratags.website"></a>
    </div>
</template>

<script>

export default {
    props: ["result"]
}
</script>

<style>

</style>