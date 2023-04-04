// here i'll make an array of objects
// that will list our technologies used as well as 
// images of those technologies.


export const techInfo = [
  {
    name: 'OpenAI',
    description: `We used the natural language processing power of chatGPT to generate recipes based on the ingredients you have in your pantry. It's like having a personal chef who knows how to create well-balanced and delicious dishes while also taking into consideration your nutritional needs.`,
    image: `/images/chatboy.png`,
  },
  {
    name: 'Spoonacular',
    description: `To give you the most accurate nutrient information, we leveraged Spoonacular and their food API. Every time you add an ingredient to your pantry, we pull up real-time nutrient facts with the help of the API. That way, you can be confident that you're making healthy choices.`,
    image: `/images/spoonacular-logo.png`,
  },
  {
    name: 'ElevenLabs',
    description: `We wanted to make your recipe experience even more enjoyable, so we added a cool feature! Head to your Settings and try out our text-to-voice technology, powered by ElevenLabs. You can choose from different AI-generated voices, including some famous ones that you've probably heard before in the media. It's like having your own personal narrator for your cooking adventures!`,
    image: `/images/Eleven_Labs.png`,
  },
  {
    name: 'MUI',
    description: `Material UI is a popular user interface library for React.js, which provides a set of reusable React components that implement Google's Material Design guidelines. Our project took advantage of MUI's theming support, responsive design, UI tools`,
    image: `/images/material-ui.png`,
  },
  {
    name: 'Next.js',
    description:
		  'Next.js is a popular open-source React framework used for building scalable, production-ready web applications. It provides many features and benefits, such as server-side rendering, automatic code splitting, easy page routing, and optimized performance. We really enjoyed using its connection to Vercel, which helped us deploy the first version of the app, and the page routing functionality',
	image: '/images/nextjs.png'
	},
	{
		name: 'Supabase',
		description: `Supabase is an open-source backend as a service (BaaS) platform designed to simplify the process of building and deploying applications. It provides a range of services such as database management, authentication, authorization, and real-time data syncing, all accessible through a simple API or web interface. Supabase is built on top of PostgreSQL and leverages its power and scalability. We utilized Supabase's easy to use authentication system to incorporate our Google sign-in feature.`,
		image: '/images/supabase.png'
  }
];