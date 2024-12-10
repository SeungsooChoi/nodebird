module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    // id는 기본으로 들어있음.
    content:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', // 한글 저장
  });
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
}