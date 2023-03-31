// here i'll make an array of objects
// that will list our technologies used as well as 
// images of those technologies.


export const techInfo = [
	{
		name: "OpenAI",
		description: `We used the natural language processing power of chatGPT to generate recipes based on the ingredients you have in your pantry. It's like having a personal chef who knows how to create well-balanced and delicious dishes while also taking into consideration your nutritional needs.`,
		image: `/images/OpenAI-logo.png`,
	},
	{
		name: "Spoonacular",
		description: `To give you the most accurate nutrient information, we leveraged Spoonacular and their food API. Every time you add an ingredient to your pantry, we pull up real-time nutrient facts with the help of the API. That way, you can be confident that you're making healthy choices.`,
		image: `/images/spoonacular-logo.png`,
	},
	{
		name: "ElevenLabs",
		description: `We wanted to make your recipe experience even more enjoyable, so we added a cool feature! Head to your Settings and try out our text-to-voice technology, powered by ElevenLabs. You can choose from different AI-generated voices, including some famous ones that you've probably heard before in the media. It's like having your own personal narrator for your cooking adventures!`,
		image: `/images/Eleven_Labs.png`,
	},
	{
		name: "MUI",
		description: `Material UI is a popular user interface library for React.js, which provides a set of reusable React components that implement Google's Material Design guidelines. Our project took advantage of MUI's theming support, responsive design, UI tools`,
		image: `/images/material-ui.png`,
	},
];