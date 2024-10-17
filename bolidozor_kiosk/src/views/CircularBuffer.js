export class CircularBuffer {
    constructor(size) {
        this.size = size;
        this.buffer = new Array(size);
        this.start = 0;
        this.end = 0;
        this.full = false;
    }

    append(data) {
        this.buffer[this.end] = data;
        if (this.full) {
            this.start = (this.start + 1) % this.size;  // Posuneme začátek
        }
        this.end = (this.end + 1) % this.size;  // Posuneme konec
        this.full = this.end === this.start;
    }

    slice(start, end) {
        // Oprava pro případ, kdy jsou indexy mimo rozsah
        if (start < 0) start = 0;
        if (end > this.size) end = this.size;
        if (start >= end) {
            throw new Error("Invalid slice range");
        }
    
        let result = [];
        for (let i = start; i < end; i++) {
            result.push(this.buffer[i % this.size]);
        }
        return result;
    }

    get fillEdge() {
        return this.full ? this.size : this.end;
    }
}
