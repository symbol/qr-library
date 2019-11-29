import { QRCodeGenerator } from 'nem2-qr-library';

// define custom object to suit your application use case.
const object = {"obj": "test"};

// create QR Code base64
const request = QRCodeGenerator.createExportObject(object, NetworkType.TEST_NET);

// get base64 notation for <img> HTML attribute
const base64 = request.toBase64();
