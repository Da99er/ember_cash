import { moduleForModel, test } from 'ember-qunit';

moduleForModel('my-local-storage', 'Unit | Serializer | my local storage', {
  // Specify the other units that are required for this test.
  needs: ['serializer:my-local-storage']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
