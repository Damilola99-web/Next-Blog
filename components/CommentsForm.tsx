import React, { useEffect, useState } from 'react';
import { CommentFormProp } from '../utils/interfaces';
import Loading from './Loading';

export default function CommentsForm({ slug }: CommentFormProp) {
	const [error, setError] = useState<null | string>(null);
	const [showSuccess, setShowSuccess] = useState(false);
	const [comment, setComment] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [storeData, setStoreData] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setEmail(localStorage.getItem('email') || '');
		setName(localStorage.getItem('name') || '');
	}, []);

	const handleCommentSubmission = async (e: any) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);
		if (!comment || !name || !email) {
			setError('All fields are required');
			setIsLoading(false);
			return;
		}

		const commentObj = {
			name,
			email,
			comment,
			slug,
		};

		if (storeData) {
			localStorage.setItem('name', name);
			localStorage.setItem('email', email);
		} else {
			localStorage.removeItem('name');
			localStorage.removeItem('email');
		}

		submitComment(commentObj)
			.then((res) => {
				setIsLoading(false);
				setShowSuccess(true);
				setComment('');
				setTimeout(() => {
					setShowSuccess(false);
				}, 3000);
			})
			.catch((err) => {
				setIsLoading(false);
				setError(err.message);
				setComment('');
			});
	};

	return (
		<form
			onSubmit={handleCommentSubmission}
			className=' bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'
		>
			<h3 className='text-xl mb-8 font-semibold border-b pb-4'>
				Leave a Comment
			</h3>
			<div className='grid grid-cols-1 gap-4 mb-4'>
				<textarea
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					placeholder='Add comment here.'
					name='comment'
					className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
				/>
			</div>
			<div className='grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2'>
				<input
					type='text'
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder='Your name goes here.'
					name='name'
					className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
				/>

				<input
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder='Enter your email here.'
					name='email'
					className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
				/>
			</div>
			<div className=' grid grid-cols-1 gap-4 mb-4'>
				<div>
					<input
						type='checkbox'
						onClick={(e) => setStoreData(e.currentTarget.checked)}
						id='storeData'
						name='storeData'
						checked={storeData}
					/>
					<label
						className='text-gray-500 cursor-pointer ml-2'
						htmlFor='storeData'
					>
						Save my e-mail and Name for later
					</label>
				</div>
			</div>
			{error && (
				<p className='text-md text-red-500 font-semibold'>{error}</p>
			)}
			<div className=' mt-8'>
				<button
					disabled={isLoading}
					className='transition disabled:opacity-50 duration-500 ease hover:bg-indigo-900 bg-pink-600 rounded-full px-8 py-3 cursor-pointer flex items-center justify-center space-x-3'
					type='submit'
				>
					<span className='text-lg text-white'>Post Comment</span>
					{isLoading && <Loading />}
				</button>
				{showSuccess && (
					<span className='text-xl float-right font-semibold mt-3 text-green-500'>
						Comment submitted for review
					</span>
				)}
			</div>
		</form>
	);
}

export const submitComment = async (obj: {
	name: any;
	email: any;
	comment: any;
	slug: string;
}) => {
	try {
		const result = await fetch('/api/comments', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(obj),
		});

		if (!result.ok) {
			throw new Error('Error while adding comment');
		}
		return result.json();
	} catch (error) {
		console.log(error);
		throw new Error('Error while adding comment');
	}
};
