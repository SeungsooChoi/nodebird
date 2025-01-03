module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define('Hashtag', {
    // id는 기본으로 들어있음.
    name:{
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', // 한글 저장
  });
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
  };
  return Hashtag;
}