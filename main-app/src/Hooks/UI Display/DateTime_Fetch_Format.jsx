import React from "react"

export default function useDateTimeFormat( DateFormat ) {
    const formatDate = 
    `${new Date(DateFormat).getFullYear()}-${(new Date(DateFormat).getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${new Date(DateFormat)
      .getDate()
      .toString()
      .padStart(2, "0")} ${new Date(DateFormat).toLocaleTimeString([], {
      timeStyle: "short",
    })}`
    
    return formatDate
}