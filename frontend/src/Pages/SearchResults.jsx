import React, { Component, useState, useEffect } from 'react';
import { ListGroup, Button, Spinner } from 'react-bootstrap';
import SearchBar from 'react-js-search';
import HeaderBru from '../Components/Header.jsx';
import Routes from '../utils/RouteConstants.js';
import axios from 'axios';


const links = {
	Account: '/account'
};

function SearchResultPage(props) {
	const [results, setResults] = useState([]);
	const query = props.computedMatch.params.query ? props.computedMatch.params.query : "";

	useEffect(() => {
		const route = Routes.SERVER + "searchLesson?name=" + query + "&email=" + props.email;
		axios.get(route).then(
			(response) => setResults(response.data),
			(error) => console.log(error)
		);
	}, [query]);

	return (
		<div className="background-container">
			<HeaderBru home={Routes.INSTRUCTOR_DASHBOARD} isLoggedIn={true} />
			<div className="teacherDashboard">
				<div className="searchBarDiv">
					<h1 className="m-0 font-weight-light text-secondary headings">Results</h1>
					<SearchBar placeHolderText={'Search for Lesson'} onSearchButtonClick={(value) =>  {
						const route = Routes.SERVER + "search?" + value + "&email=" + props.email;
						props.history.push(route);
					}}/>
				</div>
				<div className="teacherDashboardContents">
					<ListGroup>
						{
							results.map((result) => <SearchResult result={result} email={props.email}/>)
						}
					</ListGroup>
				</div>
			</div>
		</div>
	);
}

function SearchResult({result, email}) {
	const {name, lessonId} = result;
	return (
		<ListGroup.Item> 
			<div className="listRow">
				<p> {name} </p>
				<AddLessonButton lessonId={lessonId} email={email}/>
			</div>
	 	</ListGroup.Item>
 	);
}

function AddLessonButton({lessonId, email}) {
	const [isLoading, setLoading] = useState(false);
	const [isAdded, setAdded] = useState(false);
	const addLesson = () => {
		setLoading(true);
		const body = {
			lessonId: lessonId,
			email: email
		};
		console.log(body);
		axios.post(Routes.SERVER + 'cloneLesson/', body).then(
			(response) => {
				setAdded(true);
				setLoading(false);
			},
			(error) => console.log(error),
		);
	}

	let icon;
	if  (isLoading) {
		icon = <Spinner style={{color:"black"}} as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
	}
	else if(isAdded) {
		icon = <i class="fa fa-check add-button" aria-hidden="true"></i>;
	}
	else {
		icon = <i class="fa fa-plus add-button" aria-hidden="true"></i>
	}

	return (
		<Button
			style={{background: 'transparent', border: 'none'}}
			disabled={isLoading || isAdded}
			onClick={!isLoading ? addLesson : null}
		>
			{icon}
		</Button>
	);
}

export default SearchResultPage;