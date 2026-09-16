<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>
 
<template>
  <input
    :value="modelValue"
    class="search-bar"
    @input="$emit('update:modelValue', $event.target.value)"
    placeholder="Suche Notizen"
  >
</template>
