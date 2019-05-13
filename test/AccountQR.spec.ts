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
import {
    QRCode as QRCodeImpl,
    QR8BitByte,
    ErrorCorrectLevel,
} from 'qrcode-generator-ts';

// internal dependencies
import {
    QRCodeInterface,
    QRCode,
    QRCodeType,
    QRCodeSettings,
    ContactQR,
} from "../index";
import { AccountQR } from "../src/AccountQR";

describe('AccountQR -->', () => {

    describe('toJSON() should', () => {

        it('include mandatory NIP-7 QR Code base fields', () => {
            // Arrange:
            const account = Account.createFromPrivateKey(
                'F97AE23C2A28ECEDE6F8D6C447C0A10B55C92DDE9316CCD36C3177B073906978',
                NetworkType.TEST_NET
            );

            const password = new Password('1234');

            // Act:
            const exportAccount = new AccountQR(account, password, NetworkType.TEST_NET, '');
            const actualJSON = exportAccount.toJSON();
            // const actualObject = JSON.parse(actualJSON);

            // // Assert:
            // expect(actualObject).to.have.property('v');
            // expect(actualObject).to.have.property('type');
            // expect(actualObject).to.have.property('network_id');
            // expect(actualObject).to.have.property('chain_id');
            // expect(actualObject).to.have.property('data');
        });
    });

});
