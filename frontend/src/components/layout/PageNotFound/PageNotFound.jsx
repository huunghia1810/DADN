import React, {useCallback, useState, useEffect } from "react";

import {withRouter, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

//----------import lib---------------
import { Result, Button } from 'antd';

//----------import css---------------
import 'antd/dist/antd.min.css';
import './PageNotFound.css';

const PageNotFound = (props) => {

    const history = useHistory()
    const dispatch = useDispatch();

    const handleGoBack = () => {
        history.goBack()
    }

    return (
        <Result
            status="404"
            title="404"
            subTitle="Page not found."
            extra={
                 <Button type="primary" onClick={handleGoBack}>Go Back</Button>
            }
        />
    )
}

export default withRouter(PageNotFound);