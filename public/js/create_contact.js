/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/bx24-api/index.js":
/*!****************************************!*\
  !*** ./node_modules/bx24-api/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appOption: () => (/* binding */ appOption),
/* harmony export */   bind: () => (/* binding */ bind),
/* harmony export */   callBatch: () => (/* binding */ callBatch),
/* harmony export */   callBind: () => (/* binding */ callBind),
/* harmony export */   callMethod: () => (/* binding */ callMethod),
/* harmony export */   callMethodAll: () => (/* binding */ callMethodAll),
/* harmony export */   callMethodAllChunks: () => (/* binding */ callMethodAllChunks),
/* harmony export */   callUnbind: () => (/* binding */ callUnbind),
/* harmony export */   closeApplication: () => (/* binding */ closeApplication),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   fitWindow: () => (/* binding */ fitWindow),
/* harmony export */   getAuth: () => (/* binding */ getAuth),
/* harmony export */   getDomain: () => (/* binding */ getDomain),
/* harmony export */   getLang: () => (/* binding */ getLang),
/* harmony export */   getScrollSize: () => (/* binding */ getScrollSize),
/* harmony export */   im: () => (/* binding */ im),
/* harmony export */   init: () => (/* binding */ init),
/* harmony export */   install: () => (/* binding */ install),
/* harmony export */   installFinish: () => (/* binding */ installFinish),
/* harmony export */   isAdmin: () => (/* binding */ isAdmin),
/* harmony export */   isInit: () => (/* binding */ isInit),
/* harmony export */   isReady: () => (/* binding */ isReady),
/* harmony export */   loadScript: () => (/* binding */ loadScript),
/* harmony export */   openApplication: () => (/* binding */ openApplication),
/* harmony export */   placement: () => (/* binding */ placement),
/* harmony export */   proxy: () => (/* binding */ proxy),
/* harmony export */   proxyContext: () => (/* binding */ proxyContext),
/* harmony export */   ready: () => (/* binding */ ready),
/* harmony export */   refreshAuth: () => (/* binding */ refreshAuth),
/* harmony export */   reloadWindow: () => (/* binding */ reloadWindow),
/* harmony export */   resizeWindow: () => (/* binding */ resizeWindow),
/* harmony export */   scrollParentWindow: () => (/* binding */ scrollParentWindow),
/* harmony export */   selectAccess: () => (/* binding */ selectAccess),
/* harmony export */   selectCRM: () => (/* binding */ selectCRM),
/* harmony export */   selectUser: () => (/* binding */ selectUser),
/* harmony export */   selectUsers: () => (/* binding */ selectUsers),
/* harmony export */   setTitle: () => (/* binding */ setTitle),
/* harmony export */   throwOn: () => (/* binding */ throwOn),
/* harmony export */   unbind: () => (/* binding */ unbind),
/* harmony export */   userOption: () => (/* binding */ userOption)
/* harmony export */ });
/* harmony import */ var _loadscript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loadscript */ "./node_modules/bx24-api/loadscript.js");


const URL_SCRIPT = "//api.bitrix24.com/api/v1/"

let initialized = false
let throwEnable = true

/**
 * Throw mode: Throw an exception when function return result with error
 * @param {Boolean} enable
 * @returns {boolean}
 */
const throwOn = (enable) => throwEnable = !!enable;

/**
 * @param {ajaxResult} result
 * @returns {ajaxResult}
 * @throws ajaxError
 */
const handlerResult = (mainResult) => {
  const results =
            Array.isArray(mainResult) && mainResult
            || mainResult.constructor.name === 'ajaxResult' && [mainResult]
            || Object.values(mainResult)
  for(const result of results) {
    const next = result.next
    result.next = async function() {
      if (this.more())
        return handlerResult(await new Promise(resolve => next.call(this, resolve)))
      else
        return false
    }

    if(throwEnable && !!result.error()) {
      console.error(result.error(), result)
      throw result.error()
    }
  }
  return mainResult
}

const isInit = () => initialized;

if (!window.BX24)
  window.BX24 = {}

function load() {
  return (0,_loadscript__WEBPACK_IMPORTED_MODULE_0__["default"])(URL_SCRIPT)
}

/**
 * Initializing script
 * @returns {Promise<{}>}
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/system/init.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/system/init.php}
 */
async function init() {
  await load()
  initialized = true
  await new Promise(resolve => window.BX24.init(resolve))
}

