import { expectAssignable, expectNotAssignable } from 'tsd';

import { HexPrefixed } from '../src/hex-prefixed';

// Valid hex-prefixed strings:

expectAssignable<HexPrefixed>('0x');

expectAssignable<HexPrefixed>('0x0');

expectAssignable<HexPrefixed>('0x😀');

const embeddedString = 'test';
expectAssignable<HexPrefixed>(`0x${embeddedString}`);

// Not valid hex-prefixed strings:

expectNotAssignable<HexPrefixed>(`0X${embeddedString}`);

expectNotAssignable<HexPrefixed>(`1x${embeddedString}`);

expectNotAssignable<HexPrefixed>(0);

expectNotAssignable<HexPrefixed>('0');

expectNotAssignable<HexPrefixed>('🙃');
