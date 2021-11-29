<template>
  <div>
    <button v-if="componentType === 'editIcon'" type="button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        :class="cssClass"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#7c3aed"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
        <line x1="16" y1="5" x2="19" y2="8" />
      </svg>
    </button>

    <button
      v-else-if="componentType === 'deleteIcon'"
      type="button"
      class="cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        :class="cssClass"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="#ff2825"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="4" y1="7" x2="20" y2="7" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
      </svg>
    </button>

    <button
      v-else
      :type="type"
      :disabled="loading"
      :class="cssClass || 'btn btn-primary'"
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
      <span :class="loading && 'invisible'"> {{ text }} </span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    cssClass: String,
    componentType: String,
    text: { type: String, default: "Save" },
    loaderSize: { type: Number, default: 18 },
    loading: { type: Boolean, default: false },
  },
};
</script>
