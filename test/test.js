const chai = require('chai');
const assert = chai.assert;
const app = require('../app.js');
const Array = app.Array;
const Object = app.Object;

suite('Unit tests', function() {
  suite('Array.prototype.equals(other): boolean', function() {
    test('Empty array equals empty array => true', function() {
      assert.isTrue([].equals([]));
    });

    test('Empty array equals non-empty array => false', function() {
      assert.isFalse([].equals([0]));
      assert.isFalse([].equals([1, 1, 1, 0]));
      assert.isFalse([].equals([[], []]));
      assert.isFalse([].equals(['joão', 'telefone', '234-5678', false]));
      assert.isFalse(
        [].equals([
          [
            [
              ['raul', 'endereço', 'av rio branco, 109', true],
              ['gabriela', 'endereço', 'rua alice, 10', true],
              ['paula', 'endereço', 'rua bob, 88', true],
              ['mariane', 'telefone', '234-5678', true],
              ['aline', 'telefone', '91234-5555', true],
              ['joão', 'telefone', '234-5678', false],
              ['fernando', 'faculdade', 'PUC', true],
              ['isabella', 'telefone', '56789-1010', true],
            ],
            [
              ['endereço', 'cardinality', 'one'],
              ['faculdade', 'cardinality', 'one'],
              ['telefone', 'cardinality', 'many'],
            ],
          ],
          [
            [
              ['fernando', 'endereço', 'av rio branco, 109', true],
              ['joão', 'telefone', '234-5678', true],
            ],
            [
              ['endereço', 'cardinality', 'one'],
              ['telefone', 'cardinality', 'many'],
            ],
          ],
          [
            [
              ['fernando', 'endereço', 'av rio branco, 109', true],
              ['joão', 'endereço', 'rua alice, 10', true],
              ['joão', 'endereço', 'rua bob, 88', true],
              ['joão', 'telefone', '234-5678', true],
              ['joão', 'telefone', '91234-5555', true],
              ['joão', 'telefone', '234-5678', false],
              ['fernando', 'telefone', '98888-1111', true],
              ['fernando', 'telefone', '56789-1010', true],
            ],
            [
              ['endereço', 'cardinality', 'one'],
              ['telefone', 'cardinality', 'many'],
            ],
          ],
          [[], []],
        ])
      );
      assert.isFalse(
        [].equals([
          { name: 'test', board_password: 'test-pass' },
          { name: 'general', board_password: 'admin' },
          { name: 'total_war', board_password: 'rome2' },
          { name: 'totalwar', board_password: 'twwii' },
          {
            name: 'test_board#3105851555884',
            board_password: 'test_board_password#3105851555884',
          },
          { name: 'end', board_password: 'fin' },
          { name: 'whatever', board_password: 'something' },
          { name: 'gibberish', board_password: 'babbling' },
          { name: '101010011101', board_password: '010101100010' },
        ])
      );
    });

    test('Non-empty array equals empty array => false', function() {
      const input = [
        [0],
        [1, 1, 1, 0],
        [[], []],
        ['joão', 'telefone', '234-5678', false],
        [
          [
            [
              ['raul', 'endereço', 'av rio branco, 109', true],
              ['gabriela', 'endereço', 'rua alice, 10', true],
              ['paula', 'endereço', 'rua bob, 88', true],
              ['mariane', 'telefone', '234-5678', true],
              ['aline', 'telefone', '91234-5555', true],
              ['joão', 'telefone', '234-5678', false],
              ['fernando', 'faculdade', 'PUC', true],
              ['isabella', 'telefone', '56789-1010', true],
            ],
            [
              ['endereço', 'cardinality', 'one'],
              ['faculdade', 'cardinality', 'one'],
              ['telefone', 'cardinality', 'many'],
            ],
          ],
          [
            [
              ['fernando', 'endereço', 'av rio branco, 109', true],
              ['joão', 'telefone', '234-5678', true],
            ],
            [
              ['endereço', 'cardinality', 'one'],
              ['telefone', 'cardinality', 'many'],
            ],
          ],
          [
            [
              ['fernando', 'endereço', 'av rio branco, 109', true],
              ['joão', 'endereço', 'rua alice, 10', true],
              ['joão', 'endereço', 'rua bob, 88', true],
              ['joão', 'telefone', '234-5678', true],
              ['joão', 'telefone', '91234-5555', true],
              ['joão', 'telefone', '234-5678', false],
              ['fernando', 'telefone', '98888-1111', true],
              ['fernando', 'telefone', '56789-1010', true],
            ],
            [
              ['endereço', 'cardinality', 'one'],
              ['telefone', 'cardinality', 'many'],
            ],
          ],
          [[], []],
        ],
        [
          { name: 'test', board_password: 'test-pass' },
          { name: 'general', board_password: 'admin' },
          { name: 'total_war', board_password: 'rome2' },
          { name: 'totalwar', board_password: 'twwii' },
          {
            name: 'test_board#3105851555884',
            board_password: 'test_board_password#3105851555884',
          },
          { name: 'end', board_password: 'fin' },
          { name: 'whatever', board_password: 'something' },
          { name: 'gibberish', board_password: 'babbling' },
          { name: '101010011101', board_password: '010101100010' },
        ],
      ];

      for (const [index, item] of input.entries()) {
        assert.isFalse(item.equals([]), `Failure at test ${index + 1}`);
      }
    });

    test('Array of primitives equals identical array of primitives => true', function() {
      assert.isTrue([0].equals([0]));
      assert.isTrue([101010011101].equals([101010011101]));
      assert.isTrue(
        [1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1].equals([
          1,
          0,
          1,
          0,
          1,
          0,
          0,
          1,
          1,
          1,
          0,
          1,
        ])
      );
    });
  });
});
