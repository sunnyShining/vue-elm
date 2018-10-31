/**
 * @author sunny
 * @email yanlihui276@163.com
 * @create date 2018-10-31
 * @desc 资源路径
*/

function initHost () {
    if (process.env.NODE_ENV === 'development') {
        return {
            baseUrl: 'https://elm.cangdu.org/',
        };
    } else if (process.env.NODE_ENV === 'production') {
        return {
            baseUrl: 'https://elm.cangdu.org',
        };
    } else {
        return {
            baseUrl: 'https://elm.cangdu.org',
        };
    }
}

export const hosts = initHost();
export default {
    // 获取城市列表
    cities: 'v1/cities',
    // 获取所选城市信息
    getCities: 'v1/cities/',
    // 搜索地址
    pois: 'v1/pois',
    // 根据经纬度详细定位
    getPois: 'v2/pois/',
    // 食品分类列表
    indexEntry: 'v2/index_entry',
    // 获取商铺列表
    restaurants: 'shopping/restaurants',
    // 搜索餐馆
    searchRestaurants: 'v4/restaurants',
    // 获取所有商铺分类列表
    category: 'shopping/v2/restaurant/category',
    // 获取配送方式
    deliveryModes: 'shopping/v1/restaurants/delivery_modes',
    // 商家属性活动列表
    activityAttributes: 'shopping/v1/restaurants/activity_attributes',
    // 餐馆详情
    restaurant: 'shopping/restaurant/',
    // 上传图片
    addimg: 'v1/addimg/',
    // 添加餐馆
    addshop: 'shopping/addshop',
    // 添加食品种类
    addcategory: 'shopping/addcategory',
    // 添加食品
    addfood: 'shopping/addfood',
    // 获取食品列表
    menu: 'shopping/v2/menu',
    // 获取评价信息
    ratings: 'ugc/v2/restaurants/',
    // 获取评价分数
    scores: 'ugc/v2/restaurants/',
    // 获取评价分类
    tags: 'ugc/v2/restaurants/',
    // 加入购物车
    checkout: 'v1/carts/checkout',
    // 获取备注信息
    remarks: 'v1/carts/',
    // 获取收货地址列表
    addresses: 'v1/users/',
    // 获取验证码
    captchas: 'v1/captchas',
    // 获取用户信息
    user: 'v1/user',
    // 登录
    login: 'v2/login',
    // 退出
    signout: 'v2/signout',
    // 修改密码
    changepassword: 'v2/changepassword',
    // 增加收货地址
    addAddresses: 'v1/users/',
    // 删除收货地址
    deleteAddressId: 'v1/users/',
    // 下单
    suborders: 'v1/users/',
    // 订单列表
    ordersList: 'bos/v2/users/',
    // 订单详情
    snapshot: 'bos/v1/users/',
    // 服务中心
    explain: 'v3/profile/explain',
    // 可用红包
    hongbaos: 'promotion/v2/users/',
    // 过期红包
    expiredHongbaos: 'promotion/v2/users/',
    // 兑换红包
    exchange: 'v1/users/',
    // 管理员登录
    adminLogin: 'admin/login',
    // 管理员退出登录
    adminSingout: 'admin/singout',
    // 管理员信息
    adminInfo: 'admin/info',
    // 获取某日API请求量
    apiCount: 'statis/api/',
    // 获取所有API请求量
    allApiCount: 'statis/api/count',
    // 获取某天用户注册量
    userDateCount: 'statis/user/',
    // 获取所有用户注册量
    usersCount: 'v1/users/count',
    // 获取某天订单数量
    orderCount: 'statis/order/',
    // 获取所有订单数量
    bosOrdersCount: 'bos/orders/count',
    // 管理员列表
    adminAll: 'admin/all',
    // 获取管理员数量
    adminCount: 'admin/count',
    // 获取店铺食品种类
    getcategory: 'shopping/getcategory/',
    // 获取餐馆数量
    restaurantsCount: 'shopping/restaurants/count',
    // 更新餐馆
    updateshop: 'shopping/updateshop',
    // 删除餐馆
    deleteRestaurant: 'shopping/restaurant/',
    // 获取食品列表
    foodsList: 'shopping/v2/foods',
    // 获取食品数量
    foodsCount: 'shopping/v2/foods/count',
    // 获取食品种类详情
    menuCategoryId: 'shopping/v2/menu/',
    // 更新食品
    updatefood: 'shopping/v2/updatefood',
    // 删除食品
    deleteFood: 'shopping/v2/food/',
    // 获取用户列表
    usersList: 'v1/users/list',
    // 获取订单列表
    orders: 'bos/orders',
    // 获取地址信息
    addressId: 'v1/addresse/',
    // 获取用户分布信息
    cityCount: 'v1/user/city/count',
    // 获取某天管理员注册量
    statisCount: 'statis/admin/',
};
