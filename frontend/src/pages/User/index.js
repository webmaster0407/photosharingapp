import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { PhotoLibrary, Group } from '@mui/icons-material';
import { useUserContext } from '../../contexts/UserContext';
import { getUser } from '../../services/UserServices';

import UserArea from './Components/UserArea';
import UserTab from './Components/UserTab';
import PhotoTab from './Components/PhotoTab';


function Profile() {

    const [value, setValue] = useState('1');
    const [data, setData] = useState("");
    const { user } = useUserContext();
    const {id} = useParams();

    useEffect(() => {
        getUser(id).then(d => { setData(d.user) });

    }, [user, id]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <UserArea user={data} currentUser={user} />
            <Box sx={{ width: '100%', typography: 'body1', px: '5vw' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center', color: 'black' }}>
                        <TabList onChange={handleChange} textColor='inherit' indicatorColor='inherit' >
                            <Tab icon={<PhotoLibrary />} label="Photo" value="1" />
                            <Tab icon={<Group />} label="Following" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel sx={{ p: 0 }} value="1"><PhotoTab userId={id} /></TabPanel>
                    <TabPanel sx={{ p: 0 }} value="2"><UserTab followings={data.followings} /></TabPanel>
                </TabContext>
            </Box>
        </Box>
    )
}

export default Profile;