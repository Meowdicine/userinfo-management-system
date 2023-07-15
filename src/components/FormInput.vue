<template>
  <div class="flex w-full flex-wrap items-stretch">
    <label
      v-if="label"
      :for="inputId"
      class="text-gray-600 font-thin mb-1 capitalize"
    >
      {{ label }} <span v-if="isRequired" class="text-red-300">*</span>
    </label>
    <div
      class="relative flex w-full flex-wrap items-stretch border-2 border-purple-100"
    >
      <span
        v-if="iconText"
        style="padding-top: 6px"
        class="w-8 z-10 h-full absolute text-base opacity-70 font-normal leading-snug items-center justify-center bg-transparent bg-gray-100 text-center text-blueGray-300"
      >
        <span v-html="iconText" class="text-xs"></span>
      </span>
      <input
        :type="type"
        :id="inputId"
        :value="value"
        v-bind="bindOptions"
        :required="isRequired"
        @input="
          $emit(
            'input',
            type === 'number' ? +$event.target.value : $event.target.value
          )
        "
        :placeholder="placeholder"
        class="p-2 shadow w-full text-sm rounded bg-white outline-none text-blueGray-600 placeholder-blueGray-300 focus:outline-none focus:ring"
        :class="[iconText && 'pl-10 relative']"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    iconText: String,
    placeholder: String,
    bindOptions: Object,
    isRequired: Boolean,
    value: [String, Number],
    type: {type: String, required: true},
  },
  computed: {
    inputId() {
      return `input-id-${Math.random() * 52485}`
    },
  },
}
</script>
