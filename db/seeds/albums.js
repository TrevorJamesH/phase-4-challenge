
exports.seed = function(knex, Promise) {
  return knex('albums').del()
    .then(function () {
      return knex('albums').insert([
        {id: 1, title: 'Malibu', artist: 'Anderson .Paak'},
        {id: 2, title: 'A Seat at the Table', artist: 'Solange Knowles'},
        {id: 3, title: 'Melodrama', artist: 'Lorde'},
        {id: 4, title: 'In Rainbows', artist: 'Radiohead'}
      ]);
    });
};
