import {addFormatToken} from '../format/format';
import {addRegexToken} from '../parse/regex';
import {addParseToken} from "../parse/token";
import {DATE, MONTH, YEAR} from "./constants";
import {hooks} from '../utils/hooks';


// FORMATTING

var start1000days = new Date(1971, 8, 27);

addFormatToken('t', 0, 0, function () {
    const days = this.clone().startOf('day').diff(start1000days, 'days')
    return ('00' + Math.floor(days / 1000)).slice(-2) + '-' + ('000' + days % 1000).slice(-3)
})

// PARSING

addRegexToken('t', /((\d\d-?\d\d\d)|(\d\d\d))/)

addParseToken('t', function (input, array) {
    const dp = input.match(/^((\d\d+-?\d\d\d)|(\d\d\d))$/),
        todayDays = hooks().startOf('day').diff(start1000days, 'days'),
        todayM = Math.floor(todayDays / 1000),
        todayD = todayDays % 1000,
        str5 = dp[2],
        str3 = dp[3],
        days3 = parseInt(str3),
        baseM = (todayD > 800) && (days3 <= 200) ? todayM + 1 : (todayD <= 200) && (days3 > 800) ? todayM - 1 : todayM,
        baseDate = str5 ? hooks(start1000days).add(parseInt(str5.replace('-', '')), 'days') :
            hooks(start1000days).clone().add(baseM * 1000 + parseInt(days3), 'days')

    array[YEAR] = baseDate.get('year');
    array[MONTH] = baseDate.get('month');
    array[DATE] = baseDate.get('date');
});
