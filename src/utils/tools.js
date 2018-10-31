/**
 * @author sunny
 * @email yanlihui276@163.com
 * @create date 2018-10-31
 * @desc 工具类函数
*/

/**
 * 将url参数转成对象返回
 * url String url字符串如https://www.baidu.com/s?ie=utf-8
 * name String 如果需要获取参数某个值传入
 * 返回值: 参数对象或者某个参数值
 */

export function paramToObj (url, name) {
    const obj = {};
    let a = document.createElement('a');
    a.href = url;
    const search = a.search;
    a = null;
    if (search.indexOf('?') === 0) {
        const str = search.substr(1);
        const arr = str.split('&');
        arr.forEach((item, i) => {
            const paramArr = item.split('=');
            // 防止编码，把编码也解析出来
            obj[decodeURIComponent(paramArr[0])] = decodeURIComponent(paramArr[1]);
        });
    }
    return name ? obj[name] : obj;
}
/**
 * 精确相乘两个浮点数
 * @param num1 浮点数1
 * @param num2 浮点数2
 * @returns {Number}
 */
export function numMulti (num1, num2) {
    let r = 0;
    try {
        r += num1.toString().split('.')[1].length;
    } catch (e) {
        console.log(e);
    }
    try {
        r += num2.toString().split('.')[1].length;
    } catch (e) {
        console.log(e);
    }
    return (Number(num1.toString().replace('.', '')) * Number(num2.toString().replace('.', ''))) / Math.pow(10, r);
}

/**
 * 精确相加两个浮点数
 * @param num1 浮点数1
 * @param arg2 浮点数2
 * @returns {Number}
 */
export function numAdd (num1, num2) {
    let r1;
    let r2;
    try {
        r1 = num1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = num2.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }
    const m = Math.pow(10, Math.max(r1, r2));
    if (((num1 * m) + (num2 * m)) / m === 0) {
        return ((numMulti(num1, m) + numMulti(num2, m)) / m).toFixed(Math.max(r1, r2));
    } else if (isNaN(((num1 * m) + (num2 * m)) / m)) {
        return '';
    }
    return (numMulti(num1, m) + numMulti(num2, m)) / m;
}
