import React, { useRef } from 'react';
import { useDrop, useDrag, DropTargetMonitor, DragSourceMonitor } from 'react-dnd'
import { useConcent } from 'concent'

// import Search from '../../Container/Search'
// import Buttons from '../..Container/Buttons'
// import Table from '../..Container/Table'

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

  const renderWidgets = (Widget) => {
    console.log('Widget:', Widget)

    // switch () {
    //
    // }

  }


  return (
    <div className="container" ref={ref}>
      {
        containers.map(renderWidgets)
      }
    </div>
  )
}
