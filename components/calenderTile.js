import React from 'react'

export default function CalenderTile({date}) {
  console.log(date.getDay())
  return (
    <div>
      {date.getDate()}
    </div>
  )
}
