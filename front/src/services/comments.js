const baseUrl = 'http://localhost:5000/api'
const {handleRefresh} = require('./auth')

const limits = 2

exports.getAllPostComments = async (postId,_offset, date) =>{
    try{
        await handleRefresh()
        const limit = limits
        const offset = _offset
        const user = JSON.parse(localStorage.getItem('user'))
        const rawResponse = await fetch(`${baseUrl}/comments/all/${postId}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+user.accessToken
          },
          body: JSON.stringify({offset,limit,date})
        })
        if(rawResponse.ok){
          const response = await rawResponse.json()
          return response
        }             
    }
    catch(error){
        console.log(error)
    }
  }

  exports.getOneComment = async (commentId) =>{
    try{
        await handleRefresh()
        const user = JSON.parse(localStorage.getItem('user'))
        const rawResponse = await fetch(`${baseUrl}/comments/${commentId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+user.accessToken
          }
        })
        if(rawResponse.ok){
          const response = await rawResponse.json()
          return response
        }             
    }
    catch(error){
        console.log(error)
    }
  }

  exports.createComment = async (postId, text) =>{
    try{
        await handleRefresh()
        const user = JSON.parse(localStorage.getItem('user'))
        const rawResponse = await fetch(`${baseUrl}/comments/create/${postId}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+user.accessToken
          },
          body: JSON.stringify({text})
        })
        if(rawResponse.ok){
          const response = await rawResponse.json()
          return response
        }             
    }
    catch(error){
        console.log(error)
    }
  }

  exports.editComment = async (commentId, text) =>{
    try{
        await handleRefresh()
        const user = JSON.parse(localStorage.getItem('user'))
        const rawResponse = await fetch(`${baseUrl}/comments/update/${commentId}`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+user.accessToken
          },
          body: JSON.stringify({text})
        })
        if(rawResponse.ok){
          const response = await rawResponse.json()
          return response
        }             
    }
    catch(error){
        console.log(error)
    }
  }

  exports.deleteComment = async (commentId) =>{
    try{
        await handleRefresh()
        const user = JSON.parse(localStorage.getItem('user'))
        const rawResponse = await fetch(`${baseUrl}/comments/delete/${commentId}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+user.accessToken
          }
        })
        if(rawResponse.ok){
          console.log("Comment Deleted !")
        }             
    }
    catch(error){
        console.log("CreateComment Error:",error)
    }
  }

