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
import {
    Account,
    PublicAccount,
    NetworkType,
} from "nem2-sdk";

// internal dependencies
import {
    QRCode,
    QRCodeInterface,
    QRCodeType,
    QRCodeSettings,
} from '../index';

export class ContactQR extends QRCode implements QRCodeInterface {
    /**
     * Construct a Contact QR Code out of the
     * nem2-sdk Account or PublicAccount instance.
     * 
     * @param   account         {Account|PublicAccount}
     * @param   networkType     {NetworkType}
     * @param   chainId         {string}
     */
    constructor(/**
                 * The contact account.
                 * @var {Account|PublicAccount}
                 */
                public readonly account: Account | PublicAccount,
                /**
                 * The network type.
                 * @var {NetworkType}
                 */
                public readonly networkType: NetworkType,
                /**
                 * The chain Id.
                 * @var {string}
                 */
                public readonly chainId: string) {
        super(QRCodeType.AddContact, networkType, chainId);
    }

    /**
     * The `toJSON()` method should return the JSON
     * representation of the QR Code content.
     *
     * @return {string}
     */
    public toJSON(): string {

        const jsonSchema = {
            'v': 3,
            'type': this.type,
            'network_id': this.networkType,
            'chain_id': this.chainId,
            'data': 'not implemented yet',
        };

        return JSON.stringify(jsonSchema);
    }
}