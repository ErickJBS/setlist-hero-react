import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { createStructuredSelector } from 'reselect';
import { selectEvents } from '../../redux/event/events.selector';
import { selectEvent } from '../../redux/event/events.actions';
import TagTemplate from '../manage-bands/band/tag-template';

const CustomHeader = ({setGlobalFilter}) => (
    <div >
        <div className="d-flex justify-content-start">
            <div style={{paddingLeft:'5px', width:'300px', paddingTop:'5px'}} className="center">
                <h5><strong>Events where you are LED</strong></h5>
            </div> 
            <div style={{ paddingLeft: '600px' }}>
                <InputText type="search" placeholder="Search" onInput={(e) => setGlobalFilter(e.target.value)} />
            </div>
        </div>
    </div>
)

export const SetlistsBody = ({events, selectEvent}) => {
    const [globalFilter, setGlobalFilter] = useState(null);
    const history = useHistory();

    const chooseEvent = e => {
        selectEvent(e.value);
        history.push(`/setlists/event/${e.value.id}`);
    }

    return (
        <DataTable className="animated faster fadeIn"
                header={
                    <CustomHeader
                        setGlobalFilter={setGlobalFilter}/>
                }
                scrollable scrollHeight="315px"
                value={events}
                globalFilter={globalFilter} sortField="name"
                selectionMode="single" onSelectionChange={chooseEvent}>
                <Column field="name" header="Name" sortable />
                <Column field="date" header="Date" sortable style={{ width: '10%', textAlign: 'center' }} />
                <Column field="location" header="Location" sortable />
                <Column field="tags" header="Tags" sortable body={TagTemplate}  />
        </DataTable>
    )
}

const mapStateToProps = createStructuredSelector({
    events: selectEvents
});

const mapDispatchToProps = dispatch => ({
    selectEvent: event => dispatch(selectEvent(event))
})

export default connect(mapStateToProps, mapDispatchToProps)(SetlistsBody)
