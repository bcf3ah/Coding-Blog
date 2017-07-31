import React, {Component} from 'react';
import {Link} from 'react-router';
import {ShareButtons} from 'react-share';

class HomeListItem extends Component {
	render(){
		let {post} = this.props;

		let shareURL = `http://www.cavemancoder.net/posts/${post.id}`;
		const {
			FacebookShareButton
		} = ShareButtons;

		return (
			<div className="column is-one-third">
				<div className="card">
					<div className="card-image">
						<figure className="image is-4by3">
							<img src={post.imageURL} alt="post-header" />
						</figure>
					</div>
					<div className="card-content">
						<div className="content">
							<strong>{post.title}</strong>
							<br />
							<br />
							<div className="level">
								<div className="level-left">
									<small>{post.createdAt}</small>
								</div>
								<div className="level-right">
									<small>{post.category}</small>
								</div>
							</div>
						</div>
					</div>
					<footer className="card-footer">
						 <Link to={`posts/${post.id}`} className="card-footer-item">Read</Link>
						 <a className="card-footer-item">
							 <FacebookShareButton
								 url={shareURL}
								 title={post.title}
								 picture={post.imageURL}>
								 Share
							 </FacebookShareButton>
						 </a>
					</footer>
				</div>
		 </div>
		);
	}
}

export default HomeListItem;
