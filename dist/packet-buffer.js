"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BIT_MASKS = [
    0, 1, 3, 7, 15, 31, 63, 127, 255, 511,
    1023, 2047, 4095, 8191, 16383, 32767, 65535, 0x1ffff, 0x3ffff, 0x7ffff,
    0xfffff, 0x1fffff, 0x3fffff, 0x7fffff, 0xffffff, 0x1ffffff, 0x3ffffff, 0x7ffffff, 0xfffffff, 0x1fffffff,
    0x3fffffff, 0x7fffffff, -1
];
/**
 * A wrapper class for providing read/write methods on top of
 * a Buffer.
 * @author Thomas Crane
 */
class PacketBuffer {
    /**
     * Creates a new `PacketBuffer` and initalizes the
     * wrapped buffer to the given `size`.
     * @param size The size of the buffer.
     */
    constructor(size = 1024) {
        this.bufferIndex = 0;
        this.data = Buffer.alloc(size);
    }
    /**
     * Reads a 4 byte integer from the buffer.
     */
    readInt32() {
        const result = this.data.readInt32BE(this.bufferIndex);
        this.bufferIndex += 4;
        return result;
    }
    /**
     * Writes a 4 byte integer to the buffer.
     * @param value The value to write.
     */
    writeInt32(value) {
        if (isNaN(value)) {
            value = 0;
        }
        this.bufferIndex = this.data.writeInt32BE(value, this.bufferIndex);
    }
    /**
     * Reads a 4 byte unsigned integer from the buffer.
     */
    readUInt32() {
        const result = this.data.readUInt32BE(this.bufferIndex);
        this.bufferIndex += 4;
        return result;
    }
    /**
     * Writes a 4 byte unsigned integer to the buffer.
     * @param value The value to write.
     */
    writeUInt32(value) {
        if (isNaN(value)) {
            value = 0;
        }
        this.bufferIndex = this.data.writeUInt32BE(value, this.bufferIndex);
    }
    /**
     * Reads a 2 byte integer from the buffer.
     */
    readShort() {
        const result = this.data.readInt16BE(this.bufferIndex);
        this.bufferIndex += 2;
        return result;
    }
    readUnsignedShortA() {
        return (this.readUnsignedByte() << 8) + (this.readByte() - 128 & 0xff);
    }
    // no idea what this is but i copied from elvarg hh
    readSignedWordBigEndianA() {
        let result = (this.readByte() - 128 & 0xff) + ((this.readByte() & 0xff) << 8);
        if (result > 32767) {
            result -= 0x10000;
        }
        return result;
    }
    readSignedWordBigEndian() {
        let result = (this.readByte() & 0xff) + ((this.readByte() & 0xff) << 8);
        if (result > 32767) {
            result -= 0x10000;
        }
        return result;
    }
    readSignedByteC() {
        return -this.readByte(); // ?
    }
    writeNeekerA(value) {
        this.bufferIndex = this.data.writeUInt8((value + 128) & 0xff, this.bufferIndex);
        this.bufferIndex = this.data.writeUInt8((value >> 8) & 0xff, this.bufferIndex);
    }
    writeNeekerB(value) {
        this.bufferIndex = this.data.writeUInt8((value >> 8) & 0xff, this.bufferIndex);
        this.bufferIndex = this.data.writeUInt8((value + 128) & 0xff, this.bufferIndex);
    }
    writeNeeker(value) {
        this.bufferIndex = this.data.writeUInt8(value & 0xff, this.bufferIndex);
        this.bufferIndex = this.data.writeUInt8((value >> 8) & 0xff, this.bufferIndex);
    }
    /**
     * Writes a 2 byte integer to the buffer.
     * @param value The value to write.
     */
    writeShort(value) {
        if (isNaN(value)) {
            value = 0;
        }
        this.bufferIndex = this.data.writeInt16BE(value, this.bufferIndex);
    }
    /**
     * Reads a 2 byte unsigned integer from the buffer.
     */
    readUnsignedShort() {
        const result = this.data.readUInt16BE(this.bufferIndex);
        this.bufferIndex += 2;
        return result;
    }
    /**
     * Writes a 2 byte unsigned integer to the buffer.
     * @param value The value to write.
     */
    writeUnsignedShort(value) {
        if (isNaN(value)) {
            value = 0;
        }
        this.bufferIndex = this.data.writeUInt16BE(value, this.bufferIndex);
    }
    /**
     * Reads a 1 byte integer from the buffer.
     */
    readByte() {
        const result = this.data.readInt8(this.bufferIndex);
        this.bufferIndex++;
        return result;
    }
    /**
     * Writes a 1 byte integer to the buffer.
     * @param value The value to write.
     */
    writeByte(value) {
        if (isNaN(value)) {
            value = 0;
        }
        this.bufferIndex = this.data.writeInt8(value, this.bufferIndex);
    }
    /**
     * Reads a 1 byte unsigned integer from the buffer.
     */
    readUnsignedByte() {
        const result = this.data.readUInt8(this.bufferIndex);
        this.bufferIndex++;
        return result;
    }
    /**
     * Writes a 1 byte unsigned integer to the buffer.
     * @param value The value to write.
     */
    writeUnsignedByte(value) {
        if (isNaN(value)) {
            value = 0;
        }
        this.bufferIndex = this.data.writeUInt8(value, this.bufferIndex);
    }
    /**
     * Reads a single byte from the buffer, returns `true` if the byte is `1` and `false` otherwise.
     */
    readBoolean() {
        const result = this.readByte();
        return result !== 0;
    }
    /**
     * Writes a single byte to the buffer. Writes `1` if the value is `true` and `0` otherwise.
     * @param value The value to write.
     */
    writeBoolean(value) {
        const byteValue = value ? 1 : 0;
        this.writeByte(byteValue);
    }
    /**
     * Reads a 4 byte floating point number from the buffer.
     */
    readFloat() {
        const result = this.data.readFloatBE(this.bufferIndex);
        this.bufferIndex += 4;
        return result;
    }
    /**
     * Writes a 4 byte floating point value to the buffer.
     * @param value The value to write.
     */
    writeFloat(value) {
        if (isNaN(value)) {
            value = 0;
        }
        this.bufferIndex = this.data.writeFloatBE(value, this.bufferIndex);
    }
    /**
     * Reads 2 bytes to get the length, then reads `length` bytes from the buffer.
     */
    readByteArray() {
        const arraylen = this.readShort();
        const result = new Array(arraylen);
        for (let i = 0; i < arraylen; i++, this.bufferIndex++) {
            result[i] = this.data[this.bufferIndex];
        }
        return result;
    }
    /**
     * Writes the length of the array as a 2 byte integer, then writes `length` bytes to the buffer.
     * @param value The value to write.
     */
    writeByteArray(value) {
        if (!value) {
            this.writeShort(0);
            return;
        }
        this.writeShort(value.length);
        for (let i = 0; i < value.length; i++, this.bufferIndex++) {
            this.data[this.bufferIndex] = value[i];
        }
    }
    /**
     * Reads 2 bytes to get the length, reads `length` bytes from the buffer, then converts
     * the result to a utf8 string.
     */
    readString() {
        const strlen = this.readShort();
        this.bufferIndex += strlen;
        return this.data.slice(this.bufferIndex - strlen, this.bufferIndex).toString('utf8');
    }
    /**
     * Writes the length of the string as a 2 byte integer, then writes the string to the buffer.
     * @param value The value to write.
     */
    writeString(value) {
        if (!value) {
            this.writeShort(0);
            return;
        }
        this.writeShort(value.length);
        this.bufferIndex += this.data.write(value, this.bufferIndex, value.length, 'utf8');
    }
    readRS2String() {
        let s = "";
        let b;
        while ((b = this.readByte()) != 10) {
            s += String.fromCharCode(b);
        }
        return s;
    }
    writeRS2String(value) {
        this.bufferIndex += this.data.write(value, this.bufferIndex, value.length, 'utf8');
        this.writeByte(10);
    }
    /**
     * The same as `readString()`, but reads 4 bytes for the length.
     */
    readStringUTF32() {
        const strlen = this.readInt32();
        this.bufferIndex += strlen;
        return this.data.slice(this.bufferIndex - strlen, this.bufferIndex).toString('utf8');
    }
    /**
     * The same as `writeString()`, but writes 4 bytes for the length.
     * @param value The value to write.
     */
    writeStringUTF32(value) {
        if (!value) {
            this.writeInt32(0);
            return;
        }
        this.writeInt32(value.length);
        this.bufferIndex += this.data.write(value, this.bufferIndex, value.length, 'utf8');
    }
    /**
     * Changes the size of the buffer without affecting the contents.
     * @param newSize The new size of the buffer.
     */
    resizeBuffer(newSize) {
        if (newSize < this.data.length) {
            this.data = this.data.slice(0, newSize);
        }
        else if (newSize > this.data.length) {
            this.data = Buffer.concat([this.data, Buffer.alloc(newSize - this.data.length)], newSize);
        }
    }
    /**
     * Resets the `bufferIndex` to `0` and allocates a fresh buffer of length 1024 to the underlying buffer.
     */
    reset() {
        this.bufferIndex = 0;
        this.data = Buffer.alloc(1024);
    }
    /**
     * Bit handlers
     */
    initBitAccess() {
        this.bitPosition = this.bufferIndex * 8;
    }
    readBits(i) {
        let k = this.bitPosition >> 3;
        let l = 8 - (this.bitPosition & 7);
        let i1 = 0;
        this.bitPosition += i;
        for (; i > l; l = 8) {
            i1 += (this.data[k++] & BIT_MASKS[l]) << i - l;
            i -= l;
        }
        if (i == l)
            i1 += this.data[k] & BIT_MASKS[l];
        else
            i1 += this.data[k] >> l - i & BIT_MASKS[i];
        return i1;
    }
    finishBitAccess() {
        this.bufferIndex = (this.bitPosition + 7) / 8;
    }
}
exports.PacketBuffer = PacketBuffer;
