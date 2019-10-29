import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderBru from '../Components/Header.js';
import Collapsible from 'react-collapsible';
import '../Styles/OrganizationDashboard.css';

export class OrganizationDashboard extends Component {
	
	handleNext() {}
	
	render() {
		return (
			<div className="background">
				<HeaderBru
              first='Welcome, Organization!'
              second='Settings'
              link2='/AccountSetting'
              third='Home'
			  link3="/Home"
			  link4="/Home"
              btn='Exit'
              color= '#01AFD8'
              clickHeaderBtn={this.handleNext.bind(this)}
            />
				<div className="organizationDashboard">
					<div className="organizationDashboardContents">
						<div className="organizationInstructorDiv">
							<h4>All Instructors</h4>
							<div className="scrollInstructorList">
								<form>
									Add Instructor: <br />
									<input type="text" name="instructor" />
									<input className="submitButton btn btn-primary" type="submit" value="Submit" />
								</form>
								<ul>
									<li>
										<div className="listRow">
											<p>John Smith (123@123.com) </p>
											<button className="small-round-button">-</button>
										</div>
									</li>
									<li className="oddDiv">
										<div className="listRow">
											<p>Pocahontas (123@123.com) </p>
											<button className="small-round-button">-</button>
										</div>
									</li>
									<li>
										<div className="listRow">
											<p>John Smith (123@123.com) </p>
											<button className="small-round-button">-</button>
										</div>
									</li>
									<li className="oddDiv">
										<div className="listRow">
											<p>Pocahontas (123@123.com) </p>
											<button className="small-round-button">-</button>
										</div>
									</li>
									<li>
										<div className="listRow">
											<p>John Smith (123@123.com) </p>
											<button className="small-round-button">-</button>
										</div>
									</li>
									<li className="oddDiv">
										<div className="listRow">
											<p>Pocahontas (123@123.com) </p>
											<button className="small-round-button">-</button>
										</div>
									</li>
									<li>
										<div className="listRow">
											<p>John Smith (123@123.com) </p>
											<button className="small-round-button">-</button>
										</div>
									</li>
									<li className="oddDiv">
										<div className="listRow">
											<p>Pocahontas (123@123.com) </p>
											<button className="small-round-button">-</button>
										</div>
									</li>
									<li>
										<div className="listRow">
											<p>John Smith (123@123.com) </p>
											<button className="small-round-button">-</button>
										</div>
									</li>
									<li className="oddDiv">
										<div className="listRow">
											<p>Pocahontas (123@123.com) </p>
											<button className="small-round-button">-</button>
										</div>
									</li>
									<li>
										<div className="listRow">
											<p>John Smith (123@123.com) </p>
											<button className="small-round-button">-</button>
										</div>
									</li>
									<li className="oddDiv">
										<div className="listRow">
											<p>Pocahontas (123@123.com) </p>
											<button className="small-round-button">-</button>
										</div>
									</li>
									<li>
										<div className="listRow">
											<p>John Smith (123@123.com) </p>
											<button className="small-round-button">-</button>
										</div>
									</li>
									<li className="oddDiv">
										<div className="listRow">
											<p>Pocahontas (123@123.com) </p>
											<button className="small-round-button">-</button>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div className="organizationLabDiv">
							<h4>All Lessons</h4>
							<ul className="listofOrganizationLabs">
								<li className="organizationCourseListing">
									<h5>Caramel Latte</h5>
									<Collapsible triggerWhenOpen="Collapse" trigger="Expand">
										<ul>
											<li>1. Get</li>
											<li>2. Drink</li>
											<li>3. Done</li>
										</ul>
									</Collapsible>
								</li>
								<li className="organizationCourseListing">
									<h5>Strawberry Green Tea</h5>
									<Collapsible triggerWhenOpen="Collapse" trigger="Expand">
										<ul>
											<li>1. Get</li>
											<li>2. Drink</li>
											<li>3. Done</li>
										</ul>
									</Collapsible>
								</li>
								<li className="organizationCourseListing">
									<h5>Mocha Frappuccino</h5>
									<Collapsible triggerWhenOpen="Collapse" trigger="Expand">
										<ul>
											<li>1. Get</li>
											<li>2. Drink</li>
											<li>3. Done</li>
										</ul>
									</Collapsible>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default OrganizationDashboard;
