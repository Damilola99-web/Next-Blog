import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getCategories } from '../services';
import { Categories } from '../utils/interfaces';
import Loading from './Loading';

export default function Header() {
	const [categories, setCategories] = useState<Categories[]>([]);

	useEffect(() => {
		getCategories()
			.then((newCategories) => setCategories(newCategories))
			.catch((err) => {
				console.log(err);
				setCategories([]);
			});
	}, []);

	return (
		<div className='lg:container w-full mx-auto px-10 mb-8'>
			<div className='border-b w-full inline-block border-blue-400 py-8'>
				<div className='md:float-left block'>
					<Link href={'/'}>
						<span className='cursor-pointer font-bold text-4xl text-white'>
							Rashtech-World
						</span>
					</Link>
				</div>
				<div className=' hidden lg:float-left lg:contents px-8'>
					{categories.map((category) => (
						<Link
							key={category.slug}
							href={`/category/${category.slug}`}
						>
							<span className='md: float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer transition duration-700 hover:translate-y-1 hover:scale-105'>
								{category.name}
							</span>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
