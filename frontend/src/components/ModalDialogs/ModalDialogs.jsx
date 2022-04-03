import React, {Component, useCallback, useState, useEffect } from 'react'
import { Modal, Button, Space } from 'antd'

const ModalDialogs = (types) => {
    const modals = []

    types.map((type) => {
        modals.push({
            show: (settings) => {
                if(typeof settings === 'object' && Object.keys(settings).length > 0 && !settings.hasOwnProperty('onOk')) {
                    if(type === 'error' && settings.hasOwnProperty('error') && !settings.hasOwnProperty('onOk')) {
                        settings['onOk'] = () => {
                            // window.location.href = '/ynsideployment/error-log/?stack=' + btoa(settings.error.stack)
                        }
                    }
                }
                Modal[type](settings)
            }
        })
    })

    return modals
}

export default ModalDialogs
