import gql from "graphql-tag";
import client from "../../components/ApolloClient";

export const GET_BLOG = "GET_PRODUCTS";
export const GET_BLOG_MATH = "GET_BLOG_MATH"
const BLOG_QUERY = gql `query GetAllPosts {
  posts(where: {tag: "FR"}) {
    nodes {
      id
      title
      featuredImage {
        node {
          title
          uri
          sourceUrl
          srcSet
        }
      }
      excerpt
    }
  }
}`;

const QUERY_MATH = gql `query GetPostById {
  post(id: "cG9zdDo1MDYx") {
    title
    content
     featuredImage {
        node {
          title
          uri
          sourceUrl
          srcSet
        }
      }
      }
 }`;




export const getBlogs = () => {
  return async dispatch => {
    const result = await client.query({query: BLOG_QUERY});
    const blogs = result.data.posts.nodes;
    dispatch({
      type: GET_BLOG,
      blogs,
    })
  }
};

export const getBlogMath = () => {
  return async dispatch => {
    const result = await client.query({query: QUERY_MATH});
    const blogMath = result.data.post.content;
    dispatch({
      type: GET_BLOG_MATH,
      blogMath,
    })
  }
};
