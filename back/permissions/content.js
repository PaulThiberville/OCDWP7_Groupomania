function hasAccess(user, content) {
  console.log("HasAccess")
    return (
      user.role === "admin" ||
      content.UserId === user.id
    )
}
  
module.exports = {hasAccess};