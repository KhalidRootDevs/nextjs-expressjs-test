/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',

      // Or if using `src` directory:
      './src/**/*.{js,ts,jsx,tsx,mdx}'
   ],
   daisyui: {
      themes: [
         {
            mytheme: {
               primary: '#6aed8b',

               secondary: '#7fefe6',

               accent: '#fcbdbe',

               neutral: '#2a2a37',

               'base-100': '#3f4850',

               info: '#49afc5',

               success: '#82e3d3',

               warning: '#fcba4f',

               error: '#ed6d5a'
            }
         }
      ]
   },
   plugins: [require('daisyui')]
};
