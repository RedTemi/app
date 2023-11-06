import { getCycleNo } from '@Utils/utils';

describe('getCycleNo', () => {
  it('should return cycle number to which session belongs to', () => {
    expect(getCycleNo(1, [])).toEqual(1);
    expect(getCycleNo(6, [7, 5, 2])).toEqual(2);
    expect(getCycleNo(2, [6, 4, 2])).toEqual(3);
    expect(getCycleNo(2, [1])).toEqual(1);
    expect(getCycleNo(7, [4, 2])).toEqual(1);
    expect(getCycleNo(3, [4, 2])).toEqual(2);
    expect(getCycleNo(1, [4, 2])).toEqual(3);
  });
});
