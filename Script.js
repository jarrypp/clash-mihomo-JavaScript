/**
 * 优化的Clash配置脚本 - 提高读取速度
 * @param {Object} params - The Clash configuration object.
 * @returns {Object} Modified configuration object.
 */

// 预编译常量和配置，避免重复计算
const PROXY_NAME = "代理模式";

// 使用Set来优化查找性能
const DIRECT_DOMAINS = new Set([
    "bing.com", "msn.com", "microsoft.com", "microsoftonline.com",
    "bing.net", "akamaized.net", "office.net", "azureedge.net",
    "nelreports.net", "azure.com", "windows.net", "office365.com", "live.com"
]);

// 预编译正则表达式，避免运行时编译
const REGION_PATTERNS = {
    HK: /香港|HK|Hong|🇭🇰/,
    TW: /台湾|TW|Taiwan|Wan|🇨🇳|🇹🇼/,
    SG: /新加坡|狮城|SG|Singapore|🇸🇬/,
    JP: /日本|JP|Japan|🇯🇵/,
    US: /美国|US|United States|America|🇺🇸/,
    KR: /韩国|韩亚|KOR|KR|Korea|🇰🇷/,
    DE: /德国|DE|Germany|🇩🇪/,
    AI: /^(?!.*(?:剩余|到期|主页|官网|游戏|关注|订阅|CN|中国)).*$/i
};

// 静态配置对象
const CONFIG = Object.freeze({
    customRules: [
        ...Array.from(DIRECT_DOMAINS).map(domain => `DOMAIN-SUFFIX,${domain},DIRECT`),
    ],
    rules: [
        "RULE-SET,reject,广告拦截",
        "RULE-SET,direct,DIRECT",
        "RULE-SET,cncidr,DIRECT",
        "RULE-SET,private,DIRECT",  
        "RULE-SET,lancidr,DIRECT",
        "GEOIP,LAN,DIRECT,no-resolve",
        "GEOIP,CN,DIRECT,no-resolve",
        "RULE-SET,applications,DIRECT",
        `RULE-SET,tld-not-cn,${PROXY_NAME}`,
        `RULE-SET,google,${PROXY_NAME}`,
        `RULE-SET,icloud,${PROXY_NAME}`,
        `RULE-SET,apple,${PROXY_NAME}`,
        `RULE-SET,gfw,${PROXY_NAME}`,
        `RULE-SET,greatfire,${PROXY_NAME}`,
        `RULE-SET,telegramcidr,${PROXY_NAME}`,
        `RULE-SET,proxy,${PROXY_NAME}`,
        "MATCH,漏网之鱼",
    ],
    ruleProviders: {
        reject: { behavior: "domain", fileName: "reject" },
        icloud: { behavior: "domain", fileName: "icloud" },
        apple: { behavior: "domain", fileName: "apple" },
        google: { behavior: "domain", fileName: "google" },
        proxy: { behavior: "domain", fileName: "proxy" },
        direct: { behavior: "domain", fileName: "direct" },
        private: { behavior: "domain", fileName: "private" },
        gfw: { behavior: "domain", fileName: "gfw" },
        greatfire: { behavior: "domain", fileName: "greatfire" },
        "tld-not-cn": { behavior: "domain", fileName: "tld-not-cn" },
        telegramcidr: { behavior: "ipcidr", fileName: "telegramcidr" },
        cncidr: { behavior: "ipcidr", fileName: "cncidr" },
        lancidr: { behavior: "ipcidr", fileName: "lancidr" },
        applications: { behavior: "classical", fileName: "applications" },
    },
    autoProxyGroups: [
        { name: "HK-自动选择", regex: REGION_PATTERNS.HK },
        { name: "TW-自动选择", regex: REGION_PATTERNS.TW },
        { name: "SG-自动选择", regex: REGION_PATTERNS.SG },
        { name: "JP-自动选择", regex: REGION_PATTERNS.JP },
        { name: "US-自动选择", regex: REGION_PATTERNS.US },
        { name: "KR-自动选择", regex: REGION_PATTERNS.KR },
        { name: "DE-自动选择", regex: REGION_PATTERNS.DE },
        { name: "AI-自动选择", regex: REGION_PATTERNS.AI },
    ],
    manualProxyGroups: [
        {
            name: "AI-手工选择",
            regex: REGION_PATTERNS.AI,
            icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/chatgpt.svg",
        },
    ],
    dns: {
        cn: [
            "https://1.12.12.12/dns-query",
            "https://120.53.53.53/dns-query", 
            "https://223.5.5.5/dns-query",
            "https://223.6.6.6/dns-query",
        ],
        trust: [
            "https://1.1.1.1/dns-query",
            "https://1.0.0.1/dns-query",
            "https://77.88.8.8/dns-query",
            "https://77.88.8.1/dns-query",
            "https://94.140.14.14/dns-query",
            "https://94.140.15.15/dns-query",
            "https://208.67.222.222/dns-query",
            "https://208.67.220.220/dns-query",
        ],
    },
    icons: Object.freeze({
        proxy: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg",
        manual: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg",
        auto: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg",
        loadBalanceHash: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg",
        loadBalanceRound: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg",
        chatgpt: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/chatgpt.svg",
        claude: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/claude.svg",
        gemini: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg",
        fish: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg",
        block: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/block.svg",
    }),
    geoxUrls: Object.freeze({
        geoip: "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip-lite.dat",
        geosite: "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat", 
        mmdb: "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country-lite.mmdb",
    }),
});

