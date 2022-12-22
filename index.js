const body = document.querySelector('body')


const creatingPostHTML = (title, text) => {
    const mainDivPost = document.createElement('div')
    mainDivPost.id = 'post'
    mainDivPost.className = 'post'
    const postTitle = document.createElement('h1')
    postTitle.className = 'post__title'
    postTitle.textContent = title
    const postText = document.createElement('p')
    postText.className = 'post__text'
    postText.textContent = text
    const postCommentsText = document.createElement('b')
    postCommentsText.className = 'post__comments-text'
    postCommentsText.innerText = 'Комментарии'
    body.append(mainDivPost)
    mainDivPost.append(postTitle, postText, postCommentsText)

    return mainDivPost
}



const creatingCommentHtml = (author, text) => {
    const postComment = document.createElement('div')
    postComment.className = 'post-comment';
    const commentAuthor = document.createElement('span')
    commentAuthor.className = 'post-comment__author';
    commentAuthor.textContent = author
    const commentText = document.createElement('span')
    commentText.className = 'post-comment__text'
    commentText.textContent = text
    postComment.append(commentAuthor, commentText)

    return postComment
}



const renderPost = async (id) => {
    try {
        const postResponses = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        const post = await postResponses.json()
        console.log(post)

        const commentsRespones = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
        const comments = await commentsRespones.json()
        console.log(comments)

        const postComments = document.createElement('div')
        postComments.className = 'post__comments';
        creatingPostHTML(post.title, post.body).append(postComments)

        comments.forEach(item => {
            const commentHTML = creatingCommentHtml(item.email, item.body)
            postComments.append(commentHTML)
        })
    } catch (error) {
        console.error(error)
    }

}

renderPost(1)