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
// internal dependencies
/**
 * Class `EncryptedPayload` describes an encrypted payload
 * with salt and ciphertext properties.
 *
 * @since 0.3.0
 */
class EncryptedPayload {

    constructor(/**
                 * The payload ciphertext.
                 * The first X bytes represent the IV.
                 *
                 * @var {string}
                 */
                public readonly ciphertext: string,
                /**
                 * The payload salt.
                 *
                 * @var {string}
                 */
                public readonly salt: string) {}

    /**
     * Parse a JSON representation of an encrypted
     * payload into a `EncryptedPayload` instance.
     *
     * The provided JSON must contain fields 'ciphertext'
     * and 'salt'.
     *
     * @param   {string}    json
     * @return  {EncryptedPayload}
     */
    public static fromJSON(
        json: string,
    ): EncryptedPayload {

        if (! json.length) {
            throw new Error('JSON argument cannot be empty.');
        }

        // validate JSON
        let jsonObject: any;
        try {
            jsonObject = JSON.parse(json);
        }
        catch (e) {
            // Invalid JSON provided, forward error
            throw new Error(e);
        }

        // validate obligatory fields
        if (!jsonObject.hasOwnProperty('ciphertext')) {
            throw new Error("Missing mandatory field 'ciphertext'.");
        }

        if (!jsonObject.hasOwnProperty('salt')) {
            throw new Error("Missing mandatory field 'salt'.");
        }

        return new EncryptedPayload(jsonObject.ciphertext, jsonObject.salt);
    }

}

export {EncryptedPayload};
