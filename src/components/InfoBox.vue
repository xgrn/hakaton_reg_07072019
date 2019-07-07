<template>
    <div class="info-box" :style="{top: pos.top + 'px', left: pos.left + 'px'}">
        <div v-for="(row, ind) in rows" :key="ind">
            {{ row.label }}
            {{ row.value }}
        </div>
    </div>
</template>

<script>
    export default {
        name: "info-box",
        props: {
            pos: {type: Object, required: true},
            rows: {type: Array, required: true}
        }
    }
</script>

<style scoped>
    .info-box {
        position: absolute;
        background: rgba(255, 255, 255, .9);
        padding: 10px;
        pointer-events: none;
        border-radius: 3px;
    }
</style>