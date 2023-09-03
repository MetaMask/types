import { expectAssignable, expectNotAssignable } from 'tsd';

import { HexPrefixed } from '../src/hex-prefixed';
import { Keyring, KeyringClass } from '../src/keyring';

// Valid Keyrings:

class MinimalKeyring {
  static type: 'Minimal';

  type = 'Minimal';

  async getAccounts() {
    return [];
  }

  async addAccounts() {
    return [];
  }

  async serialize() {
    return null;
  }

  async deserialize() {
    return undefined;
  }

  removeAccount() {
    return undefined;
  }
}
expectAssignable<KeyringClass<null>>(MinimalKeyring);
const minimalKeyring = new MinimalKeyring();
expectAssignable<Keyring<null>>(minimalKeyring);

type MinimalFunctionalKeyringState = { accounts: HexPrefixed[] };
class MinimalFunctionalKeyring {
  static type: 'MinimalFunctional';

  type = 'MinimalFunctional';

  private state: MinimalFunctionalKeyringState;

  constructor(options?: { initState?: MinimalFunctionalKeyringState }) {
    this.state = options?.initState || { accounts: [] };
  }

  async getAccounts() {
    return this.state.accounts;
  }

  async addAccounts(number: number) {
    for (let i = number; i > 0; i--) {
      this.state.accounts.push(`0x${i}` as `0x${string}`);
    }
    return this.state.accounts;
  }

  async serialize() {
    return this.state;
  }

  async deserialize({ accounts }: { accounts: HexPrefixed[] }) {
    this.state.accounts = accounts;
  }

  removeAccount(address: HexPrefixed) {
    const index = this.state.accounts.findIndex(
      (account) => account === address,
    );
    if (index >= 0) {
      this.state.accounts.splice(index, 1);
    }
  }
}
expectAssignable<KeyringClass<MinimalFunctionalKeyringState>>(
  MinimalFunctionalKeyring,
);
const minimalFunctionalKeyring = new MinimalFunctionalKeyring({});
expectAssignable<Keyring<MinimalFunctionalKeyringState>>(
  minimalFunctionalKeyring,
);

// Invalid Keyrings:

class EmptyKeyring {}
const emptyKeyring = new EmptyKeyring();
expectNotAssignable<KeyringClass<null>>(EmptyKeyring);
expectNotAssignable<Keyring<null>>(emptyKeyring);