/**
 * ! Use this function after init() or install()
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/system/installFinish.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/system/installFinish.php}
 * @see init
 * @see install
 * @example With init()
 * init().then(() => {
 *     // ...
 *     installFinish();
 * })
 * @example With install()
 * install().then(() => {
 *     // ...
 *     installFinish();
 * })
 */
function installFinish() {
  window.BX24.installFinish()
}

/**
 * @returns {Promise<installFinish>}
 * @see installFinish
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/system/install.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/system/install.php}
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/system/installFinish.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/system/installFinish.php}
 * @example
 * install().then((done) => {
 *     // Some actions
 *     done();
 * })
 */
async function install() {
  await load()
  await new Promise(resolve => window.BX24.install(resolve))
  return installFinish
}

/**
 * @returns {Promise<Boolean|Object>}
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/system/getAuth.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/system/getAuth.php}
 */
async function getAuth() {
  await init()
  return window.BX24.getAuth()
}

/**
 * @returns {Promise<Boolean|Object>}
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/system/refreshAuth.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/system/refreshAuth.php}
 */
async function refreshAuth() {
  await init()
  return await new Promise(resolve => window.BX24.refreshAuth(resolve))
}

/**
 * @typedef {Object} ajaxResult
 * @property {Function<*>} data the function returning the REST method response as an array, an object or a scalar. Refer to the method descriptions for further information.
 * @property {Function<ajaxError?>} error returns the error description if an error occurred, or false otherwise.
 * @property {Function<Boolean>} more returns true if there is still data to fetch. Applicable to methods that return data.
 * @property {Function<Number>} total returns the total number of data records. Applicable to methods that return data.
 * @property {Function<Promise<ajaxResult|Boolean>>} next requests and returns the next data chunk.
 */

/**
 * @typedef {Object} ajaxError
 * @property {Function} getError
 * @property {Function} getStatus
 * @property {Function<String>} toString
 */

/**
 * @param {String} method
 * @param {Object} [params={}]
 * @returns {Promise<ajaxResult>}
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/rest/callMethod.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/rest/callMethod.php}
 * @throws {ajaxError}
 */
async function callMethod(method, params) {
  await init()
  return handlerResult(await new Promise(resolve => window.BX24.callMethod(method, params, resolve)))
}

/**
 * @param {Array|Object} calls
 * @param {Boolean} [bHaltOnError=false]
 * @returns {Promise<Array<ajaxResult>|Object<ajaxResult>>}
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/rest/callBatch.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/rest/callBatch.php}
 * @throws {ajaxError}
 */
async function callBatch(calls, bHaltOnError) {
  await init()
  return handlerResult(await new Promise(resolve => window.BX24.callBatch(calls, resolve, bHaltOnError)))
}

/**
 * Import Large Data Batches
 * ! Support only methods that have entity "ID", support "filter", "order" and "select"
 * @param {String} method
 * @param {Object} [params={}]
 * @returns {Promise<[Object]>}
 * @see EN Taken on the basis of {@link https://training.bitrix24.com/rest_help/rest_sum/start.php}
 * @see RU Taken on the basis of {@link https://dev.1c-bitrix.ru/rest_help/rest_sum/start.php}
 * @throws {ajaxError}
 */
async function callMethodAll(method, params) {
  await init()
  const callParams = {}
  for (const key in (params || {}))
    callParams[key.toLowerCase()] = params[key]

  callParams.filter = callParams.filter || {}

  if (Array.isArray(callParams.select) && !(callParams.select.includes('ID') || callParams.select().includes('*')))
    callParams.select.push('ID')

  callParams.order = callParams.order || {}
  callParams.order.ID = 'ASC'
  callParams.start = -1
  let ID = 0;
  const globalResult = []
  while (true) {
    callParams.filter['>ID'] = ID
    const result = (await callMethod(method, callParams)).data()
    if (!result.length) break;
    for (const rest of result) {
      ID = rest.ID
      globalResult.push(rest)
    }
  }
  return globalResult
}

/**
 * Load all items from list by ajaxResult.next()
 * @param {String} method
 * @param {Object} [params={}]
 * @returns {Promise<Array<Object>>}
 * @throws {ajaxError}
 */
async function callMethodAllChunks(method, params= {}) {
  let result = await callMethod(method, params)
  const data = result.data()
  while (result.more()) {
    result = await result.next()
    data.push(...result.data())
  }
  return data
}

