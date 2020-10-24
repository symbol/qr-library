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
 * limitations under the License.
 */
import {expect} from "chai";
import { MnemonicPassPhrase } from 'symbol-hd-wallets';
import {
    NetworkType,
    Password,
} from 'symbol-sdk';

// internal dependencies
import {
    MnemonicQR,
    QRCodeType,
} from "../index";

describe('MnemonicQR -->', () => {

    describe('with password -->', () => {

        describe('toJSON() should', () => {

            it('include mandatory NIP-7 QR Code base fields', () => {
                // Arrange:
                const mnemonic = MnemonicPassPhrase.createRandom();

                // Act:
                const exportMnemonic = new MnemonicQR(mnemonic.plain, NetworkType.MIJIN_TEST, 'no-chain-id', 'password');
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

                // Act:
                const exportMnemonic = new MnemonicQR(mnemonic.plain, NetworkType.MIJIN_TEST, 'no-chain-id', 'password');
                const actualJSON = exportMnemonic.toJSON();
                const actualObject = JSON.parse(actualJSON);

                // Assert:
                expect(actualObject.data).to.have.property('ciphertext');
                expect(actualObject.data).to.have.property('salt');
            });
        });

        describe('fromJSON() should', () => {

            it('throw error given wrong password', () => {
                // Arrange:
                const mnemonic = MnemonicPassPhrase.createRandom();

                // Act:
                const exportMnemonic = new MnemonicQR(mnemonic.plain, NetworkType.MIJIN_TEST, 'no-chain-id', 'password');

                // Act + Assert
                expect((() => {
                    const importMnemonic = MnemonicQR.fromJSON(exportMnemonic.toJSON(), 'wrong-password');
                })).to.throw('Could not parse mnemonic pass phrase.');
            });

            it('throw error given encrypted payload is invalid', () => {
                // Arrange:
                const accountInfo: any = {
                    v: 3,
                    type: QRCodeType.ExportMnemonic,
                    network_id: NetworkType.MIJIN_TEST,
                    chain_id: '9F1979BEBA29C47E59B40393ABB516801A353CFC0C18BC241FEDE41939C907E7',
                    data: {
                        // 'ciphertext' field for encrypted payload missing
                        salt: "b248953e9ebfa269cd7b940f9c03d2d4b192f90db61638375b5e78296bbe675a",
                    },
                };

                // Act + Assert
                expect((() => {
                    const importAccount = MnemonicQR.fromJSON(JSON.stringify(accountInfo), 'password');
                })).to.throw('Could not parse mnemonic pass phrase.');
            });

            it('reconstruct mnemonic pass phrase given correct password', () => {
                // Arrange:
                const mnemonic = MnemonicPassPhrase.createRandom();

                // Act:
                const exportMnemonic = new MnemonicQR(mnemonic.plain, NetworkType.MIJIN_TEST, 'no-chain-id', 'password');
                const importMnemonic = MnemonicQR.fromJSON(exportMnemonic.toJSON(), 'password');

                // Assert
                expect(importMnemonic.mnemonicPlainText).to.be.equal(mnemonic.plain);
            });

            it('reconstruct mnemonic pass phrase given correct ciphertext and password', () => {
                // Arrange:
                const mnemonicInfo = {
                    v: 3,
                    type: QRCodeType.ExportMnemonic,
                    network_id: NetworkType.MIJIN_TEST,
                    chain_id: "9F1979BEBA29C47E59B40393ABB516801A353CFC0C18BC241FEDE41939C907E7",
                    data: {
                        ciphertext: "964322228f401a2ec576ac256cbbdce29YfW+CykqESzGSzDYuKJxJUSpQ4woqMdD8Up7mjbow09I/UYV4e8HEgbhjlLjf30YLlQ+JKLBTf9kUGMnp3tZqYSq3lLZRDp8TVE6GzHiX4V59RTP7BOixwpDWDmfOP0B0i+Q1s0+OPfmyck4p7YZkVNi/HYvQF4kDV27sjRTZKs+uETKA0Ae0rl17d9EMV3eLUVcWEGE/ChgEfmnMlN1g==",
                        salt: "b248953e9ebfa269cd7b940f9c03d2d4b192f90db61638375b5e78296bbe675a",
                    },
                };

                // Act:
                const importMnemonic = MnemonicQR.fromJSON(JSON.stringify(mnemonicInfo), 'password');

                // Assert
                expect(importMnemonic.mnemonicPlainText).to.be.equal(
                    'stumble shoot spawn bitter '
                + 'forest waste attitude chest '
                + 'square kite dawn photo '
                + 'twice message bargain trap '
                + 'spin vote lamp wire '
                + 'also either else pupil',
                );
            });
        });

    });

    describe('with no password -->', () => {

        describe('toJSON() should', () => {

            it('include mandatory NIP-7 QR Code base fields', () => {
                // Arrange:
                const mnemonic = MnemonicPassPhrase.createRandom();

                // Act:
                const exportMnemonic = new MnemonicQR(mnemonic.plain, NetworkType.MIJIN_TEST, 'no-chain-id');
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

                // Act:
                const exportMnemonic = new MnemonicQR(mnemonic.plain, NetworkType.MIJIN_TEST, 'no-chain-id');
                const actualJSON = exportMnemonic.toJSON();
                const actualObject = JSON.parse(actualJSON);

                // Assert:
                expect(actualObject.data).to.have.property('plainMnemonic');
            });
        });

        describe('fromJSON() should', () => {

            it('not throw error given a password when the qr is not encrypted', () => {
                // Arrange:
                const mnemonic = MnemonicPassPhrase.createRandom();

                // Act:
                const exportMnemonic = new MnemonicQR(mnemonic.plain, NetworkType.MIJIN_TEST, 'no-chain-id');

                // Act + Assert
                expect((() => {
                    const importMnemonic = MnemonicQR.fromJSON(exportMnemonic.toJSON(), 'password');
                })).not.to.throw('Could not parse mnemonic pass phrase.');
            });

            it('reconstruct mnemonic pass phrase given a correct plainMnemonic data', () => {
                // Arrange:
                const mnemonic = MnemonicPassPhrase.createRandom();

                // Act:
                const exportMnemonic = new MnemonicQR(mnemonic.plain, NetworkType.MIJIN_TEST, 'no-chain-id');
                const importMnemonic = MnemonicQR.fromJSON(exportMnemonic.toJSON());

                // Assert
                expect(importMnemonic.mnemonicPlainText).to.be.equal(mnemonic.plain);
            });
        });

    });

});
