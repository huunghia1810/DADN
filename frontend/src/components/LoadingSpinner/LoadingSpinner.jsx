import React, {useCallback, useState, useEffect } from 'react'

import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

//----------import css---------------
import 'antd/dist/antd.min.css'
import './LoadingSpinner.css'

const LoadingSpinner = props => {
    const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />
    return (
        <Spin indicator={antIcon} />
    )
}

export default LoadingSpinner
