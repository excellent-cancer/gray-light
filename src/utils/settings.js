/**
 * 运行设置对象，初始化禁止在设置对象。考虑到
 * 有些属性只使用一次，提供不同的获取设置的操作
 */
export default class Settings {

  constructor(settings) {
    this.settings = settings
  }

  // Api

  /**
   * 获取设置值
   *
   * @param name 设置名
   * @returns {*} 设置值
   */
  getSetting(name) {
    
    return name != null ? this.settings[name] : null
  }

  /**
   * 获取设置值，若没有这个设置值，返回默认值
   *
   * @param name 设置名
   * @param defaultValue 默认值
   * @returns {*} 设置值
   */
  getSettingOrDefault(name, defaultValue) {
    return name != null && this.settings[name] != null ? this.settings[name]  : defaultValue
  }

  /**
   * 获取设置值，然后删除次设置
   *
   * @param name 设置名
   * @returns {*} 设置值
   */
  takeSetting(name) {
    let setting = this.getSetting(name)
    Reflect.deleteProperty(this.settings, name)
    return setting
  }

  /**
   * 获取设置值，若没有这个设置值，返回默认值，然后删除次设置
   *
   * @param name 设置名
   * @param defaultValue 默认值
   * @returns {*} 设置值
   */
  takeSettingOrDefault(name, defaultValue) {
    let setting = this.takeSetting(name)
    return setting == null ? defaultValue : setting
  }

  // Settings 创建函数

  /**
   * 通过初始化json对象初始化Setting实例
   *
   * @param jsonObj json对象
   * @returns {Settings} Setting实例
   */
  static fromJson(jsonObj) {
    let properties = jsonObj || {}
    let settingsMap = {}

    readSetting("", settingsMap, properties)

    return new Settings(settingsMap)
  }

}

function readSetting(prefix, settingsMap, properties) {
  for (let [name, value] of Object.entries(properties)) {
    if (value != null) {
      if (typeof value != 'object' || value instanceof Array) {
        settingsMap[toPrefix(prefix, name)] = value
      } else {
        readSetting(toPrefix(prefix, name), settingsMap, properties[name])
      }
    }
  }
}

function toPrefix(prefix, next) {
  return prefix === "" ? next : prefix + "." + next
}