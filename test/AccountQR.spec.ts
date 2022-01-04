/**
 * (C) Symbol Contributors 2022
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
import {
    Account,
    NetworkType,
    Password,
} from 'symbol-sdk';

// internal dependencies
import {
    AccountQR,
    QRCodeType,
} from "../index";

describe('AccountQR -->', () => {
    describe('with password -->', () => {

        describe('toJSON() should', () => {
            it('include mandatory NIP-7 QR Code base fields', () => {
                // Arrange:
                const account = Account.createFromPrivateKey(
                    'F97AE23C2A28ECEDE6F8D6C447C0A10B55C92DDE9316CCD36C3177B073906978',
                    NetworkType.TEST_NET,
                );
                // Act:
                const exportAccount = new AccountQR(account.privateKey, NetworkType.TEST_NET, 'no-chain-id', 'password');
                const actualJSON = exportAccount.toJSON();
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
                const account = Account.createFromPrivateKey(
                    'F97AE23C2A28ECEDE6F8D6C447C0A10B55C92DDE9316CCD36C3177B073906978',
                    NetworkType.TEST_NET,
                );

                // Act:
                const exportAccount = new AccountQR(account.privateKey, NetworkType.TEST_NET, 'no-chain-id', 'password');
                const actualJSON = exportAccount.toJSON();
                const actualObject = JSON.parse(actualJSON);

                // Assert:
                expect(actualObject.data).to.have.property('ciphertext');
                expect(actualObject.data).to.have.property('salt');
            });
        });

        describe('fromJSON() should', () => {

            const networkType = NetworkType.TEST_NET;
            it('throw error given wrong password', () => {
                // Arrange:
                const account = Account.createFromPrivateKey(
                    'F97AE23C2A28ECEDE6F8D6C447C0A10B55C92DDE9316CCD36C3177B073906978',
                    networkType,
                );

                // Act:
                const exportAccount = new AccountQR(account.privateKey, networkType, 'no-chain-id', 'password');

                // Act + Assert
                expect((() => {
                    const importAccount = AccountQR.fromJSON(exportAccount.toJSON(), 'wrong-password');
                })).to.throw('Could not parse account information.');
            });

            it('throw error given encrypted payload is invalid', () => {
                // Arrange:
                const accountInfo: any = {
                    v: 3,
                    type: QRCodeType.ExportAccount,
                    network_id: networkType,
                    chain_id: '9F1979BEBA29C47E59B40393ABB516801A353CFC0C18BC241FEDE41939C907E7',
                    data: {
                        // 'ciphertext' field for encrypted payload missing
                        salt: '42c8615bc6b2bc88cd239f08a5a17cc62bb0ebaece53f3e458a1cd67cd0888bc',
                    },
                };

                // Act + Assert
                expect((() => {
                    const importAccount = AccountQR.fromJSON(JSON.stringify(accountInfo), 'password');
                })).to.throw('Could not parse account information.');
            });

            it('reconstruct account given correct password', () => {
                // Arrange:
                const account = Account.createFromPrivateKey(
                    'F97AE23C2A28ECEDE6F8D6C447C0A10B55C92DDE9316CCD36C3177B073906978',
                    networkType,
                );

                // Act:
                const exportAccount = new AccountQR(account.privateKey, networkType, 'no-chain-id', 'password');
                const importAccount = AccountQR.fromJSON(exportAccount.toJSON(), 'password');

                // Assert
                expect(importAccount.accountPrivateKey).to.be.equal(exportAccount.accountPrivateKey);
            });

            it('reconstruct account given correct ciphertext and password', () => {
                // Arrange:
                const accountInfo = {
                    v: 3,
                    type: QRCodeType.ExportAccount,
                    network_id: networkType,
                    chain_id: '9F1979BEBA29C47E59B40393ABB516801A353CFC0C18BC241FEDE41939C907E7',
                    data: {
                        ciphertext: '56d310848ee93d0794eb1f64a5195778ded2q7IxvtPbO+sA7jZZyhpu/khbaNdx1pzuoGoPJRw1A4aBsWPlex3y/gy5da8WjF0i4d+/D0B5ESy+zX5P+AoFAw3EFi3UVBdnav4rnqg=',
                        salt: '42c8615bc6b2bc88cd239f08a5a17cc62bb0ebaece53f3e458a1cd67cd0888bc',
                    },
                };

                // Act:
                const importAccount = AccountQR.fromJSON(JSON.stringify(accountInfo), 'password');

                // Assert
                expect(importAccount.accountPrivateKey).to.be.equal('749F1FF1972CD465CAB74566FF0AA021F846FBE3916ABB6A6C1373E962C76331');
                expect(Account.createFromPrivateKey(importAccount.accountPrivateKey, networkType).publicKey).to.be.equal('50BFEB16AA0A3E00B8AB9385A2686991A09522DCDA4AC31B400BB5674EE4CDF8');
            });
        });

    });


    describe('with no password -->', () => {

        describe('toJSON() should', () => {

            it('include mandatory NIP-7 QR Code base fields', () => {
                // Arrange:
                const account = Account.createFromPrivateKey(
                    'F97AE23C2A28ECEDE6F8D6C447C0A10B55C92DDE9316CCD36C3177B073906978',
                    NetworkType.TEST_NET,
                );

                // Act:
                const exportAccount = new AccountQR(account.privateKey, NetworkType.TEST_NET, 'no-chain-id');
                const actualJSON = exportAccount.toJSON();
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
                const account = Account.createFromPrivateKey(
                    'F97AE23C2A28ECEDE6F8D6C447C0A10B55C92DDE9316CCD36C3177B073906978',
                    NetworkType.TEST_NET,
                );

                // Act:
                const exportAccount = new AccountQR(account.privateKey, NetworkType.TEST_NET, 'no-chain-id');
                const actualJSON = exportAccount.toJSON();
                const actualObject = JSON.parse(actualJSON);

                // Assert:
                expect(actualObject.data).to.have.property('privateKey');
            });
        });

        describe('fromJSON() should', () => {

            const networkType = NetworkType.TEST_NET;

            it('reconstruct account given a private key', () => {
                // Arrange:
                const account = Account.createFromPrivateKey(
                    'F97AE23C2A28ECEDE6F8D6C447C0A10B55C92DDE9316CCD36C3177B073906978',
                    networkType,
                );

                // Act:
                const exportAccount = new AccountQR(account.privateKey, networkType, 'no-chain-id');
                const importAccount = AccountQR.fromJSON(exportAccount.toJSON());

                // Assert
                expect(importAccount.accountPrivateKey).to.be.equal(exportAccount.accountPrivateKey);
            });

            it('not reconstruct given an incorrect object', () => {
                // Arrange:
                const accountInfo = {
                    v: 3,
                    type: QRCodeType.ExportAccount,
                    network_id: networkType,
                    chain_id: '9F1979BEBA29C47E59B40393ABB516801A353CFC0C18BC241FEDE41939C907E7',
                    encrypted: false,
                    data: {},
                };

                expect( () => {
                    const importAccount = AccountQR.fromJSON(JSON.stringify(accountInfo));
                }).to.throw('Could not parse account information.')

            });
        });

    })
});
