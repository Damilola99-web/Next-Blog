// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default async function comments(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const graphqlClient = new GraphQLClient(graphqlAPI!, {
		headers: {
			authorization: `Bearer ${process.env.GRAPHCMS_PERMANENT_TOKEN}`,
		},
	});

	const query = gql`
		mutation CreateComment(
			$name: String!
			$email: String!
			$comment: String!
			$slug: String!
		) {
			createComment(
				data: {
					name: $name
					email: $email
					comment: $comment
					post: { connect: { slug: $slug } }
				}
			) {
				id
			}
		}
	`;

	try {
		const result = await graphqlClient.request(query, req.body);
		return res.status(200).send(result);
  } catch (error) {
    console.log(error)
		return res
			.status(500)
			.json({ message: 'Error while adding comments.' });
	}
}
