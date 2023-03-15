import React from 'react';
import { LayoutProps } from '../utils/interfaces';
import Header from './Header';

export default function Layout({ children }: LayoutProps) {
	return (
		<div className=' flex flex-col items-center justify-center'>
			<Header />
			{children}
		</div>
	);
}
