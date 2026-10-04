import homeIco from '../images/icons/home.svg';
 
import ourproductIco from '../images/icons/ourproducts.svg';
 
import milkUnionIco from '../images/icons/milk-union.svg';
import { IoHomeOutline } from 'react-icons/io5';
 



export const mobileHeader = {
  en: [
    {
      title: <IoHomeOutline size={20} />,
      link: '/',
      imgUrl: homeIco.src
    },

    {
      title: 'ABOUT US',
      link:'/en/about/company-profile',
      subItems: [
        {
          title: 'Company Profile',
          link: '/en/about/company-profile'
        },

        {
          title:'Our Purpose',
          link:'/en/about/mission-vision'
        },
       
        {
          title: 'Organization Chart',
          link: '/en/about/organization-chart'
        },
        {
          title: 'Mile Stones',
          link: '/en/about/mile-stones'
        },
        
        {
          title: 'Board of Directors',
          link: '/en/directors'
        },
        {
          title: 'KMF Executives',
          link: '/en/executive'
        },
        {
          title: 'Careers & Recruitment',
          link: '/en/careers',
          desktopOnly: true
        },
  
      ]
    },

    {
      title: 'KMF PORTFOLIO',
      link: '/en/portfolio',
      imgUrl: homeIco.src
    },

    {
      title: 'MILK UNION',
      
      // subItems: [
      //   {
      //     title: 'Bangalore Milk Union',
      //     link: ''
      //   },
      //   {
      //     title: 'Haveri Milk Union',
      //     link: ''
      //   },
      //   {
      //     title: 'Belagavi Milk Union',
      //     link: ''
      //   },
      //   {
      //     title: 'Ballari Milk Union',
      //     link: ''
      //   },
      //   {
      //     title: 'Vijayapura Milk Union',
      //     link: ''
      //   },
      //   {
      //     title: 'Chamranjanagra Milk Union',
      //     link: ''
      //   },
      //   {
      //     title: 'D.K Milk Union',
      //     link: ''
      //   },
      //   {
      //     title: 'Dharwad Milk Union',
      //     link: ''
      //   },
      //   {
      //     title: 'Hassan Milk Union',
      //     link: ''
      //   },
      //   {
      //     title: 'KalaburgiMilk Union',
      //     link: ''
      //   },
      //   {
      //     title: 'Kolar Milk Union',
      //     link: ''
      //   },
      //   {
      //     title: 'MandyaMilk Union',
      //     link: ''
      //   },
      //   {
      //     title: 'Mysuru Milk Union',
      //     link: ''
      //   },
      //   {
      //     title: 'Shivamogga Union',
      //     link: ''
      //   },

      //   {
      //     title: 'Tumakuru Milk Union',
      //     link: ''
      //   },

      //   {
      //     title: 'Chikkaballapura Milk Union',
      //     link: ''
      //   }
      // ],
      link: '/en/milk-union',
      imgUrl: milkUnionIco.src
    },

    {
      title: 'KMF UNIT',
      link:'/en/kmf-unit'
       
      // subItems: [
      //   {
      //     title: 'KMF Corporate Office',
      //     link: ''
      //   },
      //   {
      //     title: 'Training Centers',
      //     link: ''
      //   },
      //   {
      //     title: 'Mother Dairy',
      //     link: ''
      //   },
      //   {
      //     title: 'Nandhini Hi Tech',
      //     link: ''
      //   },
      //   {
      //     title: 'Nandhini Milk Products',
      //     link: ''
      //   },
      //   {
      //     title: 'Cattle Feed Plants',
      //     link: ''
      //   },
      //   {
      //     title: 'Nandhini Packaging Film Plant',
      //     link: ''
      //   },
      //   {
      //     title: 'KMR Dempo Dairy Limited',
      //     link: ''
      //   },
      //   {
      //     title: 'Ice Cream Plant Ballari',
      //     link: ''
      //   },
      //   {
      //     title: 'KMF Depots',
      //     link: ''
      //   },
      //   {
      //     title: 'Nandhini Mega HI-Tech Plant',
      //     link: ''
      //   }
      // ]
    },

    {
      title: 'OUR PRODUCTS',
      link: '/en/our-product',
      subItems: [
        {
          title: "Products",
          link: '/en/our-product'
        },
        {
          title: "Nandini Recipes",
          link: '/en/nandini-recipes'
        },
        {
          title: "Bulk Order",
          link: '/en/contact?category=bulk-order'
        },
        {
          title: "Dealership & Franchise",
          link: '/en/dealership'
        },
        {
          title: "Notify Me When Available",
          link: '/en/notify-me'
        },
        {
          title: "File a Complaint",
          link: '/en/complaint'
        },
       

        
      ],
      imgUrl: homeIco.src
    },


    {
      title: 'QUALITY AND FOOD SAFETY',
      link: '/en/about/quality-food'
    },
    {
      title: 'ANIMAL HUSBANDRY',
      link: '/en/animal-husbandry/procurement',
      subItems: [
        {
          title: "Procurement",
          link: '/en/animal-husbandry/procurement'
        },
        {
          title: "Animal Health",
          link: '/en/animal-husbandry/animal-health'
        },
        {
          title: "Animal Breeding Program",
          link: '/en/animal-husbandry/animal-breeding'
        },
        {
          title: "Fodder Activities",
          link: '/en/animal-husbandry/feed-and-fodder'
        },
  
        {
          title: "Schemes/Grants",
          link: '/en/animal-husbandry/scheme'
        },
        {
          title: "Step",
          link: '/en/women-empowerment'
        },


        
      ],
      imgUrl: homeIco.src
    },

    
    {
      title: 'GALLERY',
      link: '/en/blog/gallery'
    },

    {
      title: 'VIRTUAL TOUR',
      link: 'https://turiya.co/360/KMF/'
    },
 
   

 
    {
      title: 'SOCIAL RESPONSIBILITY',
      link: '/en/social-responsibility/nandini-hostels/',
      subItems: [
        {
          title: "Nandini Hostels",
          link: '/en/social-responsibility/nandini-hostels/'
        },
        {
          title: "Child Empowerment",
          link: '/en/portfolio/ksheerabhagaya'
        },
        {
          title: "Incentives to Farmers",
          link: '/en/portfolio/ksheeradhare'
        },
        {
          title: "Veterinary Services",
          link: '/en/animal-husbandry/animal-health'
        },
       
        
      ],
    },

    {
      title: 'CAREERS',
      link: '/en/careers',
      wideOnly: true, // desktop nav row has no room below 1440px; see About Us

      imgUrl: homeIco.src
    },
    {
      title: 'CONTACT US',
      link: '/en/contact',
      imgUrl: homeIco.src
    }
  ],
  kn: [
    {
      title: <IoHomeOutline size={20} />,
      link: '/kn',
      imgUrl: homeIco.src
    },

    {
      title: 'ಕಹಾಮ ಬಗ್ಗೆ',
      link:'/kn/about/company-profile',
      subItems: [
        {
          title: 'ಕಹಾಮ ಪರಿಚಯ',
          link: '/kn/about/company-profile'
        },
        {
          title: 'ಕಹಾಮ ಉದ್ದೇಶ',
          link: '/kn/about/mission-vision'
        },
 
        {
          title: 'ಸಾಂಸ್ಥಿಕ ರಚನೆ',
          link: '/kn/about/organization-chart'
        },
        {
          title: 'ಮೈಲಿಗಲ್ಲುಗಳು',
          link: '/kn/about/mile-stones'
        },
    
        {
          title: 'ಮಂಡಳಿ ನಿರ್ದೇಶಕರುಗಳು',
          link: '/kn/directors'
        },
        {
          title: 'ಕಹಾಮ ಅಧಿಕಾರಿಗಳು',
          link: '/kn/executive'
        },
        {
          title: 'ಉದ್ಯೋಗಾವಕಾಶಗಳು / ನೇಮಕಾತಿ',
          link: '/kn/careers',
          desktopOnly: true
        },
      ]
    },

    {
      title: 'ಕಹಾಮ ಪೋರ್ಟ್ಫೋಲಿಯೋ',
      link: '/kn/portfolio',
      imgUrl: homeIco.src
    },

    {
      title: 'ಹಾಲು ಒಕ್ಕೂಟಗಳು',
       link:'/kn/milk-union',

      imgUrl: milkUnionIco.src
    },

    {
      title: 'ಕಹಾಮ ಘಟಕಗಳು',
      link:'/kn/kmf-unit'
       
      
    },

    {
      title: 'ನಮ್ಮ ಉತ್ಪನ್ನಗಳು',
      link: '/kn/our-product',
      subItems: [
        {
          title: "ನಮ್ಮ ಉತ್ಪನ್ನಗಳು",
          link: '/kn/our-product'
        },
        {
          title: "ನಂದಿನಿ ಪಾಕವಿಧಾನಗಳು",
          link: '/kn/nandini-recipes'
        },
        {
          title: "ಸಗಟು ಮಾರಾಟ",
          link: '/kn/contact?category=bulk-order'
        },
        {
          title: 'ಡೀಲರ್‌ಶಿಪ್ ಮತ್ತು ಫ್ರಾಂಚೈಸ್',
          link: '/kn/dealership'
        },
        {
          title: 'ಲಭ್ಯವಾದಾಗ ತಿಳಿಸಿ',
          link: '/kn/notify-me'
        },
        {
          title: 'ದೂರು ಸಲ್ಲಿಸಿ',
          link: '/kn/complaint'
        },
       

        
      ],
     
    },




 








     
    {
      title: 'ಗುಣಮಟ್ಟ ಮತ್ತು ಆಹಾರ ಸುರಕ್ಷತೆ',
      link: '/kn/about/quality-food'
    },




    {
      title: 'ಪಶುಸಂಗೋಪನೆ',
      link: '/kn/animal-husbandry/procurement',
      subItems: [
        {
          title: "   ಹಾಲು ಶೇಖರಣೆ",
          link: '/kn/animal-husbandry/procurement'
        },
        {
          title: "ಪಶು ಆರೋಗ್ಯ",
          link: '/kn/animal-husbandry/animal-health'
        },
        {
          title: "ಪಶು ಸಂತಾನೋತ್ಪತ್ತಿ ಕಾರ್ಯಕ್ರಮ",
          link: '/kn/animal-husbandry/animal-breeding'
        },
        {
          title: "ಮೇವು ಚಟುವಟಿಕೆಗಳು",
          link: '/kn/animal-husbandry/feed-and-fodder'
        },
  
        {
          title: "ಯೋಜನೆಗಳು/ ಅನುದಾನಗಳು",
          link: '/kn/animal-husbandry/scheme'
        },
        {
          title: " ಸ್ಟೆಪ್ ಯೋಜನೆ",
          link: '/kn/women-empowerment'
        },

      
        
        

       

        
      ],
      imgUrl: homeIco.src
    },

    {
      title: 'ಸುದ್ದಿ/ಬ್ಲಾಗ್‌ಗಳು',
      link: '/kn/blog/gallery'
    },
    

    {
      title: 'ವರ್ಚುವಲ್ ಟೂರ್',
      link: 'https://turiya.co/360/KMF/'
    },
     

    {
      title: 'ಸಾಮಾಜಿಕ ಜವಾಬ್ದಾರಿಗಳು',
      link: '/kn/social-responsibility/nandini-hostels/',
      subItems: [
        {
          title: "ನಂದಿನಿ ವಸತಿ ನಿಲಯ",
          link: '/kn/social-responsibility/nandini-hostels/'
        },
        {
          title: "ಮಕ್ಕಳ ಸಬಲೀಕರಣ",
          link: '/kn/portfolio/ksheerabhagaya'
        },
        {
          title: "ರೈತರಿಗೆ ಪ್ರೋತ್ಸಾಹ ಧನ",
          link: '/kn/portfolio/ksheeradhare'
        },
        {
          title: "ಪಶುವೈದ್ಯಕೀಯ ಸೇವೆಗಳು",
          link: '/kn/animal-husbandry/animal-health'
        },
       
        
      ],
    },

   
     
     
    {
      title: 'ಉದ್ಯೋಗಾವಕಾಶಗಳು',
      link: '/kn/careers',
      wideOnly: true,

      imgUrl: homeIco.src
    },
    {
      title: 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ',
      link: '/kn/contact',
      imgUrl: homeIco.src
    }
  ]
};
