import {beforeEach, describe, expect, test} from '@jest/globals';

import {Player} from '../../../src/common/Player';
import {EndOfMatch} from '../../../src/common/events/EndOfMatch';

describe('EndOfMatch', () => {
    let endOfMatch: EndOfMatch;

    beforeEach(() => {
        endOfMatch = new EndOfMatch();
    });

    test('default constructor', () => {
        expect(endOfMatch.getTimestamp()).toBe(null);
    });

    test('setTimestamp updates timestamp', () => {
        const timestamp = new Date();

        endOfMatch.setTimestamp(timestamp);

        expect(endOfMatch.getTimestamp()).toBe(timestamp);
    });

    test('create sets the timestamp', () => {
        const timestamp = new Date();

        endOfMatch = EndOfMatch.create(timestamp);

        expect(endOfMatch.getTimestamp()).toBe(timestamp);
    });

    test('toString returns timestamp', () => {
        const timestamp = new Date();

        endOfMatch.setTimestamp(timestamp);

        expect(endOfMatch.toString()).toBe('End of Match: ' + timestamp);
    });
});
