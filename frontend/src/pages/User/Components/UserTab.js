import React from 'react';
import { Grid } from '@mui/material';

import Following from './Following';

function UserTab({ followings }) {

    return (
        <Grid container>
            {
                followings.map((user, index) => {
                    return (
                        user !==null &&<Grid key={index} item xs={12} sm={6} md={4} >
                            <Following following={user} />
                        </Grid>
                    )
                })
            }
        </Grid>
    )
}

export default UserTab;
