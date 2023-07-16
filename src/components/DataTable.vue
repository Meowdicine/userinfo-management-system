<template>
  <div>
    <Loader v-if="loader" />
    <div v-else class="flex flex-col space-y-4">
      <div
        class="items-center justify-between flex flex-col-reverse md:flex-row"
      >
        <div class="w-full md:w-1/3">
          <FormInput
            type="text"
            v-model="search"
            :iconText="'&#128270;'"
            placeholder="Search by user's name..."
          />
        </div>
        <div class="mb-4 md:mb-0">
          <slot name="topButton" />
        </div>
      </div>
      <div id="dataTable">
        <div class="w-full card border-2">
          <div class="overflow-x-auto border-b-2 border-gray-200">
            <table class="min-w-full card-table">
              <thead class="relative">
                <tr
                  class="leading-4 capitalize tracking-wider text-base text-left border-b-2 border-gray-200"
                >
                  <slot name="tableHead">
                    <th
                      :key="index"
                      class="font-bold"
                      v-for="(header, index) in headers"
                    >
                      <slot :name="`header.${header.key}`" :header="header">
                        <span
                          @click="
                            header.sorting && items.length && sort(header)
                          "
                          :class="
                            header.sorting && items.length && 'cursor-pointer'
                          "
                        >
                          {{ header.key }}
                          <span v-if="header.sorting && items.length"
                            >&#8645;</span
                          >
                        </span>
                      </slot>
                    </th>
                  </slot>
                </tr>
              </thead>

              <tbody v-if="items.length">
                <tr
                  :key="index"
                  v-for="(item, index) in items"
                  class="text-gray-900 hover:bg-blue-600 border-b-2 border-gray-200"
                >
                  <slot name="tableRow" :item="item">
                    <td
                      :key="headerIndex"
                      class="whitespace-no-wrap"
                      v-for="(header, headerIndex) in headers"
                    >
                      <slot :name="`item.${header.key}`" :item="item">
                        {{ displayCellValue(item, header) }}
                      </slot>
                    </td>
                  </slot>
                </tr>
              </tbody>
              <tfoot
                v-else
                class="text-center text-gray-500 p-4 capitalize w-full"
              >
                <td :colspan="headers.length">{{ message }}</td>
              </tfoot>
            </table>
          </div>
          <div v-if="show_footer" id="pagination" class="mt-4 px-5 py-4">
            <span>
              showing {{ pagination.from }} to {{ pagination.to }} of
              {{ pagination.total }}
            </span>

            <span class="float-right">
              <button
                @click="paginate('prev')"
                :disabled="currentPage == 1"
                :class="`${
                  currentPage == 1
                    ? 'text-gray-500 cursor-not-allowed'
                    : 'text-primary'
                }`"
              >
                &laquo; Previous
              </button>
              |
              <button
                @click="paginate('next')"
                :disabled="currentPage == pagination.last_page"
                :class="`${
                  currentPage == pagination.last_page
                    ? 'text-gray-500 cursor-not-allowed'
                    : 'text-primary'
                }`"
              >
                Next &raquo;
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NProgress from 'nprogress'
import Loader from './Loader.vue'
import FormInput from './FormInput.vue'

export default {
  components: {Loader, FormInput},
  props: {
    url: String,
    headers: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    items: [],

    search: '',
    sorting: {},
    searchTime: null,

    message: '',
    loader: true,
    currentPage: 1,
    show_footer: false,
    pagination: {last_page: 1},
  }),

  methods: {
    // function to fetch table's Data
    getDataTable() {
      NProgress.start()
      this.message = 'Loading...'
      this.checkCurrentPage()

      let query = {}
      if (this.search) {
        query.name = this.search
      } else {
        delete query.name
      }

      if (Object.keys(this.sorting).length) {
        query.sorting = this.sorting
      } else {
        delete query.sorting
      }

      this.fetch()
        .get(this.url, {
          params: {
            ...query,
            page: this.currentPage,
          },
        })
        .then(({data}) => {
          if (data.data.length) {
            this.items = data.data
            this.show_footer = true
            this.pagination = data.pagination
          } else {
            this.items = []
            this.show_footer = false
            this.message = 'no items to show'
          }

          this.checkLastPage(this.pagination)
        })
        .finally(() => {
          NProgress.done()
          setTimeout(() => {
            this.loader = false
          }, 700)
        })
    },

    paginate(action) {
      action === 'next' ? this.currentPage++ : this.currentPage--
      this.$router.replace({query: {page: this.currentPage}})
      this.getDataTable()
    },

    sort({key}) {
      this.sorting.orderType =
        this.sorting.orderType === 'desc' ? 'asc' : 'desc'
      this.sorting.orderBy = key
      this.getDataTable()
    },

    checkCurrentPage() {
      if (
        this.$route.query.page &&
        !isNaN(this.$route.query.page) &&
        this.$route.query.page > 0
      ) {
        this.currentPage = this.$route.query.page
      } else {
        this.currentPage = 1
        this.$router.push({query: {page: this.currentPage}})
      }
    },

    checkLastPage(pagination) {
      if (
        this.$route.query.page &&
        !isNaN(this.$route.query.page) &&
        this.$route.query.page > pagination.last_page
      ) {
        this.$router.push({name: 'NotFound'})
      }
    },

    displayCellValue(item, header) {
      let value = null
      if (header.formatter && header.formatter.constructor === Function) {
        value = header.formatter(item)
        if (value !== null) {
          return !value.includes('null') ? value : '_'
        }
      } else if (header.key) {
        let keys = header.key.split('.')
        let finalValue = item[keys.shift()]

        if (finalValue && [Object, Array].includes(finalValue.constructor)) {
          keys.forEach(key => {
            if (
              finalValue &&
              [Object, Array].includes(finalValue.constructor)
            ) {
              finalValue = finalValue[key]
            } else {
              finalValue = null
            }
          })
        }

        value = finalValue
      }

      return value || '_'
    },
  },

  mounted() {
    this.getDataTable()
    this.Bus.$on('getDataTable', () => this.getDataTable())
  },

  watch: {
    $route() {
      this.getDataTable()
    },
    search() {
      clearTimeout(this.searchTime)
      this.searchTime = setTimeout(() => {
        this.$route.query.page != 1 && this.$router.replace({query: {page: 1}})
        this.getDataTable()
      }, 1000)
    },
  },
}
</script>
