import { RequestBody } from '../../../../src/core/api/RequestBody';
import { IsNotEmpty } from 'class-validator';


describe('RequestBody', () => {
    describe('constructor', () => {
        test('Should construct with the given input and set all values', () => {
            const r = new RequestBody({ a: 1 });
            expect(r['a']).toBe(1);
        });
        test('Should construct with the given input and set all values', () => {
            const r = new RequestBody({ a: 1 });
            expect(r['a']).toBe(1);
        });
    });
    describe('validate', () => {
        test('Should pass if no validators are defined', async () => {
            const r = new RequestBody();
            const e = await r.validate();
            expect(e).toBe(undefined);
        });
        test('Should pass if no validators are defined', async () => {
            class TestBody extends RequestBody {
                @IsNotEmpty() public value: string;
            }
            const r = new TestBody();
            try {
                await r.validate();
            } catch (error) {
                expect(error.name).toBe('ValidationException');
            }
        });
    });
});
