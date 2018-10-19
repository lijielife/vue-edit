/**
 * EventBus 事件监听传递js文件 基于事件的同一个载体对象
 * @version $Id$
 */

import Vue from 'vue'

let EventBus = new Vue()
// $on(事件名,function(){})  $emit(事件名,数据)
export default EventBus
