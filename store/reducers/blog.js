import {GET_BLOG} from "../actions/blog";
import {GET_BLOG_MATH} from "../actions/blog";

const initialState = {
  blogs: [],
  blogMath: []
}

const blogReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_BLOG:
      return {
        ...state,
        blogs : action.blogs
      }
    case GET_BLOG_MATH:
      return {
        ...state,
        blogMath : action.blogMath
      }
    default:
      return state
  }
}

export default blogReducer;
