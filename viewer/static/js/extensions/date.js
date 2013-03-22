/*
Extends the js Date object to add functionality for month name and ordinal
 */

define([
], function(){
    Date.prototype.getMonthName = function(lang) {
        lang = lang && (lang in Date.locale) ? lang : 'en';
        return Date.locale[lang].month_names[this.getMonth()];
    };

    Date.prototype.getMonthNameShort = function(lang) {
        lang = lang && (lang in Date.locale) ? lang : 'en';
        return Date.locale[lang].month_names_short[this.getMonth()];
    };

    Date.locale = {
        en: {
            month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December'],
            month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
                'Sep', 'Oct', 'Nov', 'Dec']
        }
    };

    Date.prototype.getDayOrdinal = function() {
        var s = ["th","st","nd","rd"],
            v = this.getDay() % 100;
        return this.getDay() + (s[(v-20)%10]||s[v]||s[0]);
    }

    return Date;
});