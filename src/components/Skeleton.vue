<template>
  <div role="status" class="flex flex-col space-y-4 w-full animate-pulse">
    <div
      class="items-end md:items-center justify-between gap-4 flex flex-col-reverse md:flex-row"
    >
      <div
        class="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-full md:w-1/3"
      ></div>
      <div
        class="h-8 bg-gray-200 rounded-full dark:bg-gray-700 w-full md:w-1/3"
      ></div>
    </div>

    <div>
      <div class="w-full border-2">
        <div class="overflow-x-auto border-b-2 border-gray-200">
          <table class="min-w-full card-table">
            <thead class="relative">
              <tr
                class="leading-4 capitalize tracking-wider text-base text-left border-b-2 border-gray-200"
              >
                <th v-for="(n, index) in 4" :key="index">
                  <div
                    class="h-8 bg-gray-200 rounded-full dark:bg-gray-700"
                  ></div>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(n, index) in 5"
                :key="index"
                class="text-gray-900 hover:bg-blue-600 border-b-2 border-gray-200"
              >
                <td v-for="(_, childIndex) in 4" :key="childIndex">
                  <div
                    class="h-8 bg-gray-200 rounded-full dark:bg-gray-700"
                  ></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
