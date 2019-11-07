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

// internal dependencies
import {
    EncryptedPayload,
} from "../index";

describe('EncryptedPayload -->', () => {

    describe('fromJSON() should', () => {

        it('throw on empty JSON', () => {
            // Arrange:
            const json = '';

            // Act + Assert
            expect((() => {
                const payload = EncryptedPayload.fromJSON(json);
            })).to.throw('JSON argument cannot be empty.');
        });

        it('throw on missing ciphertext property', () => {
            // Arrange:
            const json = '{"salt": "00"}';

            // Act + Assert
            expect((() => {
                const payload = EncryptedPayload.fromJSON(json);
            })).to.throw('Missing mandatory field \'ciphertext\'.');
        });

        it('throw on missing salt property', () => {
            // Arrange:
            const json = '{"ciphertext": "00"}';

            // Act + Assert
            expect((() => {
                const payload = EncryptedPayload.fromJSON(json);
            })).to.throw('Missing mandatory field \'salt\'.');
        });

        it('create complete object', () => {
            // Arrange:
            const json = {
                ciphertext: "zyFIAqnq8fihaJFqgH9gVKGT1Aa8dbxXqrcWb//Ckv7R/DJDgdXOY8ejc6KNURPGujULpv0fQnN87AQFldmCgkGYq0CBSHwhOhyCvEBK18g=",
                salt: "12345678901234567890123456789012",
            };

            // Act
            const payload = EncryptedPayload.fromJSON(JSON.stringify(json));

            // Assert
            expect(payload.ciphertext).to.not.be.undefined;
            expect(payload.ciphertext).to.be.equal(json.ciphertext);
            expect(payload.salt).to.not.be.undefined;
            expect(payload.salt).to.be.equal(json.salt);
        });
    });

});
