/**
 * 用于远程加载配置数据
 */
import { PRELOADED } from './setting-options'

export default {

  preload(settings) {
    if (PRELOADED.get(settings)) {
      // 进行预加载信息
      PRELOADED.set(settings, true)
    }
  }

}