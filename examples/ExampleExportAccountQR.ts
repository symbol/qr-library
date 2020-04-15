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
    AccountQR,
    QRCodeSettings,
    QRCodeType,
} from '../index';
import {Example} from './Example';

class ExampleExportAccountQR extends Example {

    /**
     * The `execute()` method should run the underlying
     * example business flow.
     *
     * This example uses an encryption password value of `password`
     * and following account details
     * 
     *    Public Key: 9741183860ED711BD986A464004DB9A6D26B25F4CBB51F3B0FF1B220510B86B0
     *    Private Key: 749F1FF1972CD465CAB74566FF0AA021F846FBE3916ABB6A6C1373E962C76331
     *
     * @return {number}
     */
    public async execute(): Promise<number> {

        // Arrange
        const accountInfo = {
            v: 3,
            type: QRCodeType.ExportAccount,
            network_id: NetworkType.MIJIN_TEST,
            chain_id: '9F1979BEBA29C47E59B40393ABB516801A353CFC0C18BC241FEDE41939C907E7',
            data: {
                ciphertext: '56d310848ee93d0794eb1f64a5195778ded2q7IxvtPbO+sA7jZZyhpu/khbaNdx1pzuoGoPJRw1A4aBsWPlex3y/gy5da8WjF0i4d+/D0B5ESy+zX5P+AoFAw3EFi3UVBdnav4rnqg=',
                salt: '42c8615bc6b2bc88cd239f08a5a17cc62bb0ebaece53f3e458a1cd67cd0888bc'
            }
        };

        // create QR Code with JSON content and password
        const accountQR = AccountQR.fromJSON(
            JSON.stringify(accountInfo),
            'password'
        );

        console.log("AccountQR JSON: ", accountQR.toJSON());
        console.log("AccountQR BASE64: ", await accountQR.toBase64().toPromise());
        console.log("AccountQR OBJECT: ", await accountQR.toString(new QRCodeSettings('M', 100)).toPromise());
        console.log("");
        return this.resolve(0);
    }
}

export {ExampleExportAccountQR};
