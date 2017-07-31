import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import {connect} from 'react-redux';

//Local Files
import '../styles/home.css';
import Header from './header';
import findAllPosts from '../queries/findAllPosts';
import HomeListItem from './homeListItem';
import * as actions from '../actions';
import Loading from './loading';



class Home extends Component {
	constructor(props){
			super(props);
			this.state = {
				useRedux: false
			}
	}

	renderBlogPosts(){
		if(!this.state.useRedux){
			return this.props.data.findAllPosts.map(post => {
				return (
					<HomeListItem key={post.title} post={post} />
				);
			})
		}

		if(this.state.useRedux){
			return this.props.posts.map(post => {
				return (
					<HomeListItem key={post.title} post={post} />
				);
			})
		}
	}

	filterCategories(e){
		this.props.getPosts(this.props.data.findAllPosts);
		this.props.filterPosts(e.target.innerHTML);
		this.setState({useRedux: true});

	}

	refetchAllPosts(){
			this.setState({useRedux: false});
			this.props.data.refetch();
	}

  render() {
		if(this.props.data.loading){
			return (
				<Loading />
			);
		}

    return (
			<div>
				<Header />
					<section className="hero is-fullheight is-primary is-bold home-page-hero">
						<div className='container'>
						 <div className="columns">
							 <div className="column is-one-quarter">
								 <aside className="menu">
									 <p className="menu-label" style={{color: 'white'}}>
										 Choose a category
									 </p>
									 <ul className="menu-list">
										 <li className="sideNav-link"><a onClick={this.refetchAllPosts.bind(this)} value="All">All</a></li>
										 <li className="sideNav-link"><a onClick={this.filterCategories.bind(this)} value="JavaScript">JavaScript</a></li>
										 <li className="sideNav-link"><a onClick={this.filterCategories.bind(this)} value="Online education">Online education</a></li>
										 <li className="sideNav-link"><a onClick={this.filterCategories.bind(this)} value="Technologies">Technologies</a></li>
										 <li className="sideNav-link"><a onClick={this.filterCategories.bind(this)} value="General">General</a></li>
									 </ul>
									 <p className="menu-label" style={{color: 'white'}}>
										 Links
									 </p>
									 <ul className="menu-list">
										  <li className="sideNav-link"><a href="http://www.bfitzsimmons.tech">Portfolio</a></li>
							        <li className="sideNav-link"><a href="https://github.com/bcf3ah">GitHub</a></li>
							        <li className="sideNav-link"><a href="https://www.linkedin.com/in/brianfitzsimmons1/">LinkedIn</a></li>
									 </ul>
								 </aside>
							 </div>
							 <div className='column is-three-quarters has-text-centered'>
								 <div className="columns is-multiline">
								 	{this.renderBlogPosts()}
								 </div>
							 </div>
						 </div>
					</div>
				</section>
      </div>
    );
  }
}

function mapStateToProps(state){
	return {
		posts: state.posts
	}
}

const HomeWithGQL = graphql(findAllPosts)(Home);

export default connect(mapStateToProps, actions)(HomeWithGQL);
