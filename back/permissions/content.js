/**
 * This is used to check if an user have access to a content
 * @param {User} user
 * @param {*} content can be a Post or a Comment
 * @returns access
 */
function hasAccess(user, content) {
  return user.role === "admin" || content.UserId === user.id;
}

module.exports = { hasAccess };
