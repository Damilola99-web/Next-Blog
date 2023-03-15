import moment from 'moment';
import React from 'react';
import { Comment } from '../utils/interfaces';
import parse from 'html-react-parser';

export default function CommentCard({ comment }: { comment: Comment }) {
	return (
		<div className=' border-b border-gray-100 mb-4 pb-4'>
			<p className='mb-4'>
				<span className=' font-semibold capitalize'>{comment.name}</span> on{' '}
				{moment(comment.createdAt).format('MMM DD,YYYY')}
			</p>
			<p className='whitespace-pre-line text-gray-600 w-full'>
				{parse(comment.comment)}
			</p>
		</div>
	);
}
