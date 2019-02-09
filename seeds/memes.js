
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('meme').del()
    .then(function () {
      // Inserts seed entries
      return knex('meme').insert([
        { url: 'https://i.pinimg.com/originals/48/6c/ed/486cede996f7c04b40faf7552ec1eec2.jpg', textLine1: 'When you at da coffee shop', textLine2: '...and the barista says there\'s no cream' }
      ]);
    }).then(() => {
      return knex.raw(
        "SELECT setval('meme_id_seq', (SELECT MAX(id) FROM meme));"
      );
    });;
};
