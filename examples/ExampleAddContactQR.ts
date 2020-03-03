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
import {
    NetworkType,
} from 'symbol-sdk';

// internal dependencies
import {
    ContactQR,
    QRCodeType,
} from '../index';
import {Example} from './Example';
import { QRCodeSettings } from '../src/QRCodeSettings';

class ExampleAddContactQR extends Example {

    /**
     * The `execute()` method should run the underlying
     * example business flow.
     *
     * @return {number}
     */
    public async execute(): Promise<number> {

        // Arrange
        const contactInfo = {
            v: 3,
            type: QRCodeType.AddContact,
            network_id: NetworkType.MIJIN_TEST,
            chain_id: 'no-chain-id',
            data: {
                name: 'nemtech',
                publicKey: 'D90ABF5BADC4E709E79E8F168F1629CD90D7F5B41010B7C0616C2121D516C11C'
            }
        };

        // create QR Code with JSON content
        const contactQR = ContactQR.fromJSON(JSON.stringify(contactInfo));
        console.log("ContactQR JSON: ", contactQR.toJSON());
        console.log("ContactQR BASE64: ", await contactQR.toBase64().toPromise());
        console.log("ContactQR OBJECT: ", await contactQR.toString(new QRCodeSettings('M', 100)).toPromise());
        console.log("");
        return this.resolve(0);
    }
}

export {ExampleAddContactQR};
