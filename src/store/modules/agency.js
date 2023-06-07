import axios from "axios";
import { apiUrl } from "../../constants/config";
// import store from "src/store/index.js";

const state = {
  agenciesList: [],
  processingAgency: false,
};

const getters = {
  agenciesList: (state) => state.agenciesList,
  processingAgency: (state) => state.processingAgency,
};

const mutations = {
  setAllAgency(state, payload) {
    state.agenciesList = payload;
    state.processingAgency = false;
  },
  createAgency(state, payload) {
    state.agenciesList = [...state.agenciesList, payload]
    state.processingAgency = false;
  },
  deleteAgency(state, payload) {
    state.agenciesList = state.agenciesList.splice(payload, 1);
    state.processingAgency = false;
  },
  updateAgency(state, payload) {
    state.agenciesList[payload.index].Address = payload.data;
    state.processingAgency = false;
  },
  setProcessingAgency(state, payload) {
    state.processingAgency = payload;
  },
  clearState(state) {
    state.agenciesList = [];
    state.processingAgency = false;
  }
};

const actions = {
  async setAgencies({ commit }, {config}) {
    commit("setProcessingAgency", true);
    await axios
      .get(apiUrl + "agency/findallAgencies", config)
      .then((res) => {
        if (res.status == 200) {
          commit("setAllAgency", res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async createAgency({commit},{payload, config}) {
    commit("setProcessingAgency", true);
    let name = payload.agencyName
    let pst = Number(payload.postal_code);

    payload.postal_code= pst
    await axios
      .post(apiUrl + "agency/create/"+name,payload,config)
      .then((res) => {
        if (res.status == 200) {
          commit("setProcessingAgency", false);
          commit("createAgency", payload)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async deleteAgency({commit}, {payload, config}) {
    commit("setProcessingAgency", true);
    let id = payload.data.id;
    await axios
      .delete(apiUrl + "agency/"+id,config)
      .then((res) => {
        if (res.status == 200) {
          commit("setProcessingAgency", false);
          commit("deleteAgency", payload.index);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async updateAgency({commit}, {payload, config}) {
    commit("setProcessingAgency", true);
    let id = payload.agencyID;
    await axios
      .patch(apiUrl + "agency/updateAgency/"+id, payload.data, config)
      .then((res) => {
        if (res.status == 200) {
          commit("setProcessingAgency", false);
          commit("updateAgency", payload);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  setResetAg({commit}) {
    commit("clearState");
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};