/**
 * @param {String} event
 * @param {String} handler
 * @param {Number} [auth_type]
 * @returns {Promise<ajaxResult>}
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/rest/bx24.callbind.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/rest/bx24.callbind.php}
 * @throws {ajaxError}
 */
async function callBind(event, handler, auth_type) {
  await init()
  return handlerResult(await new Promise(resolve => window.BX24.callBind(event, handler, auth_type, resolve)))
}

/**
 * @param {String} event
 * @param {String} handler
 * @param {Number} [auth_type]
 * @returns {Promise<ajaxResult>}
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/rest/bx24_callunbind.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/rest/bx24_callunbind.php}
 * @throws {ajaxError}
 */
async function callUnbind(event, handler, auth_type) {
  await init()
  return handlerResult(await new Promise(resolve => window.BX24.callUnbind(event, handler, auth_type, resolve)))
}

const userOption = {
  /**
   * @param {String} name
   * @param {String} value
   * @returns {Promise<void>}
   * @see EN {@link https://training.bitrix24.com/rest_help/js_library/settings/userOption.php}
   * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/settings/userOption.php}
   */
  async set(name, value) {
    await init()
    return window.BX24.userOption.set(name, value)
  },
  /**
   * @param {String} name
   * @returns {Promise<void>}
   * @see EN {@link https://training.bitrix24.com/rest_help/js_library/settings/userOption.php}
   * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/settings/userOption.php}
   */
  async get(name) {
    await init()
    return window.BX24.userOption.get(name)
  }
}

const appOption = {
  /**
   * @param {String} name
   * @param {String} value
   * @returns {Promise<void>}
   * @see EN {@link https://training.bitrix24.com/rest_help/js_library/settings/appOption.php}
   * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/settings/appOption.php}
   */
  async set(name, value) {
    if (!(await isAdmin())) throw "User is not admin"
    return await new Promise(resolve => window.BX24.appOption.set(name, value, resolve))
  },
  /**
   * @param {String} name
   * @returns {Promise<void>}
   * @see EN {@link https://training.bitrix24.com/rest_help/js_library/settings/appOption.php}
   * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/settings/appOption.php}
   */
  async get(name) {
    await init()
    return window.BX24.appOption.get(name)
  }
}

/**
 * @typedef {Object} Entity
 * @property {Number} id - ID
 * @property {String} name - Name
 */

/**
 * @returns {Promise<Entity>} User
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/dialog/selectUser.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/dialog/selectUser.php}
 */
async function selectUser() {
  await init()
  return await new Promise(resolve => window.BX24.selectUser(resolve))
}

/**
 * @returns {Promise<[Entity]>} Users
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/dialog/selectUsers.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/dialog/selectUsers.php}
 */
async function selectUsers() {
  await init()
  return await new Promise(resolve => window.BX24.selectUsers(resolve))
}

/**
 * @param {Array} [value=[]]
 * @returns {Promise<[Entity]>} Accesses
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/dialog/selectAccess.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/dialog/selectAccess.php}
 */
async function selectAccess(value) {
  await init()
  return await new Promise(resolve => window.BX24.selectAccess(value || [], resolve))
}

/**
 * @param {Object} params
 * @param {Array<String>} params.entityType
 * @param {Boolean} params.multiple
 * @param {Array|Object} params.value
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/dialog/selectCRM.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/dialog/selectCRM.php}
 */
async function selectCRM(params) {
  await init()
  return await new Promise(resolve => window.BX24.selectCRM(params, resolve))
}

/**
 * @returns {Promise<Boolean>}
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/additional/isAdmin.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/additional/isAdmin.php}
 */
async function isAdmin() {
  await init()
  return window.BX24.isAdmin()
}

/**
 * @returns {Promise<String>}
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/additional/getLang.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/additional/getLang.php}
 */
async function getLang() {
  await init()
  return window.BX24.getLang()
}

/**
 * @param {Number} width
 * @param {Number} height
 * @returns {Promise<*>}
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/additional/resizeWindow.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/additional/resizeWindow.php}
 */
async function resizeWindow(width, height) {
  await init()
  return await new Promise(resolve => window.BX24.resizeWindow(width, height, resolve))
}

/**
 * @returns {Promise<*>}
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/additional/fitWindow.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/additional/fitWindow.php}
 */
async function fitWindow() {
  await init()
  return await new Promise(resolve => window.BX24.fitWindow(resolve))
}

