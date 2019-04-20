import qrcode from 'qrcode-generator';

export class QrcodeGenerator {

    private dataset: string;

    constructor(dataset:string){
        this.dataset = dataset;
    }

    public toQR (): string {
        let qr = qrcode(0, 'L');
        qr.addData(this.dataset.replace(/ /g,''));
        qr.make();

        return qr.createASCII();
    }

    public toImgBase64() : string {
        let qr = qrcode(0, 'L');
        qr.addData(this.dataset.replace(/ /g,''));
        qr.make();

        return qr.createDataURL(5,5);
    }
};