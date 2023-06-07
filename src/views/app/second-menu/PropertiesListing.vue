<template>
  <b-row>
    <b-colxx class="disable-text-selection">
      <list-page-heading
        :title="$t('menu.prop-listing')"
        :selectAll="selectAll"
        :isSelectedAll="isSelectedAll"
        :isAnyItemSelected="isAnyItemSelected"
        :selectedItems="selectedItems"
        :keymap="keymap"
        :displayMode="displayMode"
        :changeDisplayMode="changeDisplayMode"
        :changeOrderBy="changeOrderBy"
        :sort="sort"
        :searchChange="searchChange"
        :from="from"
        :to="to"
        :total="total"
        :perPage="perPage"
        @fetchList="loadItems"
      ></list-page-heading>
      <template v-if="isLoad">
        <list-page-listing
          :displayMode="displayMode"
          :selectedItems="selectedItems"
          :toggleItem="toggleItem"
          :perPage="perPage"
          :changePage="onPageChanged"
          :handleContextMenu="handleContextMenu"
          :onContextMenuAction="onContextMenuAction"
          :total="total"
        ></list-page-listing>
      </template>
      <template v-else-if="!isLoad && requireReload == false">
        <b-card>
          <div class="loading"></div>
        </b-card>
      </template>
      <template v-else-if="requireReload === true">
        <b-card>
          <div>
            <h3><i class="iconsmind-Information" /> Server Error! No data available</h3>
            <p>Click on 'Reload' button to try again.</p>
          </div>
        </b-card>
        <span class="d-flex justify-content-center mt-2">
          <b-button variant="outline-info" @click="getPropertiesData()">
            <i class="iconsminds-reload-2" /> Reload</b-button
          >
        </span>
      </template>
    </b-colxx>
  </b-row>
</template>

