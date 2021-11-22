import {Lightbuffer} from '../src/lightbuffer';
import {expect} from 'chai';

describe('LightBuffer#reading main test', () => {
    it('Read#byte test', () => {
        const datas = new Int8Array([245]);
        const lightBuffer = Lightbuffer.fromArrayBufferLike(datas.buffer);
        // @ts-ignore
        console.log(lightBuffer.dataView);

        // expect(lightBuffer.readByte()).is.eq(256);
        // expect(lightBuffer.readByte()).is.eq(7);

        const dataview = new DataView(new ArrayBuffer(3));
        dataview.setInt8(1, 245);
        console.log(dataview.getInt8(1));
        console.log("OK ?", dataview.buffer);

        const buffer = new ArrayBuffer(16);
        const view = new DataView(buffer, 0);

        view.setInt16(1, 245);
        console.log(view.getInt16(1)); // 42
    });
});
