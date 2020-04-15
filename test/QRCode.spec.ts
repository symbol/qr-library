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
} from 'symbol-sdk';

// internal dependencies
import {
    QRCodeInterface,
    QRCode,
    QRCodeType,
    QRCodeDataSchema,
    ExportObjectDataSchema,
} from "../index";

/// region Mock for QRCode specialization
// extend abstract class for tests
class FakeQR extends QRCode implements QRCodeInterface {
    constructor(
        public readonly object: Object,
        public readonly networkType: NetworkType,
        public readonly generationHash: string) {
        super(QRCodeType.ExportObject, networkType, generationHash);
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

        it('create same Base64 given same objects', async () => {
            // Arrange:
            const object1 = {"test1": "test1"};
            const object2 = {"test1": "test1"};

            // Act:
            const fakeQR1 = new FakeQR(object1, NetworkType.TEST_NET, 'no-chain-id');
            const fakeQR2 = new FakeQR(object2, NetworkType.TEST_NET, 'no-chain-id');

            // Assert:
            expect(await fakeQR1.toBase64().toPromise()).to.be.equal(await fakeQR2.toBase64().toPromise());
        });

        it('create different Base64 given different objects', async () => {
            // Arrange:
            const object1 = {"test1": "test1"};
            const object2 = {"test2": "test2"};

            // Act:
            const fakeQR1 = new FakeQR(object1, NetworkType.TEST_NET, 'no-chain-id');
            const fakeQR2 = new FakeQR(object2, NetworkType.TEST_NET, 'no-chain-id');

            // Assert:
            expect(await fakeQR1.toBase64().toPromise()).to.not.be.equal(await fakeQR2.toBase64().toPromise());
        });
    });

    describe('toString() should', () => {

        it('create same string given same objects', async () => {
            // Arrange:
            const object1 = {"test1": "test1"};
            const object2 = {"test1": "test1"};

            // Act:
            const fakeQR1 = new FakeQR(object1, NetworkType.TEST_NET, 'no-chain-id');
            const fakeQR2 = new FakeQR(object2, NetworkType.TEST_NET, 'no-chain-id');

            // Assert:
            expect(await fakeQR1.toString().toPromise()).to.be.equal(await fakeQR2.toString().toPromise());
        });

        it('create different string given different objects', async () => {
            // Arrange:
            const object1 = {"test1": "test1"};
            const object2 = {"test2": "test2"};

            // Act:
            const fakeQR1 = new FakeQR(object1, NetworkType.TEST_NET, 'no-chain-id');
            const fakeQR2 = new FakeQR(object2, NetworkType.TEST_NET, 'no-chain-id');

            // Assert:
            expect(await fakeQR1.toString().toPromise()).to.not.be.equal(await fakeQR2.toString().toPromise());
        });
    });
});
