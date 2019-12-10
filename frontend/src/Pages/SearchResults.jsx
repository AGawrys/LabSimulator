import React, { Component, useState, useEffect } from 'react';
import { ListGroup, Button, Spinner } from 'react-bootstrap';
import SearchBar from 'react-js-search';
import HeaderBru from '../Components/Header.jsx';
import Routes from '../utils/RouteConstants.js';
import axios from 'axios';
import { Container, Row, Col } from 'react-grid-system';



const links = {
	Account: '/account'
};

function SearchResultPage(props) {
	const [results, setResults] = useState(null);
	const query = props.computedMatch.params.query ? props.computedMatch.params.query : "";

	useEffect(() => {
		const route = Routes.SERVER + "searchLesson?name=" + query + "&email=" + props.email;
		axios.get(route).then(
			(response) => setResults(response.data),
			(error) => console.log(error)
		);
	}, [query]);

	if (results == null) {
		return null;
	}

	const resultComponent = results.length != 0
		? <SearchResults results={results} email={props.email}/>
		: <h2 className="m-0 font-weight-light text-secondary headings"> No Results Found! </h2>;

	return (
		<div className="background-container">
			<HeaderBru home={Routes.INSTRUCTOR_DASHBOARD} isLoggedIn={true} />
			<Container fluid>
				<div className="teacherDashboard">
					<div className="searchBarDiv">
						<h1 className="m-0 font-weight-light text-secondary headings">Results</h1>
						<SearchBar placeHolderText={'Search for Lesson'} onSearchButtonClick={(value) =>  {
							props.history.push(Routes.SEARCH + value);
						}}/>
					</div>
					{resultComponent}
				</div>
			</Container>
		</div>
	);
}

function SearchResults({results,email}) {
	const resultString = results.length === 1 ? " result found." : " results found.";
	return (
		<div>
			<h4 style={{"textAlign":"left"}} className="font-weight-light text-secondary headings"> 
				{results.length} {resultString} 
			</h4>
				<ListGroup>
					{
						results.map((result, index) => <SearchResult key={index} result={result} email={email}/>)
					}
				</ListGroup>
		</div>
	);
}

function SearchResult({result, email}) {
	const {lesson, datePublished} = result;
	const {name, lessonId,instructorEmail} = lesson;
	const parsedDate = new Date(datePublished);
	const [downloads, setDownloads] = useState(lesson.downloads);
	return (
		<ListGroup.Item> 
			<div className = "search-result-header">
				<strong><p> {name} </p></strong>
				<AddLessonButton lessonId={lessonId} email={email} downloads={downloads} setDownloads={setDownloads}/>
			</div>
			<p className="search-result-info m-0 font-weight-light text-secondary headings"> Instructor: {instructorEmail} </p>
			<p className="search-result-info m-0 font-weight-light text-secondary headings"> # of Downloads: {downloads} </p>
			<p className="search-result-info m-0 font-weight-light text-secondary headings"> Date Published: {parsedDate.toDateString()} </p>
	 	</ListGroup.Item>
 	);
}

function AddLessonButton({lessonId, email, downloads, setDownloads}) {
	const [isLoading, setLoading] = useState(false);
	const [isAdded, setAdded] = useState(false);
	const addLesson = () => {
		setLoading(true);
		const body = {
			lessonId: lessonId,
			email: email
		};
		axios.post(Routes.SERVER + 'cloneLesson/', body).then(
			(response) => {
				setAdded(true);
				setLoading(false);
				setDownloads(downloads + 1);
			},
			(error) => console.log(error),
		);
	}

	let icon;
	if  (isLoading) {
		icon = <Spinner style={{color:"black"}} as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
	}
	else if(isAdded) {
		icon = <i className="fa fa-check add-button" aria-hidden="true"></i>;
	}
	else {
		icon = <i className="fa fa-plus add-button" aria-hidden="true"></i>
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