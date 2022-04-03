import React, {Component, useCallback, useState, useEffect } from 'react'
import { Modal, notification, Button, Space } from 'antd'

const NotificationDialogs = types => {
    const notifications = []

    types.map((type) => {
        notifications.push({
            show: (settings) => {
                notification[type](settings)
            }
        })
    })

    return notifications
}

export default NotificationDialogs
