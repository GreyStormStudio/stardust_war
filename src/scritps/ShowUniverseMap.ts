import {Application,Graphics} from 'pixi.js'
import { GenerateMap } from './快捷函数/CreateMap'
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";

//先生成31 * vw的地图并显示
//监听鼠标事件,计算拖动的横向距离,然后重新计算需要显示的部分
//生成需要显示的部分,并拼接地图
//右键该星域显示调查该星域的选项