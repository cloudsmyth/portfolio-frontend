const PERSONAL = {
	name: 'Spencer Smith',
	first_name: 'Spencer',
	last_name: 'Smith',
	role: 'Software Engineer | Full Stack Developer',
	intro:
		'Welcome to my protfolio website! I made this site using Sveltekit and have taken insipration from some other super ' +
		'talented folks around the internet. Here, you can learn a little more about me ...' +
		'Click on the button below to check some TUIs I have built right from your web browser!',
	location: 'Seattle, Washington'
};

const ABOUT = {
	full_bio:
		'I am a full stack software developer with 3+ years of professional experience building enterprise applications in the fin tech space. ' +
		'I have been recently improving my skills in Java by digging deeper into the modular Maven project that is the main server for my day-to-day, while keeping up ' +
		'my React and Node skills with a unique fully JSON configurable frontend that serves up four distinct applications from a monorepo. ' +
		'My most recent project was to build and maintain a RAG system to help streamline the data gathering process during and after a loan origination system. ' +
		'This project has exposed me to a litany of different techniques that can be used to guide, utilize, and refine AI powered workflows, including when ' +
		"to push for a little more optimization from the LLM, and when to build out an intuitive human-in-the-loop interface to bridge a gap that can't quite be filled yet. " +
		'While I am not yet writing Go professionally, I have been committed to learning more about it with my time on the Boot.dev website and learning platform. ' +
		"I just recently acquired the title of 'Archmage', and have started to use what I have learned there to build some terminal applications for things I enjoy like Magic: The Gathering. " +
		'When I am not hanging out around my computer, I still enjoy creating with my hands. Whether it be an old reliable of building a new Lego set, or taking the plunge into ' +
		'the wonderful world of knitting with a beginner friendly Wobbles set, creating something from seemingly random parts will forever be a source of joy for me.'
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
		title: 'Terminal',
		href: '/terminal'
	},
	{
		id: 4,
		title: 'Projects',
		href: '/project'
	},
	{
		id: 5,
		title: 'Contact',
		href: '/contact'
	}
];

const DATA = {
	ABOUT,
	CONTACT,
	NAVLIST,
	PERSONAL,
	SKILLS
};

export default DATA;
