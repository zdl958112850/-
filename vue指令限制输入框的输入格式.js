
import Vue from 'vue'


const trigger = (el, type) => {
    const e = document.createEvent('HTMLEvents')
    e.initEvent(type, true, true)
    el.dispatchEvent(e)
}



/**整数限制 */
function trimInt(input) {
    if (input.value.length === 1) {
        input.value = input.value.replace(/[^1-9]/g, '')
    } else {
        input.value = input.value.replace(/[^\d]/g, '')
    }
}

/**只限制汉字 */
function trimChinese(input) {
    if (input.value.length === 1) {
        input.value = input.value.replace(/[^\u4E00-\u9FA5]/g, '')
    } else {
        input.value = input.value.replace(/[^\u4E00-\u9FA5]/g, '')
    }
}
/**只限制数字和小数点 */
function trimNumDot(input) {
    if (input.value.length === 1) {
        input.value = input.value.replace(/[^\0-9\.]/g, '')
    } else {
        input.value = input.value.replace(/[^\0-9\.]/g, '')
    }
}
/**不能输入特殊字符 */
function trimSpec(input) {
    if (input.value.length === 1) {
        input.value = input.value.replace(/[^u4e00-u9fa5w]/g, '')
    } else {
        input.value = input.value.replace(/[^u4e00-u9fa5w]/g, '')
    }
}
/**只能输入中文和数字 */
function trimChineseNumber(input) {
    if (input.value.length === 1) {
        input.value = input.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9fa5w]/g, '')
    } else {
        input.value = input.value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9fa5w]/g, '')
    }
}

function easyHandle(input, option) {
    input.onkeyup = function (e) {
        option(input);
        trigger(input, 'input')
    }
    input.onblur = function (e) {
        option(input);
        trigger(input, 'input')
    }
}

export default () => {
    // 针对 el-input做的限制，只能输入正整数
    Vue.directive('Int', {
        bind: function (el) {
            const input = el;
            easyHandle(input, trimInt)
        }
    });
    Vue.directive('Chi', {
        bind: function (el) {
            const input = el;
            easyHandle(input, trimChinese)
        }
    });
    Vue.directive('NuD', {
        bind: function (el) {
            const input = el;
            easyHandle(input, trimNumDot)
        }
    });
    Vue.directive('NoS', {
        bind: function (el) {
            const input = el;
            easyHandle(input, trimSpec)
        }
    });
    Vue.directive('ChN', {
        bind: function (el) {
            const input = el;
            easyHandle(input, trimChineseNumber)
        }
    });


}
