import React from "react"

export default function useTimeFormat( DateFormat ) {
    const formatDate = 
    `${new Date(DateFormat).toLocaleTimeString([], {
      timeStyle: "short",
    })}`
    
    return formatDate
}