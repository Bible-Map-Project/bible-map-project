import React, { useState } from 'react'
import { useMap } from 'react-leaflet'
import Fuse from 'fuse.js'

const Search = ({ data, setSelected }) => {
  const map = useMap()
  const [searchData, setSearchData] = useState([])
  return (
    <div className='search'>
      <input
        type="search"
        onChange={(e) => {
          const fuse = new Fuse(data, { keys: ['name_english', 'description_english', 'reference'] })
          const result = fuse.search(e.target.value)
          setSearchData(result.slice(0, 6).map(i => i.item))
        }}
        placeholder="Search"
      />
      <div className="item-container">
        {searchData.map((c) => (
          <div className="item" onClick={() => {
            map.flyTo([c.y, c.x])
            setSelected(c.id)
            setSearchData([])
          }}>
            {c.name_english}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search
