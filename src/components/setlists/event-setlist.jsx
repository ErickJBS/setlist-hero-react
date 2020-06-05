import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';
import { selectSelectedEvent } from '../../redux/event/events.selector';
import { selectEvent } from '../../redux/event/events.actions';
import songService from '../../services/SongService';
import { TreeTable } from 'primereact/treetable';
import { Column } from "primereact/column";
import {showMessage} from '../../redux/growl/growl.actions';
import Button from 'react-bootstrap/Button';
import { InputText } from 'primereact/inputtext';

const CustomHeader = ({ setGlobalFilter, setIsDialogDisplaying }) => (
    <div style={{ paddingTop: '15px' }}>
        <div className="d-flex flex-row justify-content-start">
            <div style={{ paddingBottom: '10px', marginRight: '10px' }}>
                <Button
                    variant="secondary"
                   >
                    <span className="text-light">
                        <i className="fas fa-plus-square" />{' '}
                        Add set
                    </span>
                </Button>
            </div>
            <div style={{ paddingBottom: '10px', marginRight: '10px' }}>
                <Button
                    variant="secondary"
                    >
                    <span className="text-light">
                        <i className="fas fa-edit" />{' '}
                        Modify Set
                    </span>
                </Button>
            </div>
            <div>
                <Button
                    variant="danger"
                >
                    <span className="text-light">
                        <i class="far fa-trash-alt"></i>{' '}
                        Delete set
                    </span>
                </Button>
            </div>
            <div style={{ paddingLeft: '580px' }}>
                <InputText type="search" placeholder="Search" onInput={(e) => setGlobalFilter(e.target.value)} />
            </div>
        </div>
    </div>
);

const EventSetlist = ({ event, showMessage }) => {
    const [allSongs, setAllSongs] = useState([]);
    const [setlistItems, setSetlistItems] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    useEffect(() => {
        songService.getAll(event.band)
            .then(songs => {
                setAllSongs(
                    songs.map(song => {
                        return {label: `${song.name}` , value: song.id}
                    })
                );
            })
            .catch(error => {
                showMessage({ severity: 'error', summary: 'Error Message', detail: "Couldn't fetch songs" });
            });
    },[]);

    useEffect(() => {
        event.setlist.length && setSetlistItems(
            event.setlist.map((set, index) => {
                return {
                    key: index,
                    data: {
                        name: set?.name,
                        detail: `Has ${set?.songs?.lenght || 0} songs`
                    },
                    children: set?.songs.map((song, songIndex) => ({
                        key: `${index}-${songIndex}`,
                        data: {
                            name: song.name
                        }
                    }))
                }
            })
        );
    },[]);

    return (
        <TreeTable
                value={setlistItems}
                className="animated faster fadeIn"
                globalFilter={globalFilter}
                header={<CustomHeader
                    setGlobalFilter={setGlobalFilter}/>}
            >
                <Column field="name" header="Name" expander />
                <Column field="detail" header="Detail" />
            </TreeTable>
    )
}

const mapStateToProps = createStructuredSelector({
    event: selectSelectedEvent
})

const mapDispatchToProps = dispatch => ({
    selectEvent: event => dispatch(selectEvent(event)),
    showMessage: message => dispatch(showMessage(message))
})

export default connect(mapStateToProps, mapDispatchToProps)(EventSetlist)
