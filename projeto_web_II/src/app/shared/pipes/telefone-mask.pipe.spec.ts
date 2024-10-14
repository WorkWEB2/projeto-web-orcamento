import { TelefonePipe } from './telefone-mask.pipe';

describe('TelefoneMaskPipe', () => {
  it('create an instance', () => {
    const pipe = new TelefonePipe();
    expect(pipe).toBeTruthy();
  });
});
