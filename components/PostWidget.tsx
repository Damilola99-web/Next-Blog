import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getRecentPosts, getSimilarPosts } from '../services';
import { PostWidgetData, PostWidgetProps } from '../utils/interfaces';

export default function PostWidget({ categories, slug }: PostWidgetProps) {
	const [relatedPosts, setRelatedPosts] = useState<PostWidgetData[]>([]);

	useEffect(() => {
		if (slug && categories) {
			getSimilarPosts(categories, slug).then((result) =>
				setRelatedPosts(result)
			);
		} else {
			getRecentPosts().then((result) => setRelatedPosts(result));
		}
	}, [slug]);

	console.log({ relatedPosts });

	return (
		<div className=' bg-white shadow-lg rounded-lg p-8 mb-8'>
			<h3 className='text-xl mb-8 font-semibold border-b pb-4'>
				{slug ? 'Related Posts' : 'Recent posts'}
			</h3>
			{relatedPosts.map((post) => (
				<div
					key={post.title}
					className='flex items-center w-full mb-4'
				>
					<div className='w-16 flex-none'>
						<img
							src={post.featuredImage.url}
							alt={post.title}
							height='60px'
							width={'60px'}
							className='align-middle rounded-full w-[60px] h-[60px] object-cover'
						/>
					</div>
					<div className='flex-grow ml-4 '>
						<p className=' text-gray-500 font-xs'>
							{moment(post.createdAt).format('MMM DD, YYYY')}
						</p>
						<Link
							href={`/post/${post.slug}`}
							key={post.title}
							className='text-lg'
						>{ post.title}</Link>
					</div>
				</div>
			))}
		</div>
	);
}
