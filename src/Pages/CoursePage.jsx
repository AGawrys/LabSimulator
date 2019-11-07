import React, { Component } from 'react';
import ReactModal from "react-modal";
import Collapsible from 'react-collapsible';
import ListBuilder from "../Components/ListBuilder.jsx"
import "../Styles/bru.css"
import '../Styles/coursepage.css';
import HeaderBru from '../Components/Header.jsx';

/* const dummyStudents = [
	{id: "jason.dong@stonybrook.edu", value: "Jason Dong"},
	{id: "james.angeles@stonybrook.edu", value: "James Angeles"},
	{id: "agnieszka.gawrys@stonybrook.edu", value: "Agnieszka Gawrys"},
	{id: "steven.kuang@stonybrook.edu", value: "Steven Kuang"}
] */
const dummyStudents = [
	["Jason Dong", "jason.dong@stonybrook.edu"],
	["James Angeles", "jangles99@sbu.edu"],
	["Agnieszka Gawrys", "messiness@hotmail.com"], 
	["Steven Kuang", "W.H.O.M.E.G.A.L.O.L@gmail.com"], 
	["Wei Chen", "kmforward@yahoo.com"], 
	["Ying Zhang", "yi.zha_ng@aol.com"], 
	["Oscar Williams", "maldingman21@notcs.stonybrook.edu"] 
]

ReactModal.setAppElement("#root");

class CoursePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showAddStudentsModal : false
		};

		this.handleOpenAddStudents = this.handleOpenAddStudents.bind(this);
		this.handleCloseAddStudents = this.handleCloseAddStudents.bind(this);
		this.handleTest = this.handleTest.bind(this);
	}

	handleOpenAddStudents() {
		this.setState({
			showAddStudentsModal : true
		});
	}

	handleCloseAddStudents() {
		this.setState({
			showAddStudentsModal : false
		});
	}

	handleTest() {
		console.log("Test")
	}

	render() {
		if (this.state.showAddStudentsModal) {
			let body = document.getElementsByTagName("BODY")[0];
			body.classList.toggle("hidden")
		} else {
			let body = document.getElementsByTagName("BODY")[0];
			body.classList.remove("hidden")
		}

		return (
			<div className={"background"}>
				<HeaderBru
				first='Dashboard'
				link1="/InstructorDashboard"
				second='Settings'
				link2='/AccountSetting'
				third='Home'
				link3="/Home"
				btn='Exit'
				link4="/Home"
				color= '#01AFD8'
				/>
				<div className="studentDashboard">
					<div className="welcomeStudentDiv">
						<h3> Fall Seasonals 2019 </h3>
						<h5> Access Code: 4x8Y5 </h5>
					</div>
				</div>
				<div className="studentDashboardContents">

					<ReactModal	isOpen={this.state.showAddStudentsModal}
								contentLabel={"Add Students"}
					>
						<div className={"subheader"}>
							<h1>Add Student</h1>
						</div>
						<ListBuilder items={dummyStudents}
									 placeholder={"Search for Students"}
						/>
						<button onClick={this.handleCloseAddStudents}>Cancel</button>
						<button onClick={this.handleCloseAddStudents}>Done</button>
					</ReactModal>

					<div className="studentRecentLesson">
						<h4> Lessons </h4>
						<div className="studentAllLesson">
							<ol>
								<li className="courseListing">
									<h5> Chai Tea Latte </h5>
									<h6> 3/4 Students </h6>
									<button className="deleteButton"> Delete</button>
									<Collapsible triggerWhenOpen="Collapse" trigger="Expand">
										<ol>
											<li> James Angeles (Completed) 1 Attempt </li>
											<li> Steven Kuang </li>
											<li> Agnieszka Gawrys (Completed) 2 Attempts</li>
											<li> Jason Dong (Completed) 2 Attempts</li>
										</ol>
									</Collapsible>
								</li>
								<li className="courseListing">
									<h5> Pumpkin Spice Latte </h5>
									<h6> 3/4 Students </h6>
									<button className="deleteButton"> Delete</button>
									<Collapsible triggerWhenOpen="Collapse" trigger="Expand">
										<ol>
											<li> James Angeles (Completed) 3 Attempts </li>
											<li> Steven Kuang </li>
											<li> Agnieszka Gawrys (Completed) 1 Attempt</li>
											<li> Jason Dong (Completed) 2 Attempts</li>
										</ol>
									</Collapsible>
								</li>
								<li className="courseListing">
									<h5> Maple Pecan Latte </h5>
									<h6> 3/4 Students </h6>
									<button className="deleteButton"> Delete</button>
									<Collapsible triggerWhenOpen="Collapse" trigger="Expand">
										<ol>
											<li> James Angeles (Completed) 5 Attempts </li>
											<li> Steven Kuang </li>
											<li> Agnieszka Gawrys (Completed) 2 Attempts</li>
											<li> Jason Dong (Completed) 3 Attempts</li>
										</ol>
									</Collapsible>
								</li>
							</ol>
						</div>
					</div>
				</div>
				
				<div className="teacherDashboardContents">
					<div className="recentDrinksDiv">
						<div className="recentDrinkTop">
							<h4>Instructors</h4>
							<button className="buttonRound btn-primary">+</button>
						</div>
						<div className="recentDrinkBottom">
							<ol>
								<li> 
									<div className="listRow">
										<p> Richard McKenna </p>
										<button className="buttonRound btn-danger">-</button>
									</div>
								</li>
								<li> 
									<div className="listRow">
										<p> Eugene Stark </p>
										<button className="buttonRound btn-danger">-</button>
									</div>
								</li>
								<li> 
									<div className="listRow">
										<p> Kevin McDonnell </p>
										<button className="buttonRound btn-danger">-</button>
									</div>
								</li>
							</ol>
						</div>
					</div>
					
					<div className="recentLessonsDiv">
						
						<div className="recentLessonsTop">
							<h4>Students</h4>
							<button onClick={this.handleOpenAddStudents} className="buttonRound btn-primary">+</button>
						</div>
						<div className="recentDrinkBottom">
							<ol>
								<li> 
									<div className="listRow">
										<p> James Angeles </p>
										<button className="buttonRound btn-danger">-</button>
									</div>
								</li>
								<li> 
									<div className="listRow">
										<p> Steven Kuang </p>
										<button className="buttonRound btn-danger">-</button>
									</div>
								</li>
								<li> 
									<div className="listRow">
										<p> Agnieszka Gawrys </p>
										<button className="buttonRound btn-danger">-</button>
									</div>
								</li>
								<li> 
									<div className="listRow">
										<p>Jason Dong</p>
										<button className="buttonRound btn-danger">-</button>
									</div>
								</li>
							</ol> 
						</div>
					</div>
				</div>
				
			</div>
		);
	}
}

export default CoursePage;