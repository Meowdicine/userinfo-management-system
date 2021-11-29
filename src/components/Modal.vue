<template>
  <div
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    class="fixed z-20 inset-0 overflow-y-auto"
  >
    <div
      class="flex items-end text-center min-h-screen justify-center sm:block"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;
      </span>

      <div
        class="
          rounded
          text-left
          shadow-xl
          transform
          bg-white
          inline-block
          align-bottom
          transition-all
          overflow-hidden
          sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
        "
      >
        <div>
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modalTitle: {
      type: String,
      default: "Modal Title",
    },
  },

  mounted() {
    window.addEventListener(
      "keydown",
      (e) => e.keyCode === 27 && this.$emit("close")
    );
  },
};
</script>
