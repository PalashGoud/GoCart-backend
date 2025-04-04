import axios from 'axios'
import React, { createContext, useState } from 'react'
export const Data = createContext()
function Context({children}) {  
  return (
    <Data.Provider value={{}}>
    {children}
    </Data.Provider>
  )
}

export default Context