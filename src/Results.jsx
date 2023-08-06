import React from 'react'

export default function Results({searchData}) {
    console.log('props', searchData);
  return (
    <div>{searchData.uri}</div>
  )
}
