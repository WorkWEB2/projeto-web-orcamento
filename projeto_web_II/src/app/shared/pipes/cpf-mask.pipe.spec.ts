import { CpfPipe } from './cpf-mask.pipe';

describe('CpfMaskPipe', () => {
  it('create an instance', () => {
    const pipe = new CpfPipe();
    expect(pipe).toBeTruthy();
  });
});
