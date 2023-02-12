import {beforeEach, describe, expect, test} from '@jest/globals';

import {HalfTime} from '../../../../src/data-layer/models/events/HalfTime';

describe('HalfTime', () => {
    let halfTime: HalfTime;

    beforeEach(() => {
        halfTime = new HalfTime();
    });

    test('default constructor', () => {
        expect(halfTime.getTimestamp()).toBe(null);
    });

    test('setTimestamp updates timestamp', () => {
        const timestamp = new Date();

        halfTime.setTimestamp(timestamp);

        expect(halfTime.getTimestamp()).toBe(timestamp);
    });

    test('toString returns timestamp', () => {
        const timestamp = new Date();

        halfTime.setTimestamp(timestamp);

        expect(halfTime.toString()).toBe('Half Time: ' + timestamp);
    });
});
