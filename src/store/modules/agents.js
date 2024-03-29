import axios from "axios";
import { apiUrl } from "../../constants/config";
import { UserRole } from "../../utils/auth.roles";
// import {store} from "src/store/index.js";
const state = {
  agentsList: [],
  processingAgent: false,
  responseAG: {},
};

const getters = {
  agentsList: (state) => state.agentsList,
  processingAgent: (state) => state.processingAgent,
  responseAG: (state) => state.responseAG,
};

const mutations = {
  setAllAgents(state, payload) {
    state.agentsList = payload;
    state.processingAgent = false;
  },
  createAgent(state, payload) {
    state.agentsList = [...state.agentsList, payload];
    state.processingAgent = false;
  },
  deleteAgent(state, payload) {
    state.agentsList = state.agentsList.splice(payload, 1);
    state.processingAgent = false;
  },
  updateAgent(state, payload) {
    state.agentsList[payload.index] = {
      email: payload.data.email,
      firstName: payload.data.firstName,
      lastName: payload.data.lastName,
      userName: payload.data.userName,
      description: payload.data.description,
      contact: payload.data.contact,
      status: payload.data.status,
      roles: payload.data.roles,
    };
    state.processingAgent = false;
  },
  setProcessingAgent(state, payload) {
    state.processingAgent = payload;
  },
  setResponseAG(state, payload) {
    state.responseAG = payload;
    console.log(state.responseAG);
    state.processingAgent = false;
  },
  clearState(state) {
    state.agentsList = [];
    state.processingAgent = false;
    state.responseAG = {};
  }
};

const actions = {
  async setCompanyAgents({ commit }, {config, user}) {
    commit("setProcessingAgent", true);
    var _ = require("lodash");
    await axios.get(apiUrl + "users/findallUsers", config).then((res) => {
      if (res.status == 200) {
        if (user.role == UserRole.SuperAdmin) {
          let data = _.sortBy(res.data, "agencyId")
          commit("setAllAgents", data);
        } else if (user.role == UserRole.Admin) {
          let ls = [];
          res.data.forEach((element) => {
            if (element.agencyId == user.agencyId) {
              ls.push(element);
            }
          });
          commit("setAllAgents", ls);
        }
      }
    });
  },
  async createAgent({ commit }, {payload, config}) {
    commit("setProcessingAgent", true);
    await axios
      .post(apiUrl + 'users/signup/'+payload.agencyID, payload.user, config)
      .then((res) => {
        if (res.status == 201) {
          commit("setProcessingAgent", false);
          commit("createAgent", payload.user);
          commit("setResponseAG", res);
        } else {
          commit("setResponseAG", res);
        }
      })
      .catch((err) => {
        console.log(err);
        commit("setResponseAG", err);
      });
  },
  async deleteAgent({ commit }, {payload, config}) {
    commit("setProcessingAgent", true);
    await axios
      .delete(apiUrl + "users/deleteUser/" + payload.data.id, config)
      .then((res) => {
        if (res.status == 200) {
          commit("setProcessingAgent", false);
          commit("deleteAgent", payload.index);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  async updateAgent({ commit }, {payload, config}) {
    commit("setProcessingAgent", true);
    let id = payload.userId;
    await axios
      .patch(apiUrl + "users/updateUser/" + id, payload.data, config)
      .then((res) => {
        if (res.status == 200) {
          commit("setProcessingAgent", false);
          commit("updateAgent", payload);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  setResetAt({commit}) {
    commit("clearState");
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};
