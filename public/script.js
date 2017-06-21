function home(){
  window.location = '/'
}

function login(){
  window.location = '/login'
}

function logout(){
  window.location = '/logout'
}

function signup(){
  window.location = '/signup'
}

function review( albumId ){
  window.location = '/review/' + albumId
}

function profile( userId ){
  window.location = '/profile/' + userId
}

function deleteReview( reviewId ){
  if( confirm('Are you sure sure you want to delete this review?')){
    console.log('deleting',reviewId)
    window.location = '/review/delete/' + reviewId
  }
}
