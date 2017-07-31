import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import ReactHtmlParser from 'react-html-parser';
import {connect} from 'react-redux';
import moment from 'moment';
import {
  ShareButtons,
  generateShareIcon
} from 'react-share';



//Local Files
import findPost from '../queries/findPost';
import addComment from '../mutations/addComment';
import '../styles/postDetail.css';
import Header from './header';
import Loading from './loading';

class PostDetail extends Component {

	constructor(props){
		super(props);
		this.state = {
			authenticated: this.props.authenticated,
			commentBody: ''
		}
	}

	addComment(e){
		e.preventDefault();
		let createdAt = moment().format("MMM Do YY");
		let postId = this.props.data.findPost.id;
		this.props.mutate({
      variables: {
				body: this.state.commentBody,
				createdAt,
				postId
			}
    })
      .then(()=> this.props.data.refetch())
			.catch((error) => {
        console.log('there was an error sending the query', error);
      });

		this.setState({commentBody: ''});
	}

	renderComments(){
		return this.props.data.findPost.comments.map(comment => {
			return (
				<article className="media">
				  <div className="media-content">
				    <div className="content">
				      <p>
				        <strong>{comment.author.firstName} {comment.author.lastName}</strong> <small>- {comment.createdAt}</small>
				        <br />
								{comment.body}
				      </p>
				    </div>
				  </div>
				</article>
			);
		})
	}

	render(){
		let shareURL = `http://www.cavemancoder.net/${this.props.location.pathname}`;
		const {
			FacebookShareButton,
			LinkedinShareButton,
			TwitterShareButton
		} = ShareButtons;

		const FacebookIcon = generateShareIcon('facebook');
		const TwitterIcon = generateShareIcon('twitter');
		const LinkedinIcon = generateShareIcon('linkedin');

		if(this.props.data.loading){
			return (
				<Loading />
			);
		};

		let post = this.props.data.findPost;
		return (
			<div>
				<section className="hero is-danger">
					<div className="hero-head">
						<Header />
					</div>
					<div className="hero-body">
					 <div className="container has-text-centered">
						 <h1 className="title">{post.title}</h1>
					 </div>
				 </div>
				</section>
				<br/>
				<div className="container">
					<div className="columns">
						<div className="column is-one-third">
							<figure className="image is-square">
							  <img src={post.imageURL} alt="post" />
							</figure>
							<br/>
							<h2 className="subtitle">
								Published {post.createdAt}
							</h2>
							<h2 className="subtitle">
								Category: {post.category}
							</h2>
							<div className="columns">
								<div className="column is-one-third">
									<nav className="level">
										<div className="level-item has-text-centered sharer">
											<FacebookShareButton
												url={shareURL}
												title={post.title}
												picture={post.imageURL}>
												<FacebookIcon
													size={32}
													round />
											</FacebookShareButton>
										</div>
										<div className="level-item has-text-centered sharer">
											<TwitterShareButton
												url={shareURL}
												title={post.title}
												picture={post.imageURL}>
												<TwitterIcon
													size={32}
													round />
											</TwitterShareButton>
										</div>
										<div className="level-item has-text-centered sharer">
											<LinkedinShareButton
												url={shareURL}
												title={post.title}
												picture={post.imageURL}>
												<LinkedinIcon
													size={32}
													round />
											</LinkedinShareButton>
										</div>
									</nav>
								</div>
							</div>
						</div>
						<div className="column" style={{paddingLeft: 20, paddingRight: 20}}>
							<div>{ ReactHtmlParser(post.body) }</div>
							<hr />
							<div className="field">
							  <label className="label">{this.state.authenticated ? 'New Comment' : 'You must be signed in to comment'}</label>
							  <div className="control">
							    <textarea
										className="textarea"
										disabled={!this.state.authenticated}
									  value={this.state.commentBody}
									  onChange={e => this.setState({commentBody: e.target.value})}></textarea>
							  </div>
							</div>
							<div className="field">
							  <div className="control">
							    <button
										className="button is-primary"
                    disabled={!this.state.authenticated}
										onClick={this.addComment.bind(this)}>Submit</button>
							  </div>
							</div>
							<h3>{post.comments.length} {post.comments.length === 1 ? 'Comment' : 'Comments'}</h3>
							<br />
							{this.renderComments()}
						</div>
					</div>
				</div>
      </div>
		);
	}
}

function mapStateToProps(state){
	return {
		authenticated: state.auth.authenticated,
		currentUserFirstName: state.currentUserFirstName,
	  currentUserLastName: state.currentUserLastName
	}
}

const PostDetailWithGQL = compose(
	graphql(findPost, {
		options: (props) => {
			return {
				variables: {id: props.params.id}
			}
		}
	}),
	graphql(addComment)
)(PostDetail);

export default connect(mapStateToProps)(PostDetailWithGQL);
