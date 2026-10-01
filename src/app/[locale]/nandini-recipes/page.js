'use client'
import React,{useEffect,useState} from 'react'
import Recipes from './Recipes'
import Link from 'next/link'
import Footer from '@/components/Footer'
import resp1 from '@/images/recipes/1.jpg'
import resp2 from '@/images/recipes/2.jpg'
import resp3 from '@/images/recipes/3.jpg'
import resp4 from '@/images/recipes/4.png'
import resp5 from '@/images/recipes/5.jpg'
import resp6 from '@/images/recipes/6.jpg'
import resp7 from '@/images/recipes/7.jpg'
import resp8 from '@/images/recipes/8.jpg'
import resp9 from '@/images/recipes/9.jpg'

import useApi from '@/hooks/useApi'

import useLocale from '@/hooks/useLocale'
import { recipes } from './recipesData'

function Recipe() {

  const [recipe,setRecipe]=useState([])
const axios =useApi()
const locale=useLocale().locale
  useEffect(()=>{
    (
      async()=>{
        const {data:recipe}=await axios.get('/api/recipes')
        setRecipe(recipe.data)
      }
    )()
  },[])

//   const recipes = [
//   {
//     id: 1,
//     title: "AKKI PAYASA",
//     video:"",
//     image:
//       resp9.src,
//     link: "https://www.kmfnandini.coop/en/nandini-recipes/1",
//   },
//   {
//     id: 2,
//     title: "BANANA KESARIBATH",
//     video:"",
//     image:
//       resp1.src,
//     link: "https://www.kmfnandini.coop/en/nandini-recipes/2",
//   },
//   {
//     id: 3,
//     title: "BESAN LADDU",
//     video:"",
//     image:
//       resp2.src,
//     link: "https://www.kmfnandini.coop/en/nandini-recipes/3",
//   },
//   {
//     id: 4,
//     title: "ELLU CHIKKI",
//     video:"",
//     image:
//       resp3.src,
//     link: "https://www.kmfnandini.coop/en/nandini-recipes/4",
//   },
//   {
//     id: 5,
//     title: "KADALEBELE PAYASA",
//     video:"",
//     image:
//       resp4.src,
//     link: "https://www.kmfnandini.coop/en/nandini-recipes/5",
//   },
//   {
//     id: 6,
//     title: "KOVA HOLIGE",
//     video:"",
//     image:
//       resp5.src,
//     link: "https://www.kmfnandini.coop/en/nandini-recipes/6",
//   },
//   {
//     id: 7,
//     title: "KOVA LADDU",
//     video:"",
//     image:
//       resp6.src,
//     link: "https://www.kmfnandini.coop/en/nandini-recipes/7",
//   },
//   {
//     id: 8,
//     title: "NANDINI GULAB JAMOON",
//     video:"",
//     image:
//       resp7.src,
//     link: "https://www.kmfnandini.coop/en/nandini-recipes/8",
//   },
//   {
//     id: 9,
//     title: "RAVA LADDU",
//     video:"",
//     image:
//       resp8.src,
//     link: "https://www.kmfnandini.coop/en/nandini-recipes/9",
//   },
// ];



  return (
    <div className='w-full h-full mt-10  md:mt-20 '>
          <div className='w-full h-full text-center mb-20'>
          <div className="mb-20  mt-20  relative w-full  flex justify-center items-center ">
            
              <h1 className=" text-primary-main relative m-auto text-center z-10 font-heading text-5xl font-extrabold uppercase">
             {locale==='kn'?'ನಂದಿನಿ ಪಾಕವಿಧಾನಗಳು':'Nandini Recipies'}
              </h1>
            </div>

            <div className='w-full h-full mt-10 md:mt-20 p-5 mb-28 md:mb-20 flex justify-center items-center'>
            <div className='w-full h-full m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-36 '>

             {/* <Link > */}
        
        {
          recipe?.map((item,id)=>{
           
            return(
              <Recipes key={id} title={item?.attributes?.title} image={item?.attributes?.image?.data?.[0]?.attributes?.url}
              link={`/${locale}/nandini-recipes/${item?.id}`}
              />
            )
          })
        }
 
                </div>
            </div>
           
          </div>
          <Footer/>
    </div>
  )
}

export default Recipe
