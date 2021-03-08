import urlApi from "./urlApi"
import WorkManagement from "./WorkManagement"
import * as orderApi from "./orderApi"


export default {
  ...urlApi,
  ...orderApi,
  ...WorkManagement
}
