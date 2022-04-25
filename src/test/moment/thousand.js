import { module, test } from '../qunit';
import moment from '../../moment';

module('thousand');

test('thousand', function(assert) {
    assert.equal(
        moment([1971, 8, 29]).format('t'), '00-002'
    )
    assert.equal(
        moment([1971, 8, 29, 17, 38, 56]).format('t HH:mm:ss'), '00-002 17:38:56'
    )
    assert.equal(
        moment('17-456', 't').format('t'), '17-456'
    )
    assert.equal(
        moment('17456', 't').format('t'), '17-456'
    )

    assert.equal(
        moment('17456 14:34:56', 't HH:mm:ss').format('t HH:mm:ss'), '17-456 14:34:56'
    )
    assert.equal(
        moment('17456 14:34:56', 't HH:mm:ss', true).format('t HH:mm:ss'), '17-456 14:34:56'
    )
    const today = moment(),
          todayT = today.format('t'),
          result = todayT.replace(/\d+$/,'') + '300';

    assert.equal(
        moment('300', 't').format('t'), result
    )

});
