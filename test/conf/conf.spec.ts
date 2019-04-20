/*
   Copyright 2019 NEM

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

export const ADD_CONTRACT = `{
    "schema": 1,
    "network": "MAIN_NET",
    "nem_version": "Catapult",
    "data": {
      "address": "SBV4T3-2V2GPV-DA2SWM-UL3JJH-WON4VR-BKEIOU-BPC2"
    }
  }`;

export const TRANSACTION = `{
    "schema": 2,
    "network": "MAIN_NET",
    "nem_version": "Catapult",
    "type": "TransferTransaction",
    "data": {
      "recipient": "SBV4T3-2V2GPV-DA2SWM-UL3JJH-WON4VR-BKEIOU-BPC2",
      "assets": [
        {
          "id": "nem:xem",
          "relativeQuantity": 1
        }
      ],
      "message": {
        "type": 1,
        "payload": "my message"
      }
    }
  }`;

export const IMPORT_EXPORT_ACCOUNT = `{
    "schema": 3,
    "network": "MAIN_NET",
    "nem_version": "Catapult",
    "data": {
      "encryptedKey": "6714c22c89c81c656",
      "salt":"6c9ba0c43cd75b4f323947273db9b6f95aef95695197c0b24a5e10116e3923d1"
    }
  }`;