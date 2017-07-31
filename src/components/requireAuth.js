import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

export default (WrappedComponent) => {
	class authHOC extends Component {

		componentWillMount(){
			if(this.props.currentUserRole !== 'admin'){
				browserHistory.push('/');
			}
		}

		componentWillUpdate(nextProps){
			if(nextProps.currentUserRole !== 'admin'){
				browserHistory.push('/');
			}
		}

		render(){
			return <WrappedComponent {...this.props} />
		}
	}

	function mapStateToProps(state){
		return {
			currentUserRole: state.currentUserRole
		}
	}

	return connect(mapStateToProps)(authHOC);
}
