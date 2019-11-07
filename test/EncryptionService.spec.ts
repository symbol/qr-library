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
    EncryptionService,
} from "../index";

describe('EncryptionService -->', () => {

    describe('encrypt() should', () => {

        it('should create encrypted payload with salt', () => {
            // Arrange:
            const data = 'this will be encrypted.';
            const pass = 'password';

            // Act
            const encrypted = EncryptionService.encrypt(data, pass);

            // Assert
            expect(encrypted.ciphertext).to.not.be.undefined;
            expect(encrypted.salt).to.not.be.undefined;
            expect(encrypted.salt).to.have.lengthOf(64);
        });

        it('should create correctly sized ciphertext and salt', () => {
            // Arrange:
            const data = 'this will be encrypted.';
            const pass = 'password';

            // Act
            const encrypted = EncryptionService.encrypt(data, pass);

            // Assert
            expect(encrypted.ciphertext).to.have.lengthOf(76);
            expect(encrypted.salt).to.have.lengthOf(64);
        });

        it('should always create different ciphertext with salt', () => {
            // Arrange:
            const data = 'this will be encrypted.';
            const pass = 'password';

            // Act
            const encrypted_1 = EncryptionService.encrypt(data, pass);
            const encrypted_2 = EncryptionService.encrypt(data, pass);
            const encrypted_3 = EncryptionService.encrypt(data, pass);

            // Assert
            expect(encrypted_1).to.not.be.equal(encrypted_2);
            expect(encrypted_1).to.not.be.equal(encrypted_3);
            expect(encrypted_2).to.not.be.equal(encrypted_3);
            expect(encrypted_1.salt).to.have.lengthOf(64);
            expect(encrypted_2.salt).to.have.lengthOf(64);
            expect(encrypted_3.salt).to.have.lengthOf(64);
        });
    });

    describe('decrypt() should', () => {

        it('should decrypt ciphertext correctly', () => {
            // Arrange:
            const data = 'this will be encrypted';
            const pass = 'password';

            // Act
            const encrypted = EncryptionService.encrypt(data, pass);
            const decrypted = EncryptionService.decrypt(encrypted, pass);

            // Assert
            expect(decrypted).to.be.equal(data);
        });
    });

});
