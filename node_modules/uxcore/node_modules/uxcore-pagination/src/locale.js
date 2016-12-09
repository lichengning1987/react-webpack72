let locale = {
    "en-us": {
        items_per_page: '/page',
        jump_to: 'Goto',
        page: '',

        // Pagination.js
        item: ' entries',
    },
    "zh-cn": {
        // Options.js
        items_per_page: '条/页',
        jump_to: '跳至',
        page: '页',

        // Pagination.js
        item: '条',
    }
}
locale['en'] = locale['en-us'];

module.exports = locale;