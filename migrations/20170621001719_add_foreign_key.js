exports.up = function(knex) {
return knex.schema.table('milestones', function(data) {
        data.integer('famous_person_id').unsigned().index().references('id').inTable('famous_people');
      });
};

exports.down = function(knex) {
  return knex.schema.dropColumn('famous_person_id');
};
