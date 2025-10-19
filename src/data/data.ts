const PERSONAL = {
	name: 'Spencer Smith',
	first_name: 'Spencer',
	last_name: 'Smith',
	role: 'Software Engineer | Full Stack Developer',
	intro:
		'Full stack software developer with 3+ years of professional experience building enterprise applications in the fin tech space. Skilled in Java, Go, React, Node.js, Python and modern database technologies such as Postgres and MSSQL. Proven track record developing RAG systems, internal tooling, and customer-facing applications. Strong problem-solver who prioritizes code quality, user experience, and collaborative teamwork. Click on the button below to view projects inspired by some of my hobbies.',
	location: 'Seattle, Washington'
};

const SKILLS = {
	specializations: [
		'Software Engineering',
		'Data Engineering',
		'Full-Stack Development',
		'AI Engineering'
	],
	programmingLanguages: [
		'Python',
		'Java',
		'Go',
		'SQL',
		'NoSql',
		'HTML',
		'CSS',
		'JavaScript',
		'TypeScript'
	],
	technologies: [
		'SQL Server',
		'Svelte',
		'Sveltekit',
		'React',
		'Node.js',
		'MongoDB',
		'PostgreSQL',
		'Git'
	]
};

const CONTACT = {
	email: 'smith.spence13@gmail.com',
	github: 'https://github.com/cloudsmyth',
	linkedin: 'https://www.linkedin.com/in/spencer-alan-smith'
};

const NAVLIST = [
	{
		id: 1,
		title: 'Spencer Smith',
		href: '/'
	},
	{
		id: 2,
		title: 'About',
		href: '/about'
	},
	{
		id: 3,
		title: 'Projects',
		href: '/projects'
	},
	{
		id: 4,
		title: 'Interests',
		href: '/intrests'
	},
	{
		id: 5,
		title: 'Contact',
		href: '/contact'
	}
];

const ABOUT = {
	paragraphs: [''],
	experience: [
		{
			id: 1,
			company: 'Doorbird Part of ASSA ABLOY Group',
			jobTitle: 'Software Engineer',
			startDate: 'November 2022',
			endDate: 'Present',
			location: 'Berlin',
			description:
				'The Bird Home Automation GmbH develops and manufactures high-quality IP video door intercoms. Access control devices, indoor stations and accessories under the trademark DoorBird. It is a part of ASSA Abloy Group. Hands-on experience with Python, PHP, SQL and NoSQL Databases. Collaborate with cross-functional teams to define, design, and ship new features. Increased user engagement by 30% by redesigning the application interface and improving user experience. Designing and implementing RESTful APIs and microservices to support application functionality.',
			photo: { src: '/photos/assa_abloy.webp', alt: 'Logo ASSA ABLOY Group' }
		}
	],
	education: [
		{
			id: 1,
			school: 'Otto-von-Guericke University Magdeburg',
			degree: 'Master of Science in Data and Knowledge Engineering',
			graduationDate: '2024',
			photo: { src: '/photos/ovgu.png', alt: 'Otto-von' }
		}
	],
	skills: [
		'Python',
		'Java',
		'Go',
		'SQL',
		'JavaScript',
		'HTML',
		'CSS',
		'TypeScript',
		'SQL Server',
		'Svelte',
		'Sveltekit',
		'React',
		'Node.js',
		'MongoDB',
		'PostgreSQL',
		'Git'
	]
};

const PROJECTS = [
	{
		id: 1,
		title:
			'Segmenting Audio Data and Analyzing the Credibility of the Speaker with Gender and Emotion Detection',
		organization: 'OVGU, Magdeburg',
		year: '2023',
		type: 'Master Thesis',
		description:
			'Audio segmentation based on energy level of the audio and detecting the noise part. Classification of gender and emotion with deep learning. Analyzing the authenticity of the audio. Explainable data points in each audio modality to ensure AI explainability. Created a Framework (MFAF) tool to visualise and process audio.',
		photo: { src: '/photos/logo_fak_3.png', alt: 'Audio Segmentation' }
	}
];

const INTERESTS = {};

const DATA = {
	PERSONAL,
	SKILLS,
	CONTACT,
	NAVLIST,
	ABOUT,
	PROJECTS,
	INTERESTS
};

export default DATA;
