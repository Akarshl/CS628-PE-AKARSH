import React from "react";
import "./Resume.css";

const Resume = () => {
  return (
    <div className="resume">
      <header className="header">
        <h1>Akarsh Lakshmana</h1>
        <p>
          4231 12th AVE NE | (206) 537-3935 | lakshmanaakarsh@cityuniversity.edu</p>
      </header>
      <section className="section">
        <h2>Education</h2>
        <div className="education">
          <h3>Master of Science in Computer Science</h3>
          <p>City University of Seattle | Jan 2025</p>

          <h3>Bachelor's of Engineering in Electronics and Communication Engineering</h3>
          <p>R V College of Engineering Bangalore | Aug 2016-2020</p>
          <p>GPA: 6.8/10</p>
        </div>
      </section>
	  <section className="section">
        <h2>Technical Skills</h2>
        <div className="technical-skills">
            <p>Cloud Platforms: AWS, GCP, AZURE</p>
            <p>Container Engine and Orchestration: Docker, Kubernetes and ECS</p>
            <p>Operating Systems: AmazonLinux, Ubuntu and Windows servers</p>
            <p>IaC Tools: Terraform</p>
			<p>Database Management: MySQL, MongoDB</p>
            <p>CI/CD Tools: Jenkins, Argo CD and Gitlab</p>
        </div>
      </section>
	  <section className="section">
        <h2>Work Experience</h2>
        <div className="experience">
          <h3>Cloud Devops Engineer 1</h3>
          <p>O9 Solutions, INC | Jul 2023 - Dec 2024</p>
          <p>Developed and maintained infrastructure for O9 Platform on multiple cloud environments.</p>
          <p>Implement and manage infrastructure as code through Terraform.</p>

          <h3>Cloud Engineer</h3>
          <p>42 Gears Mobility Systems | Jul 2020 - Jul 2023</p>
		  <p>Experienced working on AWS Cloud services: EC2, VPC, S3, IAM, RDS, Route53, MSK,EKS, ECR,ECS, Auto Scaling and CloudWatch.</p>
          <p>Administration of Linux and Windows servers.</p>
        </div>
      </section>
      <section className="section">
        <h2>Projects</h2>
        <div className="projects">
        <h3>Application Deployment</h3>
        <p>CI/CD project for automating software builds and deployments using Git, Terraform, Jenkins, Ansible, Docker, Kubernetes and AWS</p>
		    <p>
      Git Link:{" "}
      <a
        href="https://github.com/Akarshl/Assignment.git"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://github.com/Akarshl/Assignment.git
      </a>
    </p>

    <h3>UPSTAC Application</h3>
    <p>Deploying a microservice-architecture-based application, UPSTAC, to AWS.</p>
  </div>
</section>
</div>
  );
};
export default Resume;