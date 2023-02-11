'use strict';

QUnit.module('Тестируем функцию plainify', function () {
	QUnit.test('plainify работает правильно', function (assert) {
		assert.deepEqual(plainify({foo: 'bar', baz: 42}), {'foo': 'bar', 'baz': 42});

		const nested1 = {
			deep: {
				foo: 'bar',
				baz: 42
			}
		};

		const plain1 = {
			'deep.foo': 'bar',
			'deep.baz': 42
		};

		assert.deepEqual(plainify(nested1), plain1);

		const nested2 = {
			deep: {
				foobar: 0,
				nested: {
					object: {
						fields: {
							foo: 42,
							bar: 42,
							baz: 42
						}
					}
				}
			}
		};

		const plain2 = {
			'deep.foobar': 0,
			'deep.nested.object.fields.foo': 42,
			'deep.nested.object.fields.bar': 42,
			'deep.nested.object.fields.baz': 42
		};

		assert.deepEqual(plainify(nested2), plain2);
	});

	QUnit.test('plainify работает правильно с функциями внутри', function (assert) {
		let functionToInputInObjects = function() {
			alert('hi')
		}

		assert.deepEqual(plainify({foo: 'bar', baz: 42, hi: functionToInputInObjects}), {'foo': 'bar', 'baz': 42, 'hi': functionToInputInObjects});

		const nested1 = {
			deep: {
				foo: 'bar',
				baz: 42
			},
			hi: functionToInputInObjects
		};

		const plain1 = {
			'deep.foo': 'bar',
			'deep.baz': 42,
			'hi': functionToInputInObjects
		};

		assert.deepEqual(plainify(nested1), plain1);

		const nested2 = {
			deep: {
				foobar: 0,
				nested: {
					object: {
						fields: {
							foo: 42,
							bar: 42,
							baz: 42,
							hi: functionToInputInObjects
						}
					}
				}
			}
		};

		const plain2 = {
			'deep.foobar': 0,
			'deep.nested.object.fields.foo': 42,
			'deep.nested.object.fields.bar': 42,
			'deep.nested.object.fields.baz': 42,
			'deep.nested.object.fields.hi': functionToInputInObjects
		};

		assert.deepEqual(plainify(nested2), plain2);
	});

	QUnit.test('plainify работает правильно с пустыми объектами', function (assert) {
		let plain = {}
		let nested = {}

		assert.deepEqual(plainify(nested), plain);
	});

	QUnit.test('plainify работает правильно с неподходящими значениями', function (assert) {
		assert.deepEqual(plainify(), {});
		assert.deepEqual(plainify(1), {});
		assert.deepEqual(plainify('abs'), {});
		assert.deepEqual(plainify(1.2), {});

		assert.deepEqual(plainify(true), {});
		assert.deepEqual(plainify(null), {});
		assert.deepEqual(plainify(undefined), {});

		assert.deepEqual(plainify(() => {alert(hi)}), {});
		
		assert.deepEqual(plainify(1,2,3), {});
	});
});
