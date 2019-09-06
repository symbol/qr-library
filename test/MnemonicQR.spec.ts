/**
 * Copyright 2019 NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 *limitations under the License.
 */
import {expect} from "chai";
import {
    Account,
    NetworkType,
    Password,
} from 'nem2-sdk';
import { MnemonicPassPhrase } from 'nem2-hd-wallets';

// internal dependencies
import {
    MnemonicQR,
} from "../index";

describe('MnemonicQR -->', () => {

    describe('toJSON() should', () => {

        it('include mandatory NIP-7 QR Code base fields', () => {
            // Arrange:
            const mnemonic = MnemonicPassPhrase.createRandom();
            const password = new Password('password');

            // Act:
            const exportMnemonic = new MnemonicQR(mnemonic, password, NetworkType.MIJIN_TEST, 'no-chain-id');
            const actualJSON = exportMnemonic.toJSON();
            const actualObject = JSON.parse(actualJSON);

            // Assert:
            expect(actualObject).to.have.property('v');
            expect(actualObject).to.have.property('type');
            expect(actualObject).to.have.property('network_id');
            expect(actualObject).to.have.property('chain_id');
            expect(actualObject).to.have.property('data');
        });

        it('include specialized schema fields', () => {
            // Arrange:
            const mnemonic = MnemonicPassPhrase.createRandom();
            const password = new Password('password');

            // Act:
            const exportMnemonic = new MnemonicQR(mnemonic, password, NetworkType.MIJIN_TEST, 'no-chain-id');
            const actualJSON = exportMnemonic.toJSON();
            const actualObject = JSON.parse(actualJSON);

            // Assert:
            expect(actualObject.data).to.have.property('ciphertext');
            expect(actualObject.data).to.have.property('salt');
        });
    });

    describe('fromJSON should', () => {

        it('throw error given wrong password', () => {
            // Arrange:
            const mnemonic = MnemonicPassPhrase.createRandom();
            const password = new Password('password');
            const wrongPw  = new Password('passw0rd');

            // Act:
            const exportMnemonic = new MnemonicQR(mnemonic, password, NetworkType.MIJIN_TEST, 'no-chain-id');

            // Act + Assert
            expect((function () {
                const importMnemonic = MnemonicQR.fromJSON(exportMnemonic.toJSON(), wrongPw);
            })).to.throw('Invalid password.');
        });

        it('reconstruct mnemonic pass phrase given correct password', () => {
            // Arrange:
            const mnemonic = MnemonicPassPhrase.createRandom();
            const password = new Password('password');

            // Act:
            const exportMnemonic = new MnemonicQR(mnemonic, password, NetworkType.MIJIN_TEST, 'no-chain-id');
            const importMnemonic = MnemonicQR.fromJSON(exportMnemonic.toJSON(), password);

            // Assert
            expect(importMnemonic.mnemonic.plain).to.be.equal(mnemonic.plain);
        });
    });

});
