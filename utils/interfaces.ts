import { ReactElement } from 'react';

export interface Categories {
	name: string;
	slug: string;
}

export interface GetCategoriesResult {
	categories: Categories[];
}

export interface GetPostDetailsResult {
	post: PostDetail;
}
export interface AuthorProp {
	author: {
		bio?: string;
		name: string;
		id: string;
		photo?: {
			url: string;
		};
	};
}
export interface CommentFormProp {
	slug: string;
}
export interface CommentsProp {
	slug: string;
}

export interface PostDetail extends Post {
	content: {
		raw: string;
	};
}

export interface PostDetailProp {
	post: PostDetail;
}
export interface PostDetailPropTypeless {
	post: any;
}

export interface Comment {
	name: string;
	createdAt: Date;
	comment: string;
}

export interface GetCommentsResult {
	comments : Comment[]
}

export interface DirectPostResult {
	node: {
		author: {
			bio?: string;
			name: string;
			id: string;
			photo?: {
				url: string;
			};
		};
		createdAt: Date;
		slug: string;
		title: string;
		excerpt: string;
		featuredImage?: {
			url: string;
		};
		categories: {
			name: string;
			slug: string;
		}[];
	};
}

export interface Post {
	author: {
		bio?: string;
		name: string;
		id: string;
		photo?: {
			url: string;
		};
	};
	createdAt: Date;
	slug: string;
	title: string;
	excerpt: string;
	featuredImage?: {
		url: string;
	};
	categories: {
		name: string;
		slug: string;
	}[];
}

export interface GraphqlPostResponse {
	postsConnection: {
		edges: DirectPostResult[];
	};
}

export interface PostCardProps {
	post: Post;
}

export interface LayoutProps {
	children: ReactElement;
}
export interface IndexProps {
	posts: DirectPostResult[];
}
export interface PostWidgetProps {
	slug?: string;
	categories?: string[];
}

export interface PostWidgetData {
	title: string;
	featuredImage: {
		url: string;
	};
	createdAt: Date;
	slug: string;
}

export interface GetRecentPostResponse {
	posts: PostWidgetData[];
}
