import E from '@/lib/Exception';
export { Exception } from '@/lib/Exception';

const EX = {

    // APP异常
    APP_REQUEST_FAILED: E(-1, '请求失败'),

    // API异常
    SYSTEM_EXCEPTION: E(-1000, '服务器异常'),
    SYSTEM_REQUEST_VALIDATION_ERROR: E(-1001, '数据错误'),
    SYSTEM_NOT_ROUTE_MATCHING: E(-1002, '请求不支持'),
    API_TOKEN_INVALID: E(-2000, '登录已失效'),
    API_WXAPP_GET_SESSION_FAILED: E(-2001, '登录失败，请重试'),
    API_PARAMS_INVALID: E(-2002, '数据错误'),
    API_TOKEN_EXPIRED: E(-2003, '登录已失效'),
    API_USER_NOT_FOUND: E(-2004, '登录失败，请重试'),
    API_PERMISSION_DENIED: E(-2005, '无权限访问'),
    API_ROLE_NOT_FOUND: E(-2006, '登录失败，请重试'),
    API_MESSAGES_LENGTH_EXCEED_LIMIT: E(-2007, '消息长度超出限制'),
    API_RESOURCE_PLAN_REMAING_QUOTA_NOT_ENOUGH: E(-2008, '资源计划剩余配额不足'),
    API_CONVERSATION_MESSAGE_UNSUPPORTED: E(-2009, '对话消息类型不支持'),
    API_CONVERSATION_AUDIO_FETCH_FAILED: E(-2010, '对话音频拉取失败'),
    API_CONVERSATION_AUDIO_NOT_CONTAINING_TEXT: E(-2011, '对话音频不包含文本'),
    API_ORDER_PAYMENT_CHANNEL_UNSUPPORTED: E(-2012, '不支持的订单支付渠道'),
    API_ORDER_PAYMENT_ORDER_CREATE_FAILED: E(-2013, '支付订单创建失败'),
    API_RESOURCE_PLAN_NOT_FOUND: E(-2014, '资源计划不存在'),
    API_ORDER_NOT_FOUND: E(-2015, '订单不存在'),
    API_ORDER_PAYER_MISMATCHING: E(-2016, '订单支付用户不匹配'),
    API_ORDER_PAYMENT_ORDER_QUERY_FAILED: E(-2017, '支付订单查询失败'),
    API_VIP_PLAN_NOT_FOUND: E(-2018, 'VIP计划不存在'),
    API_SYSTEM_UPLOAD_OBJECT_TYPE_UNSUPPORTED: E(-2019, '不支持的上传对象类型'),
    API_CONVERSATION_NOT_FOUND: E(-2020, '对话不存在'),
    API_CONVERSATION_FROM_USER_MISMATCH: E(-2021, '对话发起用户不匹配'),
    API_CONVERSATION_LESSON_NOT_FOUND: E(-2022, '对话课程不存在'),
    API_CONVERSATION_LESSON_CONVERSATION_LIST_EMPTY: E(-2023, '对话课程对话列表为空'),
    API_USER_SUBSCRIPTION_VIP_PLAN_EXPIRED: E(-2024, '用户订阅的VIP计划已过期'),
    API_USER_SUBSCRIPTION_VIP_PLAN_EXISTS: E(-2025, '用户已存在会员订阅'),
    API_CONVERSATION_TYPE_NOT_UNSUPPORTED: E(-2026, '不支持的对话类型'),
    API_USER_SUBSCRIPTION_VIP_PLAN_DOWNGRADE_NOT_ALLOW: E(-2027, '用户会员订阅不可降级'),
    API_WXAPP_GET_ACCESS_TOKEN_FAILED: E(-2028, '公众号访问令牌获取失败'),
    API_WXAPP_GET_JSAPI_TICKET_FAILED: E(-2029, '公众号JSAPI凭证获取失败'),
    API_USER_SUBSCRIPTION_PLAN_TYPE_UNSUPPORTED: E(-2030, '不支持的用户订阅计划类型'),
    API_CUSTOM_MESSAGE_DATA_SIGNATURE_VERIFICATION_FAILED: E(-2031, '客服消息数据签名校验失败'),
    API_CUSTOM_MESSAGE_DATA_DECRYPT_FAILED: E(-2032, '客服消息数据解密失败'),
    API_CUSTOM_MESSAGE_SEND_FAILED: E(-2033, '客服消息发送失败'),
    API_CONVERSATION_AUDIO_NOT_GIVEN: E(-2034, '对话音频未提供'),
    API_USER_SUBSCRIPTION_VIP_PLAN_NOT_FOUND: E(-2035, '用户未订阅过VIP计划'),
    API_CONVERSATION_ENDED: E(-2036, '对话已完结'),
    API_CONVERSATION_MESSAGE_NOT_FOUND: E(-2037, '对话消息不存在'),
    API_CONVERSATION_CREATE_COUNT_LIMITED: E(-2038, '对话创建个数达到上限'),
    API_ACCOUNT_USERNAME_OR_PASSWORD_INVALID: E(-2039, '用户名或密码错误')
};

export function findException(code: number) {
    for (let key in EX) {
        const exception = (EX as any)[key];
        if (code == exception.code)
            return exception;
    }
    return null;
}

export default EX;