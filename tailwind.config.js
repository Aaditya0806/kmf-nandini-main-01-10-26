/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',

   
      },
      colors:{
        primary:{
          main:"#074989",
          darker:"#082649",
          lighter:"#BADCFD",
          subtle:"#F0F7FF",
          gradient:"#074989"

        },
        secondary:{
          main:"#F9B613",
          darker:"#D4670B",
          lighter:"#FADB8D",
          subtle:"#FFF9EB",
          gradient:'#FFFCF7'
        },

        neutral:{
          dark1:"#3A3A3C",
          dark2:"#6B7588",
          dark3:"#8F90A6",
          dark4:"#C7C9D9",
          light1:"#DDE5E9",
          light2:"#EBEBF0",
          light3:"#F2F2F5",
          light4:"#FFFFFF",
        
        }
        ,

        light:{
          light1:'#DDE5E9',
          light2:'#EBEBF0',
          light3:'#F2F2F5',
          light4:'#FFFFFF'
        }

        
    },
    fontFamily: {
      josefin:["Josefin Sans", "sans-serif"],
      lato: ['Lato', 'sans-serif'],
      alfa:[ 'Oswald', 'sans-serif'],
      heading:["Unbounded", "sans-serif"],
      subheading:["Overlock SC", "sans-serif"]
      
    },
    width:{
      100: '411px',
    },
    
    },
  },
  plugins: [],
}
