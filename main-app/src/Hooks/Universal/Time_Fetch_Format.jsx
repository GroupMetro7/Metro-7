import React from "react"

export default function TimeFormat( DateFormat ) {
    const formatDate = 
    `${new Date(DateFormat).toLocaleTimeString([], {
      timeStyle: "short",
    })}`
    
    return formatDate
}