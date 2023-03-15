import Image from 'next/image';
import React from 'react';
import { AuthorProp } from '../utils/interfaces';

const Author = ({ author }: AuthorProp) => {
	return (
		<div className='text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-25 flex flex-col items-center justify-center'>
			<div className=' absolute left-0 right-0 -top-14 flex items-center justify-center'>
				<Image
					unoptimized
					width={'100'}
					height={'100'}
					src={author.photo?.url!}
					alt={author.name}
					className='align-middle rounded-full w-[100px] h-[100px] object-cover bg-white'
				/>
			</div>
			<h3 className='text-white my-4 text-xl font-bold'>{author.name}</h3>
			<p className='text-white text-lg max-w-[550px] text-center'>
				{author.bio}
			</p>
		</div>
	);
};

export default Author;
