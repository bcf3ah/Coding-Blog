import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import moment from 'moment';
import {browserHistory} from 'react-router';
import ReactQuill from 'react-quill';

//Local Files
import addPost from '../mutations/addPost';
import findAllPosts from '../queries/findAllPosts';
import '../styles/react-quill.css';

class AddPost extends Component {
	constructor(props){
			super(props);
			this.state = {
				title: '',
				imageURL: '',
				body: '',
				category: 'test'
			};
	}

	handleSubmit(){
		let createdAt = moment().format("MMM Do YY");
		this.props.mutate({
			variables: {
				title: this.state.title,
				imageURL: this.state.imageURL,
				body: this.state.body,
				createdAt,
				category: this.state.category
			},
			refetchQueries: [{
				query: findAllPosts
			}]
		}).then(()=>{
			browserHistory.push('/');
		})
	}

	selectCategory(e){
		this.setState({category: e.target.options[e.target.options.selectedIndex].value});
	}


  render() {
    return (
		<div className="container" style={{marginTop: 40}}>
			<div className="field">
			  <label className="label">Title</label>
			  <div className="control">
			    <input className="input" type="text" id="title" value={this.state.title} onChange={e => this.setState({title: e.target.value})}  />
			  </div>
			</div>


			<div className="field">
			  <label className="label">Category</label>
			  <div className="control">
			    <div className="select" onChange={this.selectCategory.bind(this)}>
			      <select>
							<option value="...">...</option>
							<option value="JavaScript">JavaScript</option>
			        <option ref='Online education' value="Online education">Online education</option>
							<option ref='Technologies' value="Technologies">Technologies</option>
							<option ref='General' value="General">General</option>
			      </select>
			    </div>
			  </div>
			</div>

			<div className="field">
			  <label className="label">Image URL</label>
			  <div className="control">
			    <input className="input" type="text" id="imageURL" value={this.state.imageURL} onChange={e => this.setState({imageURL: e.target.value})}   />
			  </div>
			</div>

			<div className="field">
			  <label className="label">Body</label>
			  <div className="control">
					<ReactQuill theme='snow' value={this.state.body}
	                  onChange={body => this.setState({body})} />
			  </div>
			</div>


			<div className="field is-grouped">
			  <div className="control">
			    <button className="button is-primary" onClick={this.handleSubmit.bind(this)}>Submit</button>
			  </div>
			</div>
		</div>
    );
  }
}

export default graphql(addPost)(AddPost);