/**
 * @returns {Promise<*>}
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/additional/reloadWindow.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/additional/reloadWindow.php}
 */
async function reloadWindow() {
  await init()
  return await new Promise(resolve => window.BX24.reloadWindow(resolve))
}

/**
 * @param {String} title
 * @returns {Promise<*>}
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/additional/setTitle.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/additional/setTitle.php}
 */
async function setTitle(title) {
  await init()
  return await new Promise(resolve => window.BX24.setTitle(title, resolve))
}

/**
 * @returns {Promise<void>}
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/additional/ready.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/additional/ready.php}
 */
async function ready() {
  await init()
  await new Promise(resolve => window.BX24.ready(resolve))
}

/**
 * @returns {Promise<Boolean>}
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/additional/isReady.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/additional/isReady.php}
 */
async function isReady() {
  await init()
  return window.BX24.isReady()
}

/**
 * @param {Function} func
 * @param {Object} thisObject
 * @returns {Promise<Function>}
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/additional/proxy.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/additional/proxy.php}
 */
async function proxy(func, thisObject) {
  await init()
  return window.BX24.proxy(func, thisObject)
}

/**
 * @returns {Promise<*>}
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/additional/closeapplication.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/additional/closeapplication.php}
 */
async function closeApplication() {
  await init()
  await new Promise(resolve => window.BX24.closeApplication(resolve))
}

/**
 * @returns {Promise<*>}
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/additional/getDomain.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/additional/getDomain.php}
 */
async function getDomain() {
  await init()
  return window.BX24.getDomain()
}

/**
 * @param {Object} [parameters={}]
 * @returns {Promise<*>} resolve when app will be closed
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/additional/openApplication.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/additional/openApplication.php}
 */
async function openApplication(parameters) {
  await init()
  await new Promise(resolve => window.BX24.openApplication(parameters || {}, resolve))
}

/**
 * @returns {Promise<Object>}
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/additional/proxyContext.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/additional/proxyContext.php}
 */
async function proxyContext() {
  await init()
  return window.BX24.proxyContext()
}

/**
 * @param {Number} scroll
 * @returns {Promise<*>} resolve when app will be closed
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/additional/scrollparentwindow.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/additional/scrollparentwindow.php}
 */
async function scrollParentWindow(scroll) {
  await init()
  await new Promise(resolve => window.BX24.scrollParentWindow(scroll, resolve))
}

/**
 * @param {DOMNode} element
 * @param {String} eventName
 * @param {Function} func
 * @returns {Promise<Object>}
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/additional/bind.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/additional/bind.php}
 */
async function bind(element, eventName, func) {
  await init()
  return window.BX24.bind(element, eventName, func)
}

/**
 * @param {DOMNode} element
 * @param {String} eventName
 * @param {Function} func
 * @returns {Promise<Object>}
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/additional/unbind.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/additional/unbind.php}
 */
async function unbind(element, eventName, func) {
  await init()
  return window.BX24.unbind(element, eventName, func)
}

/**
 * @returns {Promise<Object>}
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/additional/getScrollSize.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/additional/getScrollSize.php}
 */
async function getScrollSize() {
  await init()
  return window.BX24.getScrollSize()
}

/**
 * @param {Array|String} script
 * @returns {Promise<*>} resolve when app will be closed
 * @see EN {@link https://training.bitrix24.com/rest_help/js_library/additional/loadScript.php}
 * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/additional/loadScript.php}
 */
async function loadScript(script) {
  await init()
  await new Promise(resolve => window.BX24.loadScript(script, resolve))
}

const im = {
  /**
   * @param userId
   * @param {Boolean} [video=true]
   * @returns {Promise<void>}
   * @see EN {@link https://training.bitrix24.com/rest_help/js_library/additional/im_callTo.php}
   * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/additional/im_callTo.php}
   */
  async callTo(userId, video) {
    await init()
    return window.BX24.im.callTo(userId, video)
  },
  /**
   * @param {String} number
   * @returns {Promise<void>}
   * @see EN {@link https://training.bitrix24.com/rest_help/js_library/additional/im_phoneTo.php}
   * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/additional/im_phoneTo.php}
   */
  async phoneTo(number) {
    await init()
    return window.BX24.im.phoneTo(number)
  },
  /**
   * @param {String} dialogId
   * @returns {Promise<void>}
   * @see EN {@link https://training.bitrix24.com/rest_help/js_library/additional/im_openMessenger.php}
   * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/additional/im_openMessenger.php}
   */
  async openMessenger(dialogId) {
    await init()
    return window.BX24.im.openMessenger(dialogId)
  },
  /**
   * @param {String} dialogId
   * @returns {Promise<void>}
   * @see EN {@link https://training.bitrix24.com/rest_help/js_library/additional/im_openHistory.php}
   * @see RU {@link https://dev.1c-bitrix.ru/rest_help/js_library/additional/im_openHistory.php}
   */
  async openHistory(dialogId) {
    await init()
    return window.BX24.im.openHistory(dialogId)
  }
}

