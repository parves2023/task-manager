import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'; // Import default styling
import AddNote from './Addnote';
import Allnotes from './Allnotes';

function Mynote() {
    return (
        <div>
            
            <Tabs>
                <TabList>
                    <Tab>All Tasks</Tab>
                    <Tab>Add Tasks</Tab>
                </TabList>

                <TabPanel>
                    <Allnotes />
                </TabPanel>

                <TabPanel>
                    <AddNote />
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default Mynote;
