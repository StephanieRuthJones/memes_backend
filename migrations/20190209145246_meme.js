exports.up = function (knex, Promise) {
    return knex.schema.createTable('meme', table => {
        table.increments()
        table.text('url').notNullable().defaultsTo('')
        table.text('textLine1').notNullable().defaultsTo('')
        table.text('textLine2').notNullable().defaultsTo('')
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('meme')
};
