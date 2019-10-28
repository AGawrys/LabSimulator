import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Collapsible from 'react-collapsible';
import '../Styles/OrganizationDashboard.css';

export class OrganizationDashboard extends Component {
	render() {
		return (
			<div className="background">
				<div className="organizationDashboard">
					<div className="welcomeOrganizationDiv">
						<h3>Welcome Organization!</h3>
						<Link to="/AccountSetting">
							<h5>Change Account Setting</h5>
						</Link>
					</div>
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
										John Smith (123@123.com){' '}
										<button type="button" class="deleteInstructorButton btn btn-danger">
											Delete
										</button>
									</li>
									<li className="oddDiv">
										Pocahontas (123@123.com){' '}
										<button type="button" class="deleteInstructorButton btn btn-danger">
											Delete
										</button>
									</li>
									<li>
										John Smith (123@123.com){' '}
										<button type="button" class="deleteInstructorButton btn btn-danger">
											Delete
										</button>
									</li>
									<li className="oddDiv">
										Pocahontas (123@123.com){' '}
										<button type="button" class="deleteInstructorButton btn btn-danger">
											Delete
										</button>
									</li>
									<li>
										John Smith (123@123.com){' '}
										<button type="button" class="deleteInstructorButton btn btn-danger">
											Delete
										</button>
									</li>
									<li className="oddDiv">
										Pocahontas (123@123.com){' '}
										<button type="button" class="deleteInstructorButton btn btn-danger">
											Delete
										</button>
									</li>
									<li>
										John Smith (123@123.com){' '}
										<button type="button" class="deleteInstructorButton btn btn-danger">
											Delete
										</button>
									</li>
									<li className="oddDiv">
										Pocahontas (123@123.com){' '}
										<button type="button" class="deleteInstructorButton btn btn-danger">
											Delete
										</button>
									</li>
									<li>
										John Smith (123@123.com){' '}
										<button type="button" class="deleteInstructorButton btn btn-danger">
											Delete
										</button>
									</li>
									<li className="oddDiv">
										Pocahontas (123@123.com){' '}
										<button type="button" class="deleteInstructorButton btn btn-danger">
											Delete
										</button>
									</li>
									<li>
										John Smith (123@123.com){' '}
										<button type="button" class="deleteInstructorButton btn btn-danger">
											Delete
										</button>
									</li>
									<li className="oddDiv">
										Pocahontas (123@123.com){' '}
										<button type="button" class="deleteInstructorButton btn btn-danger">
											Delete
										</button>
									</li>
									<li>
										John Smith (123@123.com){' '}
										<button type="button" class="deleteInstructorButton btn btn-danger">
											Delete
										</button>
									</li>
									<li className="oddDiv">
										Pocahontas (123@123.com){' '}
										<button type="button" class="deleteInstructorButton btn btn-danger">
											Delete
										</button>
									</li>
								</ul>
							</div>
						</div>
						<div className="organizationLabDiv">
							<h4>All Labs</h4>
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
								<li className="organizationCourseListing oddDiv">
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