const placement = {
  /**
   * @returns {Promise<Object>}
   * @see EN {@link https://training.bitrix24.com/rest_help/application_embedding/application_embedding/placement_info.php}
   * @see RU {@link https://dev.1c-bitrix.ru/rest_help/application_embedding/application_embedding/placement_info.php}
   * @see EN {@link https://training.bitrix24.com/rest_help/application_embedding/application_embedding/index.php}
   * @see RU {@link https://dev.1c-bitrix.ru/rest_help/application_embedding/application_embedding/index.php}
   */
  async info() {
    await init()
    return window.BX24.placement.info()
  },
  /**
   * @returns {Promise<*>}
   * @see EN {@link https://training.bitrix24.com/rest_help/application_embedding/application_embedding/index.php}
   * @see RU {@link https://dev.1c-bitrix.ru/rest_help/application_embedding/application_embedding/index.php}
   */
  async getInterface() {
    await init()
    await new Promise(resolve => window.BX24.placement.getInterface(resolve))
  },
  /**
   * @param {String} command
   * @param {Object} [parameters={}]
   * @returns {Promise<*>}
   * @see EN {@link https://training.bitrix24.com/rest_help/application_embedding/application_embedding/index.php}
   * @see RU {@link https://dev.1c-bitrix.ru/rest_help/application_embedding/application_embedding/index.php}
   */
  async call(command, parameters) {
    await init()
    await new Promise(resolve => window.BX24.placement.call(command, parameters || {}, resolve))
  },
  /**
   * @param {String} event
   * @returns {Promise<*>}
   * @see EN {@link https://training.bitrix24.com/rest_help/application_embedding/application_embedding/index.php}
   * @see RU {@link https://dev.1c-bitrix.ru/rest_help/application_embedding/application_embedding/index.php}
   */
  async bindEvent(event) {
    await init()
    await new Promise(resolve => window.BX24.placement.bindEvent(event, resolve))
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  isInit,
  init,
  install,
  installFinish,
  getAuth,
  refreshAuth,
  callMethod,
  callBatch,
  callMethodAll,
  callMethodAllChunks,
  callBind,
  callUnbind,
  userOption,
  appOption,
  selectUser,
  selectUsers,
  selectAccess,
  selectCRM,
  isAdmin,
  getLang,
  resizeWindow,
  fitWindow,
  reloadWindow,
  setTitle,
  ready,
  isReady,
  proxy,
  closeApplication,
  getDomain,
  openApplication,
  proxyContext,
  scrollParentWindow,
  bind,
  unbind,
  getScrollSize,
  loadScript,
  im,
  placement
});


/***/ }),

/***/ "./node_modules/bx24-api/loadscript.js":
/*!*********************************************!*\
  !*** ./node_modules/bx24-api/loadscript.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Take from https://github.com/tserkov/vue-plugin-load-script/blob/master/index.js

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(src) {
    return new Promise(function (resolve, reject) {
        let shouldAppend = false;
        let el = document.querySelector('script[src="' + src + '"]');
        if (!el) {
            el = document.createElement('script');
            el.type = 'text/javascript';
            el.async = true;
            el.src = src;
            shouldAppend = true;
        }
        else if (el.hasAttribute('data-loaded')) {
            resolve(el);
            return;
        }

        el.addEventListener('error', reject);
        el.addEventListener('abort', reject);
        el.addEventListener('load', function loadScriptHandler() {
            el.setAttribute('data-loaded', true);
            resolve(el);
        });

        if (shouldAppend) document.head.appendChild(el);
    });
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!****************************************!*\
  !*** ./resources/js/create_contact.js ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var bx24_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bx24-api */ "./node_modules/bx24-api/index.js");

bx24_api__WEBPACK_IMPORTED_MODULE_0__["default"].callMethod('crm.contacts.list').then(function (data) {
  console.log(data);
});
/******/ })()
;