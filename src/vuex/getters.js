/**
 * Created by Arthur on 2019/12/26.
 */
const getters = {
  token: state => state.user.token,
  id: state => state.user.id,
  name: state => state.user.name
}
export default getters
