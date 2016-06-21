import React from 'react';
import {Route, IndexRoute} from 'react-router';

import {App} from './app';
import * as pages from './pages';

export default(
    <Route path='/' component={App}>
        <IndexRoute component={pages.Dashboard}/>
        <Route path="partnumbers" component={pages.PartNumberIndex}>
            <IndexRoute component={pages.PartNumberList}/>
            <Route path="add" component={pages.PartNumberCreateEdit}/>
            <Route path=":id" component={pages.PartNumberCreateEdit}/>
        </Route>
    </Route>
);
