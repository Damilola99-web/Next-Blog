import React, { useEffect, useState } from 'react';
import { getComments } from '../services';
import { Comment, CommentsProp } from '../utils/interfaces';
import CommentCard from './CommentCard';
import CommentCatd from './CommentCard';

export default function Comments({ slug }: CommentsProp) {
	const [comments, setComments] = useState<Comment[]>([]);

	useEffect(() => {
		getComments(slug)
			.then((result) => {
				setComments(result);
			})
			.catch((error) => {
				console.log(error);
				setComments([]);
			});
	}, []);

	return (
		<>
			{comments.length > 0 && (
				<div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
					<h3 className='text-xl mb-8 font-semibold border-b pb-4'>
						{comments.length}
						{' '}Comments
					</h3>
					{comments.map((comment) => (
						<CommentCard key={comment.createdAt.toString()} comment={comment} />
					))}
				</div>
			)}
		</>
	);
}
