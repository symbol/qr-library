# nem2-qr-library

[![npm version](https://badge.fury.io/js/nem2-qr-library.svg)](https://badge.fury.io/js/nem2-qr-library)
[![Build Status](https://travis-ci.org/anthonylaw/nem2-qr-library.svg?branch=master)](https://travis-ci.org/anthonylaw/nem2-qr-library)
[![Slack](https://img.shields.io/badge/chat-on%20slack-green.svg)](https://nem2.slack.com/messages/CB0UU89GS//)

:warning: **This package is currently still in development, please do not use in production.** *The author of this package cannot be held responsible for any loss of money or any malintentioned usage forms of this package. Please use this package with caution.*

NEM2 QR Library generator to genereate QRcode by string (JSON format) for the Catapult (NEM2) platform.

This is a PoC to validate the proposed [NIP? QR Library - Definition](https://github.com/nemtech/NIP/issues/3). When stable, the repository will be moved to the [nemtech](https://github.com/nemtech) organization.

## Installation

`npm install nem2-qr-library`

## Usage

### Generate QRCode in ASCII

```typescript
    import { QRCodeGenerator } from 'nem2-qr-library';

    const dataset = `{
                      "schema": 1,
                      "network": "MAIN_NET",
                      "nem_version": "Catapult",
                      "data": {
                        "address": "SBV4T3-2V2GPV-DA2SWM-UL3JJH-WON4VR-BKEIOU-BPC2"
                      }
                    }`
    let qr = new QRCodeGenerator(dataset).toQR();
    
    console.log(qr);
```

### Generate QRCode in data image Base64

```typescript
    import { QRCodeGenerator } from 'nem2-qr-library';

    const dataset = `{
                      "schema": 1,
                      "network": "MAIN_NET",
                      "nem_version": "Catapult",
                      "data": {
                        "address": "SBV4T3-2V2GPV-DA2SWM-UL3JJH-WON4VR-BKEIOU-BPC2"
                      }
                    }`
    let base64 = new QRCodeGenerator(dataset).toBase64();
    
    console.log(base64);
```

## Changelog

Important versions listed below. Refer to the [Changelog](CHANGELOG.md) for a full history of the project.

- [0.1.0](CHANGELOG.md) - 2019-04-20

## License

Licensed under the [Apache License](LICENSE.md), Version 2.
