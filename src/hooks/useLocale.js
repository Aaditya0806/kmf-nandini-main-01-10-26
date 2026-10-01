import React from 'react'
import { useParams } from 'next/navigation'

function useLocale() {
    return {
        locale: useParams().locale ||'en'
    };
  
}

export default useLocale