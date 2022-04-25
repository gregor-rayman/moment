import { addFormatToken } from '../format/format';
import { addRegexToken } from '../parse/regex';
import { addParseToken } from "../parse/token";
import {DATE, MONTH, YEAR} from "./constants";
import toInt from "../utils/to-int";
import { hooks } from '../utils/hooks';


// FORMATTING

var start1000days = new Date(1971, 8, 27);

addFormatToken('t', 0, 0, function() {
    const days = this.clone().startOf('day').diff(start1000days, 'days')
    return ('00' + Math.floor(days / 1000)).slice(-2) + '-' + ('000' + days % 1000).slice(-3)
})

// PARSING

addRegexToken('t', /((\d\d-?\d\d\d)|(\d\d\d))/)

addParseToken('t', function (input, array) {
    const dp = input.match(/^((\d\d+-?\d\d\d)|(\d\d\d))$/),
          baseDate = dp[2] ? hooks(start1000days).add(parseInt(dp[2].replace('-', '')), 'days') :
            hooks(start1000days).clone().add(Math.floor(hooks().startOf('day').diff(start1000days, 'days') / 1000) * 1000 + parseInt(dp[3]), 'days')

    array[YEAR] = baseDate.get('year');
    array[MONTH] = baseDate.get('month');
    array[DATE] = baseDate.get('date');
    console.log('Parsed t: ', baseDate);
});
