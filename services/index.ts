import { request, gql } from 'graphql-request';
import {
	GetCategoriesResult,
	GetCommentsResult,
	GetPostDetailsResult,
	GetRecentPostResponse,
	GraphqlPostResponse,
} from '../utils/interfaces';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
	const query = gql`
		query MyQuery {
			postsConnection {
				edges {
					cursor
					node {
						author {
							bio
							name
							id
							photo {
								url
							}
						}
						createdAt
						slug
						title
						excerpt
						featuredImage {
							url
						}
						categories {
							name
							slug
						}
					}
				}
			}
		}
	`;

	try {
		const result: GraphqlPostResponse = await request(graphqlAPI!, query);

		return result.postsConnection.edges;
	} catch (error) {
		console.log(error);
	}
};

export const getRecentPosts = async () => {
	const query = gql`
		query GetPostDetails() {
			posts(
				orderBy: createdAt_ASC
				last: 3
			) {
				title
				featuredImage {
					url
				}
				createdAt
				slug
			}
		}
	`;

	const result: GetRecentPostResponse = await request(graphqlAPI!, query);

	return result.posts;
};

export const getSimilarPosts = async (categories: string[], slug: string) => {
	const query = gql`
		query GetPostDetails($slug: String!, $categories: [String!]) {
			posts(
				where: {
					slug_not: $slug
					AND: { categories_some: { slug_in: $categories } }
				}
				last: 3
			) {
				title
				featuredImage {
					url
				}
				createdAt
				slug
			}
		}
	`;

	const result: GetRecentPostResponse = await request(graphqlAPI!, query, {
		categories,
		slug,
	});

	return result.posts;
};

export const getCategories = async () => {
	const query = gql`
		query GetCategories {
			categories {
				name
				slug
			}
		}
	`;

	const result: GetCategoriesResult = await request(graphqlAPI!, query);

	return result.categories;
};
export const getComments = async (slug: string) => {
	const query = gql`
		query GetComments($slug: String!) {
			comments(where : {post: {slug : $slug}}) {
				name
				createdAt
				comment
			}
		}
	`;

	const result: GetCommentsResult = await request(graphqlAPI!, query, {
		slug,
	});

	return result.comments;
};

export const getPostDetails = async (slug: string) => {
	const query = gql`
		query GetPostDetails($slug: String!) {
			post(where: { slug: $slug }) {
				author {
					bio
					name
					id
					photo {
						url
					}
				}
				createdAt
				slug
				title
				excerpt
				featuredImage {
					url
				}
				categories {
					name
					slug
				}
				content {
					raw
				}
			}
		}
	`;

	const result: GetPostDetailsResult = await request(graphqlAPI!, query, {
		slug,
	});

	return result.post;
};

export const getCategoryPost = async (slug: string) => {
	const query = gql`
	  query GetCategoryPost($slug: String!) {
		postsConnection(where: {categories_some: {slug: $slug}}) {
		  edges {
			cursor
			node {
			  author {
				bio
				name
				id
				photo {
				  url
				}
			  }
			  createdAt
			  slug
			  title
			  excerpt
			  featuredImage {
				url
			  }
			  categories {
				name
				slug
			  }
			}
		  }
		}
	  }
	`;
  
	const result:GraphqlPostResponse = await request(graphqlAPI!, query, { slug });
  
	return result.postsConnection.edges;
  };
  