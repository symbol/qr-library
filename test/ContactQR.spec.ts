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
    NetworkType,
    PublicAccount,
} from 'symbol-sdk';

// internal dependencies
import {
    ContactQR,
    QRCodeType,
} from "../index";

describe('ContactQR -->', () => {

    describe('toJSON() should', () => {

        it('include mandatory NIP-7 QR Code base fields', () => {
            // Arrange:
            const name = 'test-contact-1';
            const account = PublicAccount.createFromPublicKey(
                'C5C55181284607954E56CD46DE85F4F3EF4CC713CC2B95000FA741998558D268',
                NetworkType.TEST_NET,
            );

            // Act:
            const addContact = new ContactQR(name, account.publicKey, NetworkType.TEST_NET, '');
            const actualJSON = addContact.toJSON();
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
            const name = 'test-contact-1';
            const account = PublicAccount.createFromPublicKey(
                'C5C55181284607954E56CD46DE85F4F3EF4CC713CC2B95000FA741998558D268',
                NetworkType.TEST_NET,
            );

            // Act:
            const addContact = new ContactQR(name, account.publicKey, NetworkType.TEST_NET, '');
            const actualJSON = addContact.toJSON();
            const actualObject = JSON.parse(actualJSON);

            // Assert:
            expect(actualObject.data).to.have.property('name');
            expect(actualObject.data).to.have.property('publicKey');
        });
    });

    describe('fromJSON() should', () => {

        it('reconstruct contact given ContactQR JSON', () => {
            // Arrange:
            const account = PublicAccount.createFromPublicKey(
                'C5C55181284607954E56CD46DE85F4F3EF4CC713CC2B95000FA741998558D268',
                NetworkType.TEST_NET,
            );

            // Act:
            const exportContact = new ContactQR('nemtech', account.publicKey, NetworkType.TEST_NET, 'no-chain-id');
            const importContact = ContactQR.fromJSON(exportContact.toJSON());

            // Assert
            expect(importContact.name).to.be.equal('nemtech');
            expect(importContact.accountPublicKey).to.be.equal(exportContact.accountPublicKey);
        });

        it('reconstruct contact given correct JSON structure', () => {
            // Arrange:
            const contactInfo = {
                v: 3,
                type: QRCodeType.AddContact,
                network_id: NetworkType.TEST_NET,
                chain_id: '9F1979BEBA29C47E59B40393ABB516801A353CFC0C18BC241FEDE41939C907E7',
                data: {
                    name: 'nemtech',
                    publicKey: 'C5C55181284607954E56CD46DE85F4F3EF4CC713CC2B95000FA741998558D268',
                },
            };

            // Act:
            const importContact = ContactQR.fromJSON(JSON.stringify(contactInfo));

            // Assert
            expect(importContact.name).to.be.equal('nemtech');
            expect(importContact.accountPublicKey).to.be.equal('C5C55181284607954E56CD46DE85F4F3EF4CC713CC2B95000FA741998558D268');
        });

    });

});
