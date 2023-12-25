module.exports = {
   content: ['./src/**/*.{js,jsx,ts,tsx}'],
   theme: {
      extend: {
         colors: {
            'text-color-gray': '#8E8E8E',
            'text-color-black': '#262626',
            'bg-color-main': '#E5E5E5',
            'border-color': '#EFEFEF',
            'blue-color': '#0095F6',
            'gray-1': '#d9d9d9',
            'gray-2': '#959595',
            'gray-3': '#EFEFEF',
         },
         fontSize: {
            'default-font-size': ['14px', '18px'],
         },
         boxShadow: {
            'box-shadow': '0px 0px 9px rgba(0, 0, 0, 0.08)',
         },
         height: {
            'header-height': '60px',
         },
         margin: {
            height: '60px',
         },
         'min-height': {
            'min-height': 'calc(100vh_-_60px)',
         },
         screens: {
            ss: '375px',
         },
         keyframes: {
            fadeIn: {
               '0%': { opacity: '0' },
               '100%': { opacity: '1' },
            },
            scaleUp: {
               from: {
                  opacity: '0',
                  transform: 'scale(0)',
               },
               to: {
                  opacity: '1',
                  transform: 'scale(1)',
               },
            },
            slideInUp: {
               from: {
                  transform: 'translate3d(0, 100%, 0)',
                  opacity: '0',
               },
               to: {
                  transform: 'translate3d(0, 0, 0)',
                  opacity: '1',
               },
            },
         },
         animation: {
            fadeIn: 'fadeIn 0.3s ease-in-out ',
            slideInUp: 'slideInUp 0.3s ease-in-out ',
            scaleUp: 'scaleUp 0.3s ease-in-out',
         },
      },
   },
   plugins: [require('@tailwindcss/line-clamp')],
};
