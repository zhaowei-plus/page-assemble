import React from 'react'
import LOGO from '@/assets/logo.png'
import './index.less'

export default () => (
  <div className="company">
    <i className="company__logo" style={{ backgroundImage: `url(${LOGO})` }} />
    <span className="company__title">云商城</span>
  </div>
)
