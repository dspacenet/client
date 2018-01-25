export default ({store, $axios}) => {
  $axios.setToken(store.state.token, 'Bearer')
}
