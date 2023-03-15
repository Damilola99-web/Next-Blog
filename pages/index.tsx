import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Categories from '../components/Categories';
import PostCard from '../components/PostCard';
import PostWidget from '../components/PostWidget';
import { getPosts } from '../services';
import { IndexProps } from '../utils/interfaces';

const Home = ({ posts }: IndexProps) => {
	if (!posts) {
		return (
			<div className='flex space-y-4 lg:space-y-0 lg:space-x-4 flex-col lg:flex-row self-center px-10 w-[80%]  bg-white rounded-lg shadow-lg p-10 lg:p-20 max-w-[850px]'>
				<img
					src='https://imgs.search.brave.com/RUP3yQq9yNCZBn8nKzzUNorqSSUChkB6iRvrFI3ozyE/rs:fit:390:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5x/SHViRlpUcVg0UVIt/U2lLb0taTFdRQUFB/QSZwaWQ9QXBp'
					alt=''
				/>
				<h1 className=' text-3xl text-center'>
					We're sorry for not being able to show our blog posts, we're
					unable to connect to our server at the moment, please try
					again later.{' '}
				</h1>
			</div>
		);
	} else {
		return (
			<div className='lg:container mx-auto px-5 md:px-10 mb-8'>
				<Head>
					<title>Rashtech Blog</title>
					<link
						rel='icon'
						href='/favicon.ico'
					/>
				</Head>
				<div className=' grid grid-cols-1 lg:grid-cols-12 gap-12'>
					<div className=' lg:col-span-8 col-span-1'>
						{posts.map((post, index) => (
							<PostCard
								post={post.node}
								key={post.node.title}
							></PostCard>
						))}
					</div>

					<div className='lg:col-span-4 col-span-1'>
						<div className='relative lg:sticky top-8'>
							<PostWidget />
							<Categories />
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default Home;

export async function getStaticProps() {
	const posts = (await getPosts()) || null;

	return {
		props: { posts },
	};
}
