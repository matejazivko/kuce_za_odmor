
import {createStore} from 'vuex'

const store = createStore ({
    state:{
    searchTerm: "",
    user: null,
    userId: null,
    houseId:null,
   
},

mutations: {
    setUser(state, user) {
      state.user = user;
      state.userId = user ? user.uid : null;
    },
    logout(state) {
      state.user = null;
    },
    setAuthenticated(state, status){
      if (status){
      state.user = state.user || {email: 'default@example.com'};
  } else {
    state.user = null;
    }
  },
  setComments(state, comments){
    state.comments = comments;
  }
},
actions:{
  setAuthenticated({commit}, status){
    commit('setAuthenticated', status);
  },
  fetchComments({commit}){
    commit('setComments', fetchedComments);
  }
},
getters: {
    isAuthenticated: (state) => {
       return !!state.userId;
    },
    getUserId(state){
      return state.userId;
    }
  }
});
export default store;