<script>
import axios from "axios";
import { apiUrl } from "../../../constants/config";
import ListPageHeading from "../../../containers/pages/ListPageHeading";
import ListPageListing from "../../..//containers/pages/ListPageListing";
import { mapGetters } from "vuex";
export default {
  name: "PropertiesListing",
  components: {
    "list-page-heading": ListPageHeading,
    "list-page-listing": ListPageListing,
  },
  data() {
    return {
      isLoad: false,
      displayMode: "list",
      sort: {
        column: "title",
        label: "Title",
      },
      page: 1,
      perPage: 10,
      search: "",
      from: 0,
      to: 0,
      total: 0,
      lastPage: 0,
      items: [],
      paginatedItems: [],
      selectedItems: [],
      requireReload: false,
      totalRows: 0,
    };
  },
  methods: {
    async getPropertiesData() {
      var _ = require("lodash");
      this.isLoad = false;

      var user = this.currentUser;

      await axios
        .get(apiUrl + "property", this.config)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            let propLst = _.sortBy(res.data, this.sort.column);
            console.log(propLst);
            console.log(user);
            if (user.roles !== "SuperAdmin" && "Guest") {
              this.items = propLst.filter(function (value, index, arr) {
                return value.agencyId === user.agencyId;
              });
            } else if (user.roles === "SuperAdmin") {
              this.items = propLst;
            }
            this.total = this.items.length;
            this.$store.dispatch("setProperties", this.items);
            this.selectedItems = [];
            this.$notify(
              "Success",
              "Request made: Get all properties data!",
              "Result: Data fetched successfully.",
              {
                permanent: false,
                duration: 5000,
                type: "success",
              }
            );
            this.paginate(this.perPage, 0);
            this.requireReload = false;
            this.isLoad = true;
          } else {
            this.isLoad = false;
            this.requireReload = true;
            this.$notify(
              "Error",
              "Request made: Get all properties data!",
              "Result: Data could not be fetched. Response sent: " + error.status === 401
                ? "Access denied!"
                : "Unexpected server error! Please try later.",
              {
                permanent: false,
                duration: 5000,
                type: "error",
              }
            );
          }
        })
        .catch((err) => {
          this.$notify(
            "Error",
            "Endpoint: Get all properties data",
            "Result: " + err.status === 401
              ? "Access denied!"
              : "Unexpected server error! Please try later.",
            {
              permanent: false,
              duration: 5000,
              type: "error",
            }
          );
          this.isLoad = false;
          this.requireReload = true;
          console.log("error :", err);
        });
    },
    async loadItems() {
      var _ = require("lodash");
      this.isLoad = false;

      await axios
        .get(apiUrl + "property", this.config)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            let propLst = _.sortBy(res.data, this.sort.column);
            this.items = propLst;
            console.log(this.items);
            this.total = this.items.length;
            this.$store.dispatch("setProperties", this.items);
            this.selectedItems = [];
            this.paginate(this.perPage, 0);
            this.requireReload = false;
            this.isLoad = true;
          } else {
            this.isLoad = false;
            this.requireReload = true;
            this.$notify(
              "Error",
              "Endpoint: Get all properties data",
              "Result: " + res.status == 401
                ? "Access denied!"
                : "Unexpected server error! Please try later.",
              {
                permanent: false,
                duration: 5000,
                type: "error",
              }
            );
          }
        })
        .catch((err) => {
          this.$notify(
            "Error",
            "Endpoint: Get all properties data",
            "Result: " + err == 401
              ? "Access denied!"
              : "Unexpected server error! Please try later.",
            {
              permanent: false,
              duration: 5000,
              type: "error",
            }
          );
          this.isLoad = false;
          this.requireReload = true;
          console.log("error :", err);
        });
    },
    async paginate(page_size, page_number) {
      let itemsToParse = this.items;
      this.paginatedItems = itemsToParse.slice(
        page_number * page_size,
        (page_number + 1) * page_size
      );
      let data = {
        properties: this.paginatedItems,
        currentPage: this.page,
      };
      this.from = 1;
      if (this.total % 10 === 0) {
        this.to = 10;
      } else {
        this.to = this.total % 10;
      }
      this.$store.dispatch("onPaginationChange", data);
    },
    onPageChanged(page) {
      this.paginate(this.perPage, page - 1);
    },
    changeDisplayMode(displayType) {
      this.displayMode = displayType;
    },
    // changePageSize(perPage) {
    //   this.page = 1;
    //   this.perPage = perPage;
    // },
    changeOrderBy(sort) {
      this.sort = sort;
      let list = _.sortBy(this.items.ignoreCase, sort.column);
      console.log(list);
      this.paginate(this.perPage, this.page - 1);
    },
    searchChange(val) {
      this.search = val;
      if (!!this.search) {
        this.isLoad = false;
        const found = this.items.filter(({ title }) => this.search === title);
        if (found.length === 0) {
          this.isLoad = true;
          this.$notify(
            "Error",
            "Endpoint: Search for property(s)",
            "Result: '" + this.search + "' property name does not exist.",
            {
              permanent: false,
              duration: 5000,
              type: "error",
            }
          );
        } else {
          this.isLoad = true;
          let page_number = this.perPage;
          let page_size = 0;
          this.paginatedItems = found.slice(
            page_number * page_size,
            (page_number + 1) * page_size
          );
          let data = {
            properties: found,
            currentPage: this.page,
          };
          this.$store.dispatch("onSearch", data);
        }
      } else {
        this.getPropertiesData();
      }
    },

    selectAll(isToggle) {
      if (this.selectedItems.length >= this.items.length) {
        if (isToggle) this.selectedItems = [];
      } else {
        this.selectedItems = this.items.map((x) => x.id);
      }
    },
    keymap(event) {
      switch (event.srcKey) {
        case "select":
          this.selectAll(false);
          break;
        case "undo":
          this.selectedItems = [];
          break;
      }
    },
    getIndex(value, arr, prop) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i][prop] === value) {
          return i;
        }
      }
      return -1;
    },
    toggleItem(event, itemId) {
      if (event.shiftKey && this.selectedItems.length > 0) {
        let itemsForToggle = this.items;
        var start = this.getIndex(itemId, itemsForToggle, "id");
        var end = this.getIndex(
          this.selectedItems[this.selectedItems.length - 1],
          itemsForToggle,
          "id"
        );
        itemsForToggle = itemsForToggle.slice(
          Math.min(start, end),
          Math.max(start, end) + 1
        );
        this.selectedItems.push(
          ...itemsForToggle.map((item) => {
            return item.id;
          })
        );
      } else {
        if (this.selectedItems.includes(itemId)) {
          this.selectedItems = this.selectedItems.filter((x) => x !== itemId);
        } else this.selectedItems.push(itemId);
      }
    },
    handleContextMenu(vnode) {
      if (!this.selectedItems.includes(vnode.key)) {
        this.selectedItems = [vnode.key];
      }
    },
    onContextMenuAction(action) {
      console.log("context menu item clicked - " + action + ": ", this.selectedItems);
      if (action === "delete") {
        this.$root.$emit("bv::show::modal", "deletePropertyModal");
      } else if (action === "edit") {
        if (this.selectedItems.length === 1) {
          this.$root.$emit("bv::show::modal", "modalEditProp");
        } else if (this.selectedItems.length === 0) {
          this.$notify("Error", "Select an item on right click to edit", "400", {
            type: "error",
            duration: 5000,
            permanent: false,
          });
        } else if (this.selectedItems.length > 1) {
          this.$notify("Error", "", "400", {
            type: "error",
            duration: 5000,
            permanent: false,
          });
          this.selectedItems = [];
        }
      } else if (action === "cancel") {
        this.selectedItems = [];
      }
    },
    changePage(pageNum) {
      this.page = pageNum;
    },
  },
  computed: {
    ...mapGetters(["currentUser", "config"]),
    isSelectedAll() {
      return this.selectedItems.length >= this.items.length;
    },
    isAnyItemSelected() {
      return (
        this.selectedItems.length > 0 && this.selectedItems.length < this.items.length
      );
    },
  },
  watch: {
    // search() {
    //   this.page = 1;
    // },
    apiUrl() {
      this.loadItems();
    },
    isLoad() {
      this.isLoad = true;
    },
  },
  mounted() {
    this.getPropertiesData();
  },
};
</script>
