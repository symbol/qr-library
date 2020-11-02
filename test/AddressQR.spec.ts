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
import {
    Address,
    NetworkType,
} from 'symbol-sdk';

// internal dependencies
import {
    AddressQR,
    QRCodeType,
} from "../index";

describe('AccountQR -->', () => {

    describe('toJSON() should', () => {

        it('include mandatory NIP-7 QR Code base fields', () => {
            // Arrange:
            const name = 'test-contact-1';
            const address = Address.createFromRawAddress('TA6QZTYPOIYQYR5NRY4WQ2WRQUX2FN5UK2DO6DI');

            // Act:
            const addressQR = new AddressQR(name, address.plain(), NetworkType.TEST_NET, '');
            const actualJSON = addressQR.toJSON();
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
            const name = 'test-address-1';
            const address = Address.createFromRawAddress('TA6QZTYPOIYQYR5NRY4WQ2WRQUX2FN5UK2DO6DI');

            // Act:
            const addressQR = new AddressQR(name, address.plain(), NetworkType.TEST_NET, '');
            const actualJSON = addressQR.toJSON();
            const actualObject = JSON.parse(actualJSON);

            // Assert:
            expect(actualObject.data).to.have.property('name');
            expect(actualObject.data).to.have.property('address');
        });
    });

    describe('fromJSON() should', () => {

        it('reconstruct contact given AddressQR JSON', () => {
            // Arrange:
            const address = Address.createFromRawAddress('TA6QZTYPOIYQYR5NRY4WQ2WRQUX2FN5UK2DO6DI');

            // Act:
            const exportContact = new AddressQR('nemtech', address.plain(), NetworkType.TEST_NET, 'no-chain-id');
            const importContact = AddressQR.fromJSON(exportContact.toJSON());

            // Assert
            expect(importContact.name).to.be.equal('nemtech');
            expect(importContact.accountAddress).to.be.equal(exportContact.accountAddress);
        });

        it('reconstruct contact given correct JSON structure', () => {
            // Arrange:
            const addressInfo = {
                v: 3,
                type: QRCodeType.ExportAddress,
                network_id: NetworkType.TEST_NET,
                chain_id: '9F1979BEBA29C47E59B40393ABB516801A353CFC0C18BC241FEDE41939C907E7',
                data: {
                    name: 'nemtech',
                    address: 'TA6QZTYPOIYQYR5NRY4WQ2WRQUX2FN5UK2DO6DI',
                },
            };

            // Act:
            const addressQR = AddressQR.fromJSON(JSON.stringify(addressInfo));

            // Assert
            expect(addressQR.name).to.be.equal('nemtech');
            expect(addressQR.accountAddress).to.be.equal('TA6QZTYPOIYQYR5NRY4WQ2WRQUX2FN5UK2DO6DI');
        });

    });

});