// 预构建基础配置模板
const BASE_DNS_CONFIG = Object.freeze({
    enable: true,
    "prefer-h3": true,
    "default-nameserver": CONFIG.dns.cn,
    nameserver: CONFIG.dns.trust,
    "nameserver-policy": {
        "geosite:cn": CONFIG.dns.cn,
        "geosite:geolocation-!cn": CONFIG.dns.trust,
    },
    fallback: CONFIG.dns.trust,
    "fallback-filter": {
        geoip: true,
        "geoip-code": "CN",
        geosite: ["gfw"],
        ipcidr: ["240.0.0.0/4"],
        domain: ["+.google.com", "+.facebook.com", "+.youtube.com"],
    },
});

const OTHER_OPTIONS = Object.freeze({
    "unified-delay": true,
    "tcp-concurrent": true,
    profile: {
        "store-selected": true,
        "store-fake-ip": true,
    },
    sniffer: {
        enable: true,
        sniff: {
            TLS: { ports: [443, 8443] },
            HTTP: { ports: [80, "8080-8880"], "override-destination": true },
        },
    },
    "geodata-mode": true,
});

// 缓存加速URL映射
const ACCEL_URLS = Object.freeze(
    Object.fromEntries(
        Object.entries(CONFIG.geoxUrls).map(([key, url]) => [
            key,
            `https://fastgh.lainbo.com/${url}`,
        ])
    )
);

/**
 * 快速创建规则提供者配置
 */
const createRuleProvider = (behavior, fileName) => ({
    type: "http",
    behavior,
    url: `https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/${fileName}.txt`,
    path: `./ruleset/${fileName}.yaml`,
    interval: 86400,
    lazy: true,
});

/**
 * 优化的代理过滤函数 - 使用缓存和更高效的过滤
 */
function getProxiesByRegex(proxies, regex, fallback = ["手动选择"]) {
    if (!proxies?.length) return fallback;
    
    const matched = [];
    for (let i = 0; i < proxies.length; i++) {
        if (regex.test(proxies[i].name)) {
            matched.push(proxies[i].name);
        }
    }
    return matched.length > 0 ? matched : fallback;
}

/**
 * 批量处理规则和规则提供者
 */
function overwriteRules(params, extraCustomRules = []) {
    // 预先计算规则数组长度，避免动态扩容
    const totalRulesCount = CONFIG.customRules.length + extraCustomRules.length + CONFIG.rules.length;
    const rules = new Array(totalRulesCount);
    
    let index = 0;
    // 批量复制而不是使用展开运算符
    for (let i = 0; i < CONFIG.customRules.length; i++) {
        rules[index++] = CONFIG.customRules[i];
    }
    for (let i = 0; i < extraCustomRules.length; i++) {
        rules[index++] = extraCustomRules[i];
    }
    for (let i = 0; i < CONFIG.rules.length; i++) {
        rules[index++] = CONFIG.rules[i];
    }
    
    params.rules = rules;
    
    // 优化规则提供者创建
    const ruleProviders = {};
    const entries = Object.entries(CONFIG.ruleProviders);
    for (let i = 0; i < entries.length; i++) {
        const [name, { behavior, fileName }] = entries[i];
        ruleProviders[name] = createRuleProvider(behavior, fileName);
    }
    params["rule-providers"] = ruleProviders;
}

/**
 * 优化的代理组生成
 */
