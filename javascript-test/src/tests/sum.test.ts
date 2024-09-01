import {describe, expect, test} from '@jest/globals';
import {sum, division} from '../index';

describe('Testing calculator functions', ()=>{

  describe('sum module', () => {
    test('adds 1 + 2 to equal 3', () => {
      expect(sum(1, 2)).toBe(3);
    });
  });


  describe('division module', () => {
    test('result on dividing 5 by 2', () => {
      expect(division(5, 2)).toStrictEqual({quotient : 2, remainder : 1});
    });
  });

})