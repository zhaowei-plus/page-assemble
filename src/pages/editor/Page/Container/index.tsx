import React, { useRef } from 'react';
import { useDrop, useDrag, DropTargetMonitor, DragSourceMonitor } from 'react-dnd'
import { useConcent } from 'concent'

import Search from '../../Container/Search'
import Buttons from '../../Container/Buttons'
import Table from '../../Container/Table'

import { ItemTypes } from '@/assets/constant';

import '../store'

import './index.less'

export default (props) => {
  const {
    state,
    mr: actions
  } = useConcent('page')

  const ref = useRef()

  const { containers = [] } = state

  const renderContainer = (container) => {
    console.log('container:', container)
    const { type } = container

    // id: 1
    // pid: 0
    // index: 1
    // type: "Search"
    // field: {title: "Search", type: "Search"}
    // properties: {id: {…}}
    // __proto__: Object

    switch (type) {

      case 'Search': {
        return (<Search />)
      }

    }

  }


  return (
    <div className="container" ref={ref}>
      {
        containers.map(renderContainer)
      }
    </div>
  )
}
