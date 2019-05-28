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
    NetworkType,
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
    QRCodeDataSchema,
    ExportObjectDataSchema,
} from "../index";

/// region Mock for QRCode specialization
// extend abstract class for tests
class FakeQR extends QRCode implements QRCodeInterface {
    constructor(
        public readonly object: Object,
        public readonly networkType: NetworkType,
        public readonly chainId: string) {
        super(QRCodeType.ExportObject, networkType, chainId);
    }

    public getSchema(): QRCodeDataSchema {
        return new ExportObjectDataSchema();
    }

    public getTypeNumber(): number {
        return 10;
    }
}
/// end-region Mock for QRCode specialization

describe('QRCode -->', () => {

    describe('toBase64() should', () => {

        it('create same Base64 given same objects', () => {
            // Arrange:
            const object1 = {"test1": "test1"};
            const object2 = {"test1": "test1"};

            // Act:
            const fakeQR1 = new FakeQR(object1, NetworkType.TEST_NET, 'no-chain-id');
            const fakeQR2 = new FakeQR(object2, NetworkType.TEST_NET, 'no-chain-id');
            const implQR1 = fakeQR1.build();
            const implQR2 = fakeQR2.build();

            // Assert:
            expect(fakeQR1.toBase64()).to.be.equal(fakeQR2.toBase64());
        });

        it('create different Base64 given different objects', () => {
            // Arrange:
            const object1 = {"test1": "test1"};
            const object2 = {"test2": "test2"};

            // Act:
            const fakeQR1 = new FakeQR(object1, NetworkType.TEST_NET, 'no-chain-id');
            const fakeQR2 = new FakeQR(object2, NetworkType.TEST_NET, 'no-chain-id');
            const implQR1 = fakeQR1.build();
            const implQR2 = fakeQR2.build();

            // Assert:
            expect(fakeQR1.toBase64()).to.not.be.equal(fakeQR2.toBase64());
        });
    });

    describe('build() should', () => {

        it('set correct settings for QR Code generation', () => {
            // Arrange:
            const object = {"test": "test"};
            const modulesCount = 10 * 4 + 17;

            // Act:
            const fakeQR = new FakeQR(object, NetworkType.TEST_NET, 'no-chain-id');
            const implQR = fakeQR.build();

            // Assert:
            expect(implQR.getTypeNumber()).to.be.equal(10);
            expect(implQR.getErrorCorrectLevel()).to.be.equal(QRCodeSettings.CORRECTION_LEVEL);
            expect(implQR.getModuleCount()).to.be.equal(modulesCount);
        });

        it('create same QR codes given same objects', () => {
            // Arrange:
            const object1 = {"test1": "test1"};
            const object2 = {"test1": "test1"};

            // Act:
            const fakeQR1 = new FakeQR(object1, NetworkType.TEST_NET, 'no-chain-id');
            const fakeQR2 = new FakeQR(object2, NetworkType.TEST_NET, 'no-chain-id');
            const implQR1 = fakeQR1.build();
            const implQR2 = fakeQR2.build();

            // Assert:
            expect(fakeQR1.toJSON()).to.be.equal(fakeQR2.toJSON());
            expect(fakeQR1.toBase64()).to.be.equal(fakeQR2.toBase64());
        });

        it('create different QR codes given different objects', () => {
            // Arrange:
            const object1 = {"test1": "test1"};
            const object2 = {"test2": "test2"};

            // Act:
            const fakeQR1 = new FakeQR(object1, NetworkType.TEST_NET, 'no-chain-id');
            const fakeQR2 = new FakeQR(object2, NetworkType.TEST_NET, 'no-chain-id');
            const implQR1 = fakeQR1.build();
            const implQR2 = fakeQR2.build();

            // Assert:
            expect(fakeQR1.toJSON()).to.not.be.equal(fakeQR2.toJSON());
            expect(fakeQR1.toBase64()).to.not.be.equal(fakeQR2.toBase64());
        });
    });

});
