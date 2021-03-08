export default {
    mouSetToken: function(state, openid) {
        state.sec_token = openid;
    },
    setLoading: function(state, status) {
        state.loading = status;
    },
    setMenuList: function(state, data) {
        state.menuBar = data;
    },
    setNewsData: function(state, status) {
        state.newsData = status;
    },
    setTitle: function(state, status) {
        state.newTitle = status;
    },
    setLinkData: function(state, status) {
        state.linkData = status;
    },
}