function overwriteProxyGroups(params) {
    const allProxies = params.proxies.map(e => e.name);
    
    // 并行处理自动代理组，减少遍历次数
    const autoProxyGroups = [];
    const manualProxyGroups = [];
    
    for (let i = 0; i < CONFIG.autoProxyGroups.length; i++) {
        const item = CONFIG.autoProxyGroups[i];
        const proxies = getProxiesByRegex(params.proxies, item.regex);
        if (proxies.length > 0) {
            autoProxyGroups.push({
                name: item.name,
                type: "url-test",
                url: "http://www.gstatic.com/generate_204",
                interval: 300,
                tolerance: 50,
                proxies,
                hidden: true,
            });
        }
    }
    
    for (let i = 0; i < CONFIG.manualProxyGroups.length; i++) {
        const item = CONFIG.manualProxyGroups[i];
        const proxies = getProxiesByRegex(params.proxies, item.regex, ["DIRECT", "手动选择", PROXY_NAME]);
        if (proxies.length > 0) {
            manualProxyGroups.push({
                name: item.name,
                type: "select",
                proxies,
                icon: item.icon,
                hidden: false,
            });
        }
    }

    // 预构建固定代理组
    const fixedGroups = [
        {
            name: PROXY_NAME,
            type: "select",
            url: "http://www.gstatic.com/generate_204",
            icon: CONFIG.icons.proxy,
            proxies: ["自动选择", "手动选择", "负载均衡(散列)", "负载均衡(轮询)", "DIRECT"],
        },
        {
            name: "手动选择",
            type: "select",
            icon: CONFIG.icons.manual,
            proxies: allProxies,
        },
        {
            name: "自动选择", 
            type: "select",
            icon: CONFIG.icons.auto,
            proxies: ["ALL-自动选择", ...autoProxyGroups.map(g => g.name)],
        },
        {
            name: "负载均衡(散列)",
            type: "load-balance",
            url: "http://www.gstatic.com/generate_204",
            icon: CONFIG.icons.loadBalanceHash,
            interval: 300,
            "max-failed-times": 3,
            strategy: "consistent-hashing",
            lazy: true,
            proxies: allProxies,
        },
        {
            name: "负载均衡(轮询)",
            type: "load-balance", 
            url: "http://www.gstatic.com/generate_204",
            icon: CONFIG.icons.loadBalanceRound,
            interval: 300,
            "max-failed-times": 3,
            strategy: "round-robin",
            lazy: true,
            proxies: allProxies,
        },
        {
            name: "ALL-自动选择",
            type: "url-test",
            url: "http://www.gstatic.com/generate_204", 
            interval: 300,
            tolerance: 50,
            proxies: allProxies,
            hidden: true,
        },
        {
            name: "ChatGPT",
            type: "select",
            proxies: ["AI-自动选择", PROXY_NAME, "AI-手工选择"],
            icon: CONFIG.icons.chatgpt,
        },
        {
            name: "Claude",
            type: "select", 
            proxies: ["AI-自动选择", PROXY_NAME, "AI-手工选择"],
            icon: CONFIG.icons.claude,
        },
        {
            name: "Gemini",
            type: "select",
            proxies: ["AI-自动选择", PROXY_NAME, "AI-手工选择"],
            icon: CONFIG.icons.gemini,
        },
        {
            name: "漏网之鱼",
            type: "select",
            proxies: ["DIRECT", PROXY_NAME],
            icon: CONFIG.icons.fish,
        },
        {
            name: "广告拦截",
            type: "select", 
            proxies: ["REJECT", "DIRECT", PROXY_NAME],
            icon: CONFIG.icons.block,
        },
    ];

    params["proxy-groups"] = [
        ...fixedGroups,
        ...autoProxyGroups,
        ...manualProxyGroups,
    ];
}

/**
 * 优化DNS配置设置
 */
function overwriteDns(params) {
    // 使用预构建的配置对象，减少对象创建
    params.dns = { ...params.dns, ...BASE_DNS_CONFIG };
    
    // 批量设置其他选项
    Object.assign(params, OTHER_OPTIONS, {
        "geox-url": ACCEL_URLS,
    });
}

/**
 * 主函数 - 优化后的版本
 */
function main(params) {
    // 快速验证和早期返回
    if (!params?.proxies?.length) {
        console.warn("No valid proxies provided");
        return params || {};
    }

    overwriteRules(params);
    overwriteProxyGroups(params);
    overwriteDns(params);
    
    return params;
}