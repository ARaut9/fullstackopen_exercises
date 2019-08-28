const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  // map blogs array to only include blogs with necessary properties
  blogs = blogs.map(blog => {
    return {
      title: blog.title,
      author: blog.author,
      likes: blog.likes
    }
  })

  // keep track of the blog with most likes by comparing it with other blog items
  const reducer = (top, item) => {
    return item.likes > top ? item.likes : top
  }

  const mostLikes = blogs.reduce(reducer, 0)
  return blogs.find(blog => blog.likes === mostLikes)
}

const mostBlogs = blogs => {
  // create a set of authors names
  const setOfAuthors = new Set(blogs.map(blog => blog.author))
  // convert that set into an array
  const authors = [...setOfAuthors]
  const blogsByAuthors = []

  // iterate through authors array and calculate blogs for each author
  authors.forEach(author => {
    const numberOfBlogs = blogs.reduce((counter, blog) => {
      return blog.author === author ? ++counter : counter
    }, 0)
    blogsByAuthors.push({
      author,
      numberOfBlogs
    })
  })

  const mostBlogs = blogsByAuthors.reduce((top, author) => {
    return author.numberOfBlogs > top ? author.numberOfBlogs : top
  }, 0)
  return blogsByAuthors.find(author => author.numberOfBlogs === mostBlogs)
}

const mostLikes = blogs => {
  // create a set of authors names
  const setOfAuthors = new Set(blogs.map(blog => blog.author))
  // convert that set into an array
  const authors = [...setOfAuthors]
  const blogsByAuthors = []

  // iterate through authors array and calculate blogs for each author
  authors.forEach(author => {
    const likes = blogs.reduce((counter, blog) => {
      return blog.author === author ? counter + blog.likes : counter
    }, 0)
    blogsByAuthors.push({
      author,
      likes
    })
  })

  const mostNumberLikes = blogsByAuthors.reduce((top, author) => {
    return author.likes > top ? author.likes : top
  }, 0)
  return blogsByAuthors.find(author => author.likes === mostNumberLikes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}