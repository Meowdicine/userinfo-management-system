<template>
  <div>
    <button
      :type="type"
      :disabled="loading"
      @click="$emit('click')"
      :class="normal || cssClass ? cssClass : 'btn btn-primary'"
      class="flex flex-col items-center justify-center text-xs"
    >
      <svg
        v-if="loading"
        :width="loaderSize"
        :height="loaderSize"
        stroke="#ccc"
        class="absolute"
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="none" fill-rule="evenodd">
          <g transform="translate(1 1)" stroke-width="2">
            <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
            <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      </svg>
      <span :class="loading && 'invisible'">
        <slot>{{ text }} </slot>
      </span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    normal: Boolean,
    cssClass: String,
    componentType: String,
    text: { type: String, default: 'Save' },
    loaderSize: { type: Number, default: 18 },
    loading: { type: Boolean, default: false }
  }
}
</script